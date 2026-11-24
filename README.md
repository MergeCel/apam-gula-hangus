# Apam Gula Hangus — Website Profil

Website profil satu halaman yang dibangun dengan Next.js App Router, TypeScript, dan CSS murni. Body memakai Poppins, sedangkan judul utama memakai Caveat. Seluruh konten disimpan di `data/site.json`; foto masih berupa placeholder bernama di `public/images/`.

## Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Build produksi:

```bash
npm run build
npm start
```

Pemeriksaan tipe:

```bash
npm run lint
```

## Struktur

```text
app/
├── globals.css        # seluruh tampilan, scallop, kartu cloud, responsif
├── layout.tsx         # metadata + font Poppins
└── page.tsx           # susunan section
components/
├── Header.tsx         # header desktop & menu mobile
├── Icons.tsx          # ikon garis (keunikan, sosial, panah)
└── TestimonialCarousel.tsx
data/
└── site.json          # navigasi, hero, cerita, menu, galeri, testimoni, footer
public/images/         # logo asli + ikon doodle + placeholder foto
scripts/
└── generate-assets.mjs
References/            # file sumber logo/ikon dan screenshot desain
```

## Mengubah konten

Semua teks dan daftar berada di `data/site.json`:

- `navigation`, `hero`, `story`
- `unique.items` (termasuk rotasi tiap kartu)
- `halal`, `menu.products`, `menu.cta`
- `gallery.items`, `testimonials.items`
- `footer`

Nomor WhatsApp, tautan Instagram/TikTok, dan tautan peta juga diatur dari JSON.

## Mengganti placeholder

Setiap gambar memiliki nama yang menjelaskan peruntukannya:

| File | Dipakai untuk |
| --- | --- |
| `hero-apam.svg` | latar hero |
| `Hero_Section transition 1.webp` — `3.webp` | overlay ikon hero yang berganti tiap 0,5 detik |
| `story-apam.svg` | foto pil di section cerita (380 × 140) |
| `unique-background.svg` | latar Keunikan Kami |
| `unique-card-photo.svg` | foto placeholder di dalam kartu Keunikan Kami |
| `card-cloud.svg`, `card-cloud-mask.svg` | bentuk kartu dan mask foto Keunikan Kami |
| `unique-band.svg`, `unique-band-vertical.svg` | pita wavy kartu Keunikan Kami |
| `halal-banner.svg`, `halal-logo.svg` | pil halal dan logo placeholder |
| `menu-original.svg`, `menu-coklat.svg`, `menu-keju.svg` | foto menu |
| `gallery-*.svg` | empat foto galeri |
| `testimonial-pattern.svg` | pola kertas kartu testimoni |
| `map-location.svg` | peta footer |

Ganti isi file dengan foto asli memakai nama yang sama, atau ubah path di `data/site.json`. Karena gambar di-cache satu tahun, gunakan nama file baru atau tambahkan `?v=2` jika mengganti gambar dengan nama yang sama. Untuk membuat ulang seluruh placeholder:

```bash
npm run assets
```

Logo asli memakai `logoapam.webp`. Doodle memakai `Group 38.svg` dan `Group 30.svg` dari folder gambar publik.

## Detail perilaku

- Navbar memakai logo webp berukuran kecil, border tipis, bayangan halus, dan teks navigasi tidak tebal.
- Judul hero, cerita, keunikan, menu, galeri, dan testimoni memakai font Caveat.
- Hero berukuran 690 px dan memakai tiga overlay ikon yang berganti langsung setiap 0,5 detik tanpa efek transisi (ditumpuk berulang di mobile).
- Gambar cerita berukuran 380 × 140 dengan teks yang lebih kecil.
- Kartu Keunikan Kami memakai foto placeholder di dalam bentuk cloud dengan garis oranye dan rotasi `2.04°`, `-2.17°`, dan `-3.82°`.
- Pita Keunikan Kami lebih bergelombang di desktop; di mobile pita mulai dari dalam kartu pertama dan memanjang hingga ujung section.
- Harga menu sejajar dengan nama produk, sedangkan label jumlah berada di bawah harga. Di mobile menu menjadi carousel tanpa tombol dengan gambar lebih kecil.
- Ikon WhatsApp memakai `react-icons` (`FaWhatsapp`).
- Foto galeri memiliki posisi yang sama, dimiringkan sesuai nilai `-4.52°`, `-0.89°`, `-2.97°`, dan `-0.89°`; di mobile galeri menjadi carousel tanpa tombol dengan gambar kecil (maksimal 270 px).
- Judul Galeri di mobile diapit doodle `Group 30.svg`.
- Carousel testimoni menampilkan 3 kartu penuh di desktop tanpa animasi geser; di mobile menjadi 1 kartu lebih kecil yang berganti langsung setiap 2 detik tanpa tombol.
- Peta footer diperkecil menjadi 320 × 200 di desktop dan maksimal 300 px di mobile.
- Di mobile judul testimoni menjadi “Kata Mereka”, doodle kanan memakai `Group 38.svg`, dan doodle kiri di bawah kartu memakai `Group 30.svg`.
- Semua gambar di `/images` diberi cache jangka panjang; Next Image juga memakai `minimumCacheTTL` satu tahun.
- Navigasi tidak memakai garis bawah maupun kursor pointer.
- Section galeri dan footer memakai tepi scallop.
- Animasi dinonaktifkan otomatis jika pengguna mengaktifkan `prefers-reduced-motion`.

## Chatbot Pampam

- Tombol bulat `pampam-coklat.png` ada di kanan bawah halaman utama dan membuka route `/chatbot`.
- Halaman chatbot memakai logo `pampam-putih.png` pada header dan avatar pesan bot.
- Pilihan topik cepat: **Lihat Menu**, **Jam Buka**, **Kontak**, dan **Lokasi**.
- Data pasti (menu, harga, isi kotak, jam, kontak, lokasi, halal, cara pesan) memakai respons lokal deterministik.
- Pertanyaan bebas memakai retrieval knowledge base. Jika API key Gemini tersedia, jawaban disusun oleh Gemini; jika tidak, Pampam memakai jawaban fallback dari dokumen yang paling relevan.
- Topik yang sedikit melenceng tetapi masih terkait (pengiriman, penyimpanan, bahan, alergi, pembayaran, hampers, dan sejenisnya) memiliki knowledge antisipasi agar jawaban tidak kaku.
- Saat Pampam menyiapkan jawaban, muncul bubble “. . .” sebagai indikator mengetik selama ±850 ms. Jeda ini dilewati jika proses jawaban memakan waktu lebih dari 2 detik.
- Footer dipisahkan ke `components/SiteFooter.tsx` agar dipakai di halaman utama dan chatbot.

## Konfigurasi Gemini (RAG)

API key hanya dibaca di server, bukan di bundle browser. Isi file `.env` di root proyek:

```env
GEMINI_API_KEY=isi-api-key-gemini-anda
GEMINI_MODEL=gemini-2.5-flash
```

Setelah mengubah `.env`, restart `npm run dev`.
File utama:

- `lib/chatbot.ts` — knowledge, intent, retrieval, fallback.
- `app/api/chat/route.ts` — proxy Gemini server-side, validasi, rate limit.
- `components/Chatbot.tsx` — orchestrator UI, streaming, typing bubble, sumber jawaban.
