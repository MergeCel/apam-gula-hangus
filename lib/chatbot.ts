import data from "@/data/site.json";

export type ChatLink = {
  label: string;
  href: string;
};

export type KnowledgeDoc = {
  id: string;
  source: string;
  text: string;
  keywords: string[];
};

export type KnowledgeHit = KnowledgeDoc & {
  score: number;
};

export type LocalReply = {
  text: string;
  links?: ChatLink[];
  sources?: string[];
};

const whatsapp = data.footer.social.links.find(
  (link) => link.icon === "whatsapp"
);
const instagram = data.footer.social.links.find(
  (link) => link.icon === "instagram"
);
const tiktok = data.footer.social.links.find(
  (link) => link.icon === "tiktok"
);

const menuText = data.menu.products
  .map(
    (product) =>
      `${product.name} ${product.price} isi ${product.quantity.replace(
        /^isi\s*/i,
        ""
      )}`
  )
  .join("; ");

const menuList = data.menu.products
  .map((product) => `- ${product.name}: ${product.price} (${product.quantity})`)
  .join("\n");

const MENU_LINKS: ChatLink[] = [
  { label: "Lihat Menu", href: "/#menu" },
  ...(instagram ? [{ label: "Instagram", href: instagram.href }] : []),
  ...(whatsapp ? [{ label: "WhatsApp", href: whatsapp.href }] : [])
];

const contactText = [
  `WhatsApp ${data.footer.contact.whatsappLabel}`,
  "Instagram @apamgula.hangus",
  "TikTok @apamgula.hangus"
].join("; ");

