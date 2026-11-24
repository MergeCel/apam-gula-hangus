import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = join(process.cwd(), "public", "images");
mkdirSync(root, { recursive: true });

const write = (name, svg) => {
  const file = join(root, name);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + "\n", "utf8");
};

/* ---------- cloud card shape ---------- */
function cloudPath(cx, cy, rx, ry, lobes, amp, steps = 84, power = 0.38) {
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const wobble = 1 + amp * Math.cos(lobes * t + 0.35);
    const px = Math.sign(c) * Math.pow(Math.abs(c), power);
    const py = Math.sign(s) * Math.pow(Math.abs(s), power);
    pts.push([cx + rx * px * wobble, cy + ry * py * wobble]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - 1 + pts.length) % pts.length];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    const p3 = pts[(i + 2) % pts.length];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(
      1
    )} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

const cardPath = cloudPath(340, 430, 296, 382, 9, 0.065);
write(
  "card-cloud.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="680" height="860" viewBox="0 0 680 860">
  <defs>
    <clipPath id="clip"><path d="${cardPath}"/></clipPath>
    <pattern id="dots" width="11" height="11" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.8" fill="#ead6b5"/>
    </pattern>
    <filter id="paper" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.045"/></feComponentTransfer>
    </filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3b1d09" flood-opacity="0.18"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <path d="${cardPath}" fill="#FFFDF8"/>
  </g>
  <g clip-path="url(#clip)">
    <rect width="680" height="860" fill="url(#dots)" opacity="0.55"/>
    <rect width="680" height="860" filter="url(#paper)"/>
  </g>
  <path d="${cardPath}" fill="none" stroke="#C87D28" stroke-width="3"/>
</svg>`
);

/* ---------- testimonial doodle pattern ---------- */
write(
  "testimonial-pattern.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
  <g fill="none" stroke="#dcc4a0" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
    <circle cx="22" cy="22" r="7"/>
    <rect x="46" y="12" width="18" height="14" rx="3"/>
    <path d="M96 12l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
    <path d="M124 12h18v14h-18zM128 12V7h10v5"/>
    <path d="M14 58h16v16H14z"/>
    <path d="M52 58a9 9 0 1 1 0 18 9 9 0 1 1 0-18"/>
    <path d="M86 56l8 15H78z"/>
    <circle cx="130" cy="65" r="8"/>
    <path d="M116 106h20v16h-20z"/>
    <path d="M14 110a8 8 0 0 1 16 0"/>
    <path d="M46 108q7-11 14 0q7 11 14 0"/>
    <path d="M92 102h18v18H92z"/>
    <circle cx="132" cy="132" r="8"/>
    <path d="M14 138h20M24 128v20"/>
    <path d="M60 134l10 10-10 10"/>
    <path d="M100 132l4 8 8 1-6 6 2 8-8-4-8 4 2-8-6-6 8-1z"/>
  </g>
</svg>`
);

/* ---------- map placeholder ---------- */
write(
  "map-location.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="772" height="520" viewBox="0 0 772 520">
  <rect width="772" height="520" fill="#e8ede4"/>
  <g fill="#d6e4cf">
    <path d="M0 300h210V150H0z"/>
    <path d="M520 0h252v190H520z"/>
    <path d="M580 300h192v220H580z"/>
  </g>
  <g stroke="#ffffff" stroke-width="14" stroke-linecap="round">
    <path d="M-20 120h820M-20 360h820M170-20v560M620-20v560"/>
  </g>
  <g stroke="#c9cdc4" stroke-width="7" stroke-linecap="round">
    <path d="M-20 240h820M-20 440h820M60-20v560M330-20v560M470-20v560M730-20v560"/>
  </g>
  <g stroke="#d8c8a8" stroke-width="3" stroke-dasharray="8 8">
    <path d="M-20 60h820M250-20v560M700-20v560"/>
  </g>
  <g fill="#ffffff" opacity="0.8">
    <rect x="200" y="160" width="70" height="46" rx="4"/>
    <rect x="400" y="270" width="90" height="56" rx="4"/>
    <rect x="660" y="80" width="60" height="40" rx="4"/>
    <rect x="80" y="380" width="80" height="48" rx="4"/>
  </g>
  <g transform="translate(386 236)">
    <path d="M0-52c-22 0-40 18-40 40 0 30 40 66 40 66s40-36 40-66c0-22-18-40-40-40z" fill="#b23b2a"/>
    <circle cy="-12" r="15" fill="#fff"/>
  </g>
  <text x="386" y="470" text-anchor="middle" font-family="Arial" font-size="15" fill="#6b7a63" opacity="0.7">PLACEHOLDER PETA LOKASI</text>
</svg>`
);

/* ---------- wavy unique band ---------- */
write(
  "unique-band-v3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="120" viewBox="0 0 1600 120" preserveAspectRatio="none">
  <defs>
    <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#B96F22"/><stop offset="0.5" stop-color="#D28B34"/><stop offset="1" stop-color="#C87D28"/>
    </linearGradient>
  </defs>
  <path fill="url(#band)" d="M0 30C120 18 220 12 320 20C450 30 560 55 700 68C820 80 940 78 1050 66C1160 54 1260 34 1380 30C1470 28 1540 38 1600 44L1600 100C1530 96 1460 92 1380 88C1260 84 1160 100 1050 116C940 130 820 132 700 118C560 104 450 88 320 78C220 70 120 78 0 88Z"/>
</svg>`
);

