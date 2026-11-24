"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type GalleryItem = {
  caption: string;
  image: string;
};

const ROTATIONS = [-4.52, -0.89, -2.97, -0.89];

export default function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="gallery-mobile" role="region" aria-label="Galeri">
      <div
        className="gallery-mobile-track"
        style={{ "--active": active } as CSSProperties}
      >
        {items.map((item, index) => (
          <button
            type="button"
            key={item.caption}
            className={`gallery-mobile-slide${
              index === active ? " is-active" : ""
            }`}
            aria-label={`Tampilkan ${item.caption}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <span
              className="gallery-mobile-image"
              style={{
                transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)`
              }}
            >
              <Image
                src={item.image}
                alt={`Placeholder ${item.caption}`}
                fill
                sizes="72vw"
              />
            </span>
            <span className="gallery-mobile-caption">{item.caption}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