const staticDocs: KnowledgeDoc[] = [
  {
    id: "profil",
    source: "Profil Apam Gula Hangus",
    text: "Apam Gula Hangus adalah kue tradisional rumahan yang terinspirasi dari kudapan Brunei Darussalam. Rasanya manis, teksturnya lembut, dan aromanya khas karamel gula hangus.",
    keywords: [
      "apam",
      "profil",
      "sejarah",
      "asal",
      "brunei",
      "tradisional",
      "kue",
      "cerita",
      "siapa",
      "apa itu"
    ]
  },
  {
    id: "keunikan-aroma",
    source: "Keunikan: aroma karamel",
    text: "Aroma khas berasal dari gula yang dimasak perlahan hingga kecokelatan, menghasilkan wangi karamel panggang yang terasa sejak kotak dibuka.",
    keywords: [
      "aroma",
      "wangi",
      "karamel",
      "gula hangus",
      "harum",
      "keunikan"
    ]
  },
  {
    id: "keunikan-tekstur",
    source: "Keunikan: tekstur",
    text: "Apam memiliki tekstur lembut, berpori halus, empuk, dan tetap lembut di suhu ruang. Rasa manisnya legit dengan sentuhan karamel yang tidak berlebihan.",
    keywords: [
      "tekstur",
      "lembut",
      "empuk",
      "pori",
      "manis",
      "legit",
      "tidak enek",
      "keunikan"
    ]
  },
  {
    id: "menu",
    source: "Menu dan harga",
    text: `Menu Apam Gula Hangus: ${menuText}. Semua varian dikemas dalam kotak.`,
    keywords: [
      "menu",
      "harga",
      "varian",
      "rasa",
      "original",
      "cokelat",
      "coklat",
      "keju",
      "isi",
      "butir",
      "kotak",
      "rp"
    ]
  },
  {
    id: "ketersediaan-menu",
    source: "Ketersediaan menu",
    text: "Saat ini hanya tersedia tiga varian: Original, Cokelat, dan Keju. Belum ada menu lain yang tercatat. Jika ada varian baru atau menu musiman, informasi biasanya diumumkan melalui Instagram @apamgula.hangus atau WhatsApp.",
    keywords: [
      "menu lain",
      "varian lain",
      "rasa lain",
      "menu baru",
      "varian baru",
      "selain",
      "pilihan lain",
      "opsi lain"
    ]
  },
  {
    id: "isi-kotak",
    source: "Isi per kotak",
    text: "Original berisi 10 butir per kotak, sedangkan Cokelat dan Keju berisi 7 butir per kotak. Harga setiap kotak Rp15.000.",
    keywords: [
      "isi",
      "butir",
      "kotak",
      "jumlah",
      "banyak",
      "original",
      "cokelat",
      "keju",
      "10",
      "7"
    ]
  },
  {
    id: "jam-buka",
    source: "Jam buka",
    text: "Apam Gula Hangus buka setiap hari pukul 08.00-17.00 WIB. Untuk pesanan dalam jumlah banyak disarankan pre-order H-1.",
    keywords: [
      "jam",
      "buka",
      "tutup",
      "operasional",
      "hari",
      "waktu",
      "preorder",
      "pre order",
      "h-1"
    ]
  },
  {
    id: "lokasi",
    source: "Lokasi",
    text: `Alamat Apam Gula Hangus: ${data.footer.address}. Peta lokasi: ${data.footer.map.href}.`,
    keywords: [
      "lokasi",
      "alamat",
      "peta",
      "maps",
      "dimana",
      "di mana",
      "arah",
      "mempawah",
      "kuala secapah",
      "kalimantan barat"
    ]
  },
  {
    id: "kontak",
    source: "Kontak",
    text: `Kontak resmi Apam Gula Hangus: ${contactText}.`,
    keywords: [
      "kontak",
      "whatsapp",
      "wa",
      "instagram",
      "ig",
      "tiktok",
      "telepon",
      "nomor",
      "hubungi",
      "chat",
      "dm"
    ]
  },
  {
    id: "halal",
    source: "Sertifikasi halal",
    text: data.halal.description,
    keywords: [
      "halal",
      "sertifikat",
      "sertifikasi",
      "aman",
      "muslim",
      "bahan"
    ]
  },
  {
    id: "pemesanan",
    source: "Cara pesan",
    text: `Pemesanan dilakukan melalui WhatsApp ${data.footer.contact.whatsappLabel}. Sebutkan varian, jumlah kotak, nama, dan alamat/titik pengambilan. Untuk acara atau jumlah banyak, disarankan pre-order H-1.`,
    keywords: [
      "pesan",
      "order",
      "beli",
      "pemesanan",
      "preorder",
      "pre order",
      "cara",
      "checkout",
      "wa",
      "whatsapp"
    ]
  },
  {
    id: "pesanan-banyak",
    source: "Pesanan acara dan hampers",
    text: "Pesanan acara, arisan, hampers, parsel, dan jumlah banyak dapat dibicarakan melalui WhatsApp. Disarankan menghubungi H-1 agar jumlah dan waktu pengambilan/pengiriman dapat disiapkan.",
    keywords: [
      "acara",
      "arisan",
      "hampers",
      "parcel",
      "parsel",
      "grosir",
      "reseller",
      "banyak",
      "kantor",
      "hadiah",
      "souvenir",
      "wedding",
      "catering"
    ]
  },
  {
    id: "pengiriman",
    source: "Pengiriman dan pengambilan",
    text: "Opsi pengiriman, kurir, ongkos kirim, dan pengambilan langsung perlu dikonfirmasi melalui WhatsApp karena menyesuaikan lokasi dan jumlah pesanan. Belum ada tarif ongkir otomatis di situs.",
    keywords: [
      "kirim",
      "antar",
      "pengiriman",
      "ongkir",
      "kurir",
      "pickup",
      "ambil",
      "cod",
      "gofood",
      "grabfood",
      "shopeefood",
      "luar kota"
    ]
  },
  {
    id: "pembayaran",
    source: "Pembayaran",
    text: "Metode pembayaran dan konfirmasi pembayaran diatur saat pemesanan melalui WhatsApp. Situs ini belum menyediakan pembayaran otomatis.",
    keywords: [
      "bayar",
      "pembayaran",
      "transfer",
      "qris",
      "cod",
      "cash",
      "tunai",
      "rekening",
      "dp"
    ]
  },
  {
    id: "penyimpanan",
    source: "Penyimpanan dan penyajian",
    text: "Apam paling nikmat disantap hangat. Simpan dalam wadah tertutup dan hindari paparan panas atau lembap berlebih. Untuk menghangatkan kembali, kukus sebentar agar tekstur tetap lembut. Untuk panduan waktu simpan yang pasti, konfirmasikan via WhatsApp.",
    keywords: [
      "simpan",
      "tahan",
      "awet",
      "basi",
      "kadaluarsa",
      "expired",
      "kulkas",
      "freezer",
      "hangatkan",
      "panaskan",
      "kukus",
      "microwave"
    ]
  },
  {
    id: "bahan-alergi",
    source: "Bahan dan alergi",
    text: "Komposisi dapat berbeda antarvarian. Jika Anda memiliki alergi tertentu, seperti telur, susu, kacang, atau gluten, konfirmasikan bahan dan proses pembuatan melalui WhatsApp sebelum memesan.",
    keywords: [
      "bahan",
      "komposisi",
      "alergi",
      "alergen",
      "telur",
      "susu",
      "kacang",
      "gluten",
      "vegan",
      "vegetarian",
      "pengawet"
    ]
  },
  {
    id: "kesegaran",
    source: "Kesegaran",
    text: "Apam dibuat dan dikemas segar. Waktu produksi menyesuaikan pesanan, terutama untuk pesanan dalam jumlah banyak.",
    keywords: [
      "segar",
      "fresh",
      "baru",
      "produksi",
      "dibuat",
      "kualitas"
    ]
  }
];

