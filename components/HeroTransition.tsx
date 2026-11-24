"use client";

import { useEffect, useState } from "react";

export default function HeroTransition({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="hero-transition" aria-hidden="true">
      {images.map((src, index) => (
        <span
          key={src}
          className="hero-transition-frame"
          style={{
            backgroundImage: `url("${src}")`,
            opacity: index === active ? 1 : 0
          }}
        />
      ))}
    </div>
  );
}
