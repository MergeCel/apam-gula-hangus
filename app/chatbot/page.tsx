import type { Metadata } from "next";
import Chatbot from "@/components/Chatbot";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { LineIcon } from "@/components/Icons";
import data from "@/data/site.json";

export const metadata: Metadata = {
  title: "Chatbot AI | Apam Gula Hangus",
  description:
    "Tanya Pampam tentang menu, jam buka, kontak, dan lokasi Apam Gula Hangus."
};

export default function ChatbotPage() {
  return (
    <>
      <Header navigation={data.navigation} logo={data.brand.logo} />

      <main className="chatbot-page">
        <div className="chatbot-heading">
          <a
            className="chatbot-back"
            href="/"
            aria-label="Kembali ke beranda"
          >
            <LineIcon name="arrow-left" />
          </a>
          <h1>Chatbot AI</h1>
          <p>
            Pilih pertanyaan untuk mendapatkan informasi resmi Apam Gula
            Hangus.
          </p>
        </div>

        <Chatbot />
      </main>

      <SiteFooter />
    </>
  );
}
