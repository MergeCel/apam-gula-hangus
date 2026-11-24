"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type Product = {
  name: string;
  price: string;
  quantity: string;
  image: string;
};

export default function MenuCarousel({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="menu-mobile" role="region" aria-label="Menu">
      <div
        className="menu-mobile-track"
        style={{ "--active": active } as CSSProperties}
      >
        {products.map((product, index) => (
          <button
            type="button"
            key={product.name}
            className={`menu-mobile-slide${
              index === active ? " is-active" : ""
            }`}
            aria-label={`Tampilkan menu ${product.name}`}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
          >
            <span className="menu-mobile-image">
              <Image
                src={product.image}
                alt={`Placeholder foto apam rasa ${product.name}`}
                fill
                sizes="64vw"
              />
            </span>
            <span className="menu-mobile-info">
              <span className="menu-mobile-name">{product.name}</span>
              <span className="menu-mobile-price">{product.price}</span>
              <span className="menu-mobile-qty">{product.quantity}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