write(
  "unique-band-vertical-v3.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="1600" viewBox="0 0 120 1600" preserveAspectRatio="none">
  <defs>
    <linearGradient id="bandv" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#B96F22"/><stop offset="0.5" stop-color="#D28B34"/><stop offset="1" stop-color="#C87D28"/>
    </linearGradient>
  </defs>
  <path fill="url(#bandv)" d="M30 0C20 130 55 240 48 380C40 520 22 650 30 800C38 950 70 1040 68 1190C66 1330 38 1450 45 1600L105 1600C98 1450 126 1330 128 1190C130 1040 98 950 90 800C82 650 100 520 108 380C115 240 80 130 90 0Z"/>
</svg>`
);

/* ---------- card cloud mask ---------- */
write(
  "card-cloud-mask.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="680" height="860" viewBox="0 0 680 860">
  <path fill="#ffffff" d="${cardPath}"/>
</svg>`
);

/* ---------- halal placeholder logo ---------- */
write(
  "halal-logo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="240" viewBox="0 0 200 240">
  <g fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
    <path d="M100 14c26 30 44 62 44 96 0 34-20 58-44 72-24-14-44-38-44-72 0-34 18-66 44-96z"/>
    <path d="M100 52c14 22 24 42 24 62 0 22-11 38-24 47-13-9-24-25-24-47 0-20 10-40 24-62z"/>
    <path d="M100 96v42"/>
  </g>
  <text x="100" y="214" text-anchor="middle" font-family="Arial" font-size="30" font-weight="bold" fill="#ffffff">HALAL</text>
  <text x="100" y="234" text-anchor="middle" font-family="Arial" font-size="15" letter-spacing="4" fill="#ffffff">INDONESIA</text>
</svg>`
);

/* ---------- photo placeholders ---------- */
const palette = {
  kraft: ["#bd8f60", "#7a4a21"],
  amber: ["#b3732f", "#4a2810"],
  cream: ["#e2c397", "#b68145"],
  cocoa: ["#8a5a33", "#3d1f0c"],
};

function photo(w, h, label, mode = "box", tint = "kraft") {
  const [light, dark] = palette[tint];
  const labelSize = Math.max(12, Math.round(w / 52));
  const box = mode === "box" || mode === "spread";
  const seed = [...label].reduce((a, c) => a + c.charCodeAt(0), 0);
  const blobs = Array.from({ length: 6 }, (_, i) => {
    const x = ((seed * (i + 3) * 37) % 100) / 100;
    const y = ((seed * (i + 5) * 19) % 100) / 100;
    return `<circle cx="${(x * w).toFixed(0)}" cy="${(y * h).toFixed(0)}" r="${
      Math.round(Math.min(w, h) * (0.12 + (i % 3) * 0.05))
    }" fill="#ffd9a0" opacity="0.18"/>`;
  }).join("");

  let scene = "";
  if (box) {
    const cx = w / 2;
    const boxW = w * 0.78;
    const boxH = h * 0.5;
    const top = h * 0.3;
    const cells = [];
    const cols = 3;
    const rows = 3;
    const gapX = boxW * 0.26;
    const gapY = boxH * 0.26;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = cx + (c - 1) * gapX * 0.9 + (r % 2 ? gapX * 0.16 : 0);
        const y = top + boxH * 0.2 + r * gapY * 0.72;
        cells.push(
          `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(
            boxW * 0.095
          ).toFixed(0)}" fill="${tint === "cocoa" ? "#6b3a18" : "#c8862f"}"/>`
        );
        cells.push(
          `<circle cx="${(x - boxW * 0.018).toFixed(0)}" cy="${(
            y - boxW * 0.03
          ).toFixed(0)}" r="${(boxW * 0.078).toFixed(0)}" fill="${
            tint === "cocoa" ? "#7e4a21" : "#dca34c"
          }" opacity="0.85"/>`
        );
      }
    }
    scene = `
      <g>
        <path d="M${cx - boxW / 2} ${top}L${cx + boxW / 2} ${top - h * 0.05}L${
      cx + boxW / 2 - w * 0.02
    } ${top + boxH}L${cx - boxW / 2 + w * 0.02} ${top + boxH + h * 0.04}Z" fill="#b98a56"/>
        <path d="M${cx - boxW / 2} ${top}L${cx + boxW / 2} ${top - h * 0.05}L${
      cx + boxW * 0.62
    } ${top + h * 0.06}L${cx - boxW * 0.38} ${top + h * 0.1}Z" fill="#d8b17c"/>
        <path d="M${cx - boxW * 0.38} ${top + h * 0.1}L${cx + boxW * 0.62} ${
      top + h * 0.06
    }L${cx + boxW * 0.6} ${top + boxH * 0.9}L${cx - boxW * 0.4} ${
      top + boxH * 0.98
    }Z" fill="#e6c99a"/>
        ${cells.join("")}
      </g>`;
  } else {
    scene = `<g opacity="0.55">${Array.from({ length: 10 }, (_, i) => {
      const x = (w / 10) * i + w * 0.05;
      const y = h * (0.4 + (i % 3) * 0.12);
      return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(
        0
      )}" r="${(Math.min(w, h) * 0.13).toFixed(
        0
      )}" fill="#e2b166" opacity="0.4"/>`;
    }).join("")}</g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="${light}"/><stop offset="1" stop-color="${dark}"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="${Math.round(
      Math.min(w, h) * 0.06
    )}"/></filter>
    <radialGradient id="v"><stop offset="0.5" stop-color="#1e0f05" stop-opacity="0"/><stop offset="1" stop-color="#1e0f05" stop-opacity="0.35"/></radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g filter="url(#blur)">${blobs}</g>
  ${scene}
  <rect width="${w}" height="${h}" fill="url(#v)"/>
  ${
    label
      ? `<text x="${w - 22}" y="${h - 18}" text-anchor="end" font-family="Arial, sans-serif" font-size="${labelSize}" letter-spacing="1.5" fill="#fff8ec" opacity="0.55">${label}</text>`
      : ""
  }
</svg>`;
}

write("hero-apam.svg", photo(1600, 1000, "", "spread", "amber"));
write("story-apam.svg", photo(860, 320, "", "spread", "cocoa"));
write("unique-background.svg", photo(1600, 900, "", "spread", "cocoa"));
write("halal-banner.svg", photo(1400, 400, "", "spread", "cocoa"));
write("unique-card-photo.svg", photo(800, 1000, "", "blobs", "cream"));
write("menu-original.svg", photo(720, 680, "FOTO MENU · ORIGINAL", "box", "cream"));
write("menu-coklat.svg", photo(720, 680, "FOTO MENU · COKLAT", "box", "cocoa"));
write("menu-keju.svg", photo(720, 680, "FOTO MENU · KEJU", "box", "kraft"));
write("gallery-detail.svg", photo(600, 840, "GALERI · DETAIL TEKSTUR", "box", "cream"));
write("gallery-fresh.svg", photo(600, 840, "GALERI · BARU MATANG", "box", "kraft"));
write("gallery-order.svg", photo(600, 840, "GALERI · PESANAN ACARA", "box", "cream"));
write("gallery-topping.svg", photo(600, 840, "GALERI · TOPPING", "box", "kraft"));

console.log("Generated placeholder assets in public/images");
