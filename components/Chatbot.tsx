"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CHATBOT_TOPICS,
  REFUSAL_INJECTION,
  composeFlexibleReply,
  getLocalReply,
  isPromptInjection,
  isSupportedQuestion,
  retrieveKnowledge,
  validateQuestion,
  type ChatLink,
  type KnowledgeHit,
  type LocalReply
} from "@/lib/chatbot";
import { LineIcon } from "./Icons";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
  links?: ChatLink[];
  sources?: string[];
};

const THINKING_DELAY = 850;
const AI_LIMIT = 10;
const AI_WINDOW = 60_000;

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function streamGemini(
  question: string,
  onChunk: (text: string) => void,
  signal: AbortSignal
) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
    signal
  });

  if (!response.ok || !response.body) {
    throw new Error("Gemini request failed");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const event of events) {
      for (const line of event.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        try {
          const payload = JSON.parse(data) as {
            candidates?: Array<{
              content?: { parts?: Array<{ text?: string }> };
            }>;
          };
          const text = payload.candidates?.[0]?.content?.parts
            ?.map((part) => part.text ?? "")
            .join("");
          if (text) onChunk(text);
        } catch {
          // Abaikan event SSE yang bukan JSON valid.
        }
      }
    }
  }
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "Halo! Saya Pampam, asisten Apam Gula Hangus. Pilih topik cepat atau tulis pertanyaan Anda di bawah."
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const nextId = useRef(2);
  const logRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const aiRequests = useRef<number[]>([]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const addUserMessage = (text: string) => {
    const message: ChatMessage = {
      id: nextId.current++,
      role: "user",
      text
    };
    setMessages((current) => [...current, message]);
  };

  const addBotMessage = (reply: LocalReply) => {
    const message: ChatMessage = {
      id: nextId.current++,
      role: "bot",
      text: reply.text,
      links: reply.links,
      sources: reply.sources
    };
    setMessages((current) => [...current, message]);
    return message.id;
  };

  const updateBotMessage = (id: number, reply: LocalReply) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === id
          ? {
              ...message,
              text: reply.text,
              links: reply.links ?? message.links,
              sources: reply.sources ?? message.sources
            }
          : message
      )
    );
  };

  const finish = () => {
    setTyping(false);
    setBusy(false);
    busyRef.current = false;
    abortRef.current = null;
  };

  const sendLocal = async (reply: LocalReply) => {
    busyRef.current = true;
    setBusy(true);
    setTyping(true);
    await wait(THINKING_DELAY);
    addBotMessage(reply);
    finish();
  };

  const sendRag = async (question: string, hits: KnowledgeHit[]) => {
    setBusy(true);
    const startedAt = performance.now();
    const sources = [...new Set(hits.map((hit) => hit.source))];
    const controller = new AbortController();
    abortRef.current = controller;

    let buffer = "";
    let delayDone = false;
    let botId: number | null = null;

    const reveal = () => {
      if (!buffer) return;
      setTyping(false);
      if (botId === null) {
        botId = addBotMessage({ text: buffer, sources });
      } else {
        updateBotMessage(botId, { text: buffer, sources });
      }
    };

    const timer = window.setTimeout(() => {
      delayDone = true;
      reveal();
    }, THINKING_DELAY);

    try {
      await streamGemini(
        question,
        (chunk) => {
          buffer += chunk;
          if (!delayDone && performance.now() - startedAt > 2000) {
            delayDone = true;
            window.clearTimeout(timer);
          }
          if (delayDone) reveal();
        },
        controller.signal
      );

      window.clearTimeout(timer);
      if (!delayDone) {
        const remaining = THINKING_DELAY - (performance.now() - startedAt);
        if (remaining > 0) await wait(remaining);
        delayDone = true;
      }

      if (!buffer) {
        const fallback = composeFlexibleReply(question, hits);
        if (botId === null) addBotMessage(fallback);
        else updateBotMessage(botId, fallback);
      } else {
        reveal();
      }
    } catch {
      window.clearTimeout(timer);
      const remaining = THINKING_DELAY - (performance.now() - startedAt);
      if (remaining > 0) await wait(remaining);
      const fallback = composeFlexibleReply(question, hits);
      if (botId === null) addBotMessage(fallback);
      else updateBotMessage(botId, fallback);
    } finally {
      finish();
    }
  };

  const handleQuestion = async (raw: string) => {
    if (busyRef.current) return;

    const validation = validateQuestion(raw);
    if (!validation.ok) {
      setTyping(true);
      await wait(THINKING_DELAY);
      addBotMessage({ text: validation.error });
      finish();
      return;
    }

    const question = validation.value;
    busyRef.current = true;
    addUserMessage(question);
    setTyping(true);

    if (isPromptInjection(question)) {
      await sendLocal(REFUSAL_INJECTION);
      return;
    }

    const localReply = getLocalReply(question);
    if (localReply) {
      await sendLocal(localReply);
      return;
    }

    if (!isSupportedQuestion(question)) {
      await sendLocal(composeFlexibleReply(question, []));
      return;
    }

    const hits = retrieveKnowledge(question);
    if (hits.length === 0) {
      await sendLocal(composeFlexibleReply(question, []));
      return;
    }

    const now = Date.now();
    aiRequests.current = aiRequests.current.filter(
      (timestamp) => now - timestamp < AI_WINDOW
    );
    if (aiRequests.current.length >= AI_LIMIT) {
      await sendLocal({
        text: "Batas pertanyaan AI per menit tercapai. Silakan coba lagi sebentar lagi, atau hubungi kami melalui WhatsApp.",
        links: [{ label: "Buka WhatsApp", href: "https://wa.me/628973171075" }]
      });
      return;
    }
    aiRequests.current.push(now);

    await sendRag(question, hits);
  };

  const askTopic = (label: string) => {
    void handleQuestion(label);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || busyRef.current) return;
    setInput("");
    void handleQuestion(question);
  };

  return (
    <div className="chatbot-card">
      <div className="chatbot-card-header">
        <Image
          src="/images/pampam-putih.png"
          alt="Pampam"
          width={44}
          height={44}
          className="chatbot-avatar"
        />
        <div>
          <strong>Pampam</strong>
          <span className="chatbot-status">Asisten Apam Gula Hangus</span>
        </div>
      </div>

      <div
        className="chatbot-log"
        ref={logRef}
        aria-live="polite"
        aria-label="Percakapan dengan Pampam"
      >
        {messages.map((message) => (
          <div className={`chat-message ${message.role}`} key={message.id}>
            {message.role === "bot" && (
              <Image
                src="/images/pampam-putih.png"
                alt=""
                width={28}
                height={28}
                className="chat-message-avatar"
              />
            )}
            <div className="chat-bubble">
              <p>{message.text}</p>
              {message.sources && message.sources.length > 0 && (
                <span className="chat-sources">
                  Sumber: {message.sources.join(" · ")}
                </span>
              )}
              {message.links?.map((link) => (
                <a
                  key={link.href}
                  className="chat-link"
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label}
                  <LineIcon name="external" />
                </a>
              ))}
            </div>
          </div>
        ))}

        {typing && (
          <div
            className="chat-message bot chat-typing"
            aria-label="Pampam sedang mengetik"
          >
            <Image
              src="/images/pampam-putih.png"
              alt=""
              width={28}
              height={28}
              className="chat-message-avatar"
            />
            <div className="chat-bubble typing-bubble" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <div className="chatbot-controls">
        <div className="chatbot-topics" aria-label="Pilihan topik">
          {CHATBOT_TOPICS.map((topic) => (
            <button
              type="button"
              key={topic.key}
              className="chatbot-topic"
              onClick={() => askTopic(topic.label)}
              disabled={typing || busy}
            >
              {topic.label}
            </button>
          ))}
        </div>

        <form className="chatbot-form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="chatbot-input">
            Pertanyaan untuk Pampam
          </label>
          <input
            id="chatbot-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Masukkan Pertanyaan Anda disini"
            autoComplete="off"
            maxLength={500}
          />
          <button type="submit" disabled={!input.trim() || typing || busy}>
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}