const productDocs: KnowledgeDoc[] = data.menu.products.map(
  (product, index) => ({
    id: `produk-${index + 1}`,
    source: `Menu ${product.name}`,
    text: `Apam ${product.name} dijual Rp15.000 per kotak dengan isi ${product.quantity.replace(
      /^isi\s*/i,
      ""
    )}.`,
    keywords: [
      product.name.toLowerCase(),
      "menu",
      "harga",
      "isi",
      "kotak",
      "butir"
    ]
  })
);

export const KNOWLEDGE: KnowledgeDoc[] = [...staticDocs, ...productDocs];

const STOPWORDS = new Set([
  "apa",
  "apakah",
  "saya",
  "aku",
  "kamu",
  "untuk",
  "yang",
  "dan",
  "atau",
  "di",
  "ke",
  "dari",
  "ini",
  "itu",
  "ada",
  "bisa",
  "boleh",
  "mau",
  "ingin",
  "minta",
  "tolong",
  "dong",
  "ya",
  "kak",
  "min",
  "berapa",
  "bagaimana",
  "gimana",
  "dengan",
  "adalah",
  "pada",
  "juga",
  "nya",
  "sih",
  "kah",
  "lah"
]);

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string) {
  return normalize(text)
    .split(" ")
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

export function validateQuestion(input: unknown) {
  if (typeof input !== "string") {
    return { ok: false as const, error: "Pertanyaan tidak valid." };
  }
  const value = input.trim();
  if (!value) {
    return { ok: false as const, error: "Tulis pertanyaan terlebih dahulu." };
  }
  if (value.length > 500) {
    return {
      ok: false as const,
      error: "Pertanyaan maksimal 500 karakter."
    };
  }
  return { ok: true as const, value };
}

const SUPPORTED_QUESTION_PATTERNS = [
  /\b(apam|kue|rasa|varian|menu|harga|original|cokelat|coklat|keju|isi|butir|kotak|enak|manis|lembut|wangi|aroma|karamel)\b/,
  /\b(pesan|order|beli|pemesanan|preorder|h-1|hampers|parsel|acara|arisan|grosir|reseller|catering|souvenir|hadiah)\b/,
  /\b(kirim|antar|pengiriman|ongkir|kurir|pickup|ambil|cod|gofood|grabfood|shopeefood|luar kota)\b/,
  /\b(simpan|tahan|awet|basi|kadaluarsa|expired|kulkas|freezer|hangat|hangatkan|panaskan|kukus|microwave)\b/,
  /\b(bahan|komposisi|alergi|alergen|telur|susu|kacang|gluten|vegan|vegetarian|pengawet)\b/,
  /\b(halal|sertifikat|sertifikasi)\b/,
  /\b(lokasi|alamat|peta|maps|dimana|di mana|arah|mempawah|kuala secapah|kalimantan|pontianak)\b/,
  /\b(jam|buka|tutup|operasional|preorder|pre order)\b/,
  /\b(kontak|whatsapp|wa|instagram|ig|tiktok|telepon|nomor|hubungi|dm|chat)\b/,
  /\b(bayar|pembayaran|transfer|qris|cod|tunai|rekening|dp)\b/,
  /\b(fresh|segar|baru|produksi|dibuat|kualitas|promo|diskon|stok|tersedia)\b/,
  /\b(brunei|karamel|gula hangus|tradisional|rumahan)\b/
];

export function isSupportedQuestion(text: string) {
  const value = normalize(text);
  return SUPPORTED_QUESTION_PATTERNS.some((pattern) => pattern.test(value));
}

export function isPromptInjection(text: string) {
  const value = normalize(text);
  return [
    /abaikan (semua )?(instruksi|aturan|prompt)/,
    /ignore (all )?(instructions|rules|prompt)/,
    /system prompt/,
    /api key/,
    /developer mode/,
    /jailbreak/,
    /kamu sekarang (adalah|jadi)/
  ].some((pattern) => pattern.test(value));
}

export function retrieveKnowledge(
  question: string,
  documents: KnowledgeDoc[] = KNOWLEDGE,
  topK = 4
): KnowledgeHit[] {
  const queryTokens = new Set(tokens(question));
  if (queryTokens.size === 0) return [];
  const normalizedQuestion = normalize(question);

  const results = documents.map((document) => {
    const documentText = `${document.text} ${document.keywords.join(" ")}`;
    const documentTokens = new Set(tokens(documentText));
    let matches = 0;
    for (const token of queryTokens) {
      if (documentTokens.has(token)) matches += 1;
    }
    let score =
      matches /
      Math.sqrt(queryTokens.size * Math.max(documentTokens.size, 1));

    for (const keyword of document.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (
        normalizedKeyword.length > 2 &&
        normalizedQuestion.includes(normalizedKeyword)
      ) {
        score += 0.35;
        break;
      }
    }

    return { ...document, score };
  });

  return results
    .filter((document) => document.score >= 0.12)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

function linkToWhatsapp(label = "Buka WhatsApp"): ChatLink | undefined {
  return whatsapp ? { label, href: whatsapp.href } : undefined;
}

export function getLocalReply(question: string): LocalReply | null {
  const value = normalize(question);

  if (/(jam|buka|tutup|operasional)/.test(value)) {
    return {
      text: "Apam Gula Hangus buka setiap hari pukul 08.00-17.00 WIB. Untuk jumlah banyak, disarankan pre-order H-1.",
      sources: ["Jam buka"]
    };
  }

  if (
    /(menu|varian|rasa|pilihan|opsi)\s+(lain|lainnya|tambahan|baru)|selain (itu|ini|yang)|ada (lagi|menu lain|varian lain|rasa lain)|(cuma|hanya) (ini|itu)|menu.*selain|menu.*(baru|tambahan)/.test(
      value
    )
  ) {
    return {
      text: `Sepengetahuan Pampam, belum ada menu lain di luar varian yang tertera saat ini. Menu yang tersedia:\n${menuList}\n\nJika nanti ada varian baru atau menu musiman, biasanya diumumkan lewat Instagram atau WhatsApp.`,
      links: MENU_LINKS,
      sources: ["Ketersediaan menu", "Menu dan harga"]
    };
  }

  if (/(promo|diskon|potongan harga)/.test(value)) {
    return {
      text: "Belum ada informasi promo atau diskon resmi yang tercatat saat ini. Untuk menanyakan promo yang sedang berjalan, silakan cek Instagram atau hubungi WhatsApp kami.",
      links: [
        ...(instagram ? [{ label: "Instagram", href: instagram.href }] : []),
        ...(whatsapp ? [{ label: "WhatsApp", href: whatsapp.href }] : [])
      ],
      sources: ["Ketersediaan menu"]
    };
  }

  const mentionedProduct = data.menu.products.find((product) => {
    const name = normalize(product.name);
    return (
      value.includes(name) ||
      (name === "cokelat" && value.includes("coklat"))
    );
  });

  if (
    mentionedProduct &&
    /(harga|berapa|isi|butir|kotak|ukuran|varian|rasa)/.test(value)
  ) {
    return {
      text: `${mentionedProduct.name}: ${mentionedProduct.price} per kotak, ${mentionedProduct.quantity}. Untuk varian lain, Pampam bisa bantu sebutkan daftar menunya.`,
      links: MENU_LINKS,
      sources: [`Menu ${mentionedProduct.name}`]
    };
  }

  if (/(menu|harga|varian|rasa|original|cokelat|coklat|keju|isi|butir)/.test(value)) {
    return {
      text: `Menu yang tersedia saat ini:\n${menuList}\n\nHarga tersebut berlaku per kotak. Pemesanan dapat dilakukan melalui WhatsApp.`,
      links: MENU_LINKS,
      sources: ["Menu dan harga"]
    };
  }

  if (/(lokasi|alamat|peta|maps|dimana|di mana|arah|mempawah)/.test(value)) {
    return {
      text: `Lokasi Apam Gula Hangus: ${data.footer.address}.`,
      links: [{ label: "Buka Peta Lokasi", href: data.footer.map.href }],
      sources: ["Lokasi"]
    };
  }

  if (/(kontak|whatsapp|\bwa\b|instagram|\big\b|tiktok|telepon|nomor|hubungi|dm)/.test(value)) {
    return {
      text: `Kontak Apam Gula Hangus:\n- WhatsApp: ${data.footer.contact.whatsappLabel}\n- Instagram: @apamgula.hangus\n- TikTok: @apamgula.hangus`,
      links: [
        ...(whatsapp ? [{ label: "WhatsApp", href: whatsapp.href }] : []),
        ...(instagram ? [{ label: "Instagram", href: instagram.href }] : []),
        ...(tiktok ? [{ label: "TikTok", href: tiktok.href }] : [])
      ],
      sources: ["Kontak"]
    };
  }

  if (/(halal|sertifikat|sertifikasi)/.test(value)) {
    return {
      text: data.halal.description,
      sources: ["Sertifikasi halal"]
    };
  }

  if (
    /(pesan|order|beli|pemesanan|preorder|pre order|hampers|parsel|acara|arisan|grosir|reseller)/.test(
      value
    )
  ) {
    return {
      text: `Pemesanan dapat dilakukan melalui WhatsApp ${data.footer.contact.whatsappLabel}. Sebutkan varian, jumlah kotak, nama, serta alamat atau titik pengambilan. Untuk acara atau jumlah banyak, disarankan pre-order H-1.`,
      links: linkToWhatsapp() ? [linkToWhatsapp()!] : undefined,
      sources: ["Cara pesan"]
    };
  }

  return null;
}

export function composeFlexibleReply(
  question: string,
  hits: KnowledgeHit[]
): LocalReply {
  if (hits.length > 0) {
    const topScore = hits[0].score;
    const selected = hits
      .filter((hit) => hit.score >= topScore * 0.6)
      .slice(0, 2);
    const sources = [...new Set(selected.map((hit) => hit.source))];
    const facts = selected.map((hit) => hit.text).join(" ");
    return {
      text: `Berdasarkan informasi yang tersedia: ${facts} Jika perlu detail tambahan atau memastikan ketersediaan, silakan hubungi kami melalui WhatsApp.`,
      links: linkToWhatsapp() ? [linkToWhatsapp()!] : undefined,
      sources
    };
  }

  return {
    text: "Maaf, informasi spesifik itu belum tercatat di panduan Pampam. Pampam bisa membantu soal menu, harga, isi kotak, jam buka, pemesanan, pengiriman, penyimpanan, halal, kontak, dan lokasi. Untuk pertanyaan lain, silakan hubungi WhatsApp agar dibantu langsung.",
    links: linkToWhatsapp() ? [linkToWhatsapp()!] : undefined,
    sources: []
  };
}

export const REFUSAL_INJECTION: LocalReply = {
  text: "Maaf, saya hanya bisa membantu menjawab pertanyaan seputar Apam Gula Hangus. Silakan tanyakan menu, harga, pemesanan, pengiriman, lokasi, atau kontak.",
  sources: []
};

export const CHATBOT_TOPICS = [
  { key: "menu", label: "Lihat Menu" },
  { key: "hours", label: "Jam Buka" },
  { key: "contact", label: "Kontak" },
  { key: "location", label: "Lokasi" }
] as const;
