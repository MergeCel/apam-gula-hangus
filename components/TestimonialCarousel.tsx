"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { LineIcon } from "./Icons";

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  image: string;
  rating: number;
};

const MAX_VISIBLE = 3;

export default function TestimonialCarousel({
  testimonials
}: {
  testimonials: Testimonial[];
}) {
  const [visible, setVisible] = useState(MAX_VISIBLE);
  const total = testimonials.length;

  // Three copies of the list: the visible window always sits on the middle
  // copy, so it can slide either way forever. Whenever the window drifts onto
  // an outer copy it is silently re-centred, which looks identical.
  const canLoop = total > visible;
  const rendered = canLoop
    ? [...testimonials, ...testimonials, ...testimonials]
    : testimonials;

  const [offset, setOffset] = useState(total);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 900px)");
    const update = () => setVisible(query.matches ? 1 : MAX_VISIBLE);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const recentre = (value: number) => {
    if (!canLoop || total === 0) return value;
    if (value < total) return value + total;
    if (value >= total * 2) return value - total;
    return value;
  };

  const shift = (direction: number) => {
    if (total === 0) return;
    setOffset((value) => {
      if (!canLoop) {
        const maxIndex = Math.max(0, total - visible);
        return Math.min(maxIndex, Math.max(0, value + direction));
      }
      return recentre(value + direction);
    });
  };

  useEffect(() => {
    if (visible !== 1 || !canLoop) return;
    const timer = window.setInterval(() => shift(1), 2000);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, canLoop, total]);

  const trackStyle = {
    "--visible": visible,
    "--testimonial-gap": "1.5rem",
    transform: `translateX(calc(${-offset} * (100% + var(--testimonial-gap)) / var(--visible)))`,
    transition: "none"
  } as CSSProperties;

  return (
    <div className="testimonial-carousel">
      <button
        type="button"
        className="carousel-arrow"
        onClick={() => shift(-1)}
        disabled={total === 0}
        aria-label="Testimoni sebelumnya"
      >
        <LineIcon name="chevron-left" />
      </button>

      <div
        className="testimonial-viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimoni pelanggan"
      >
        <div
          className={`testimonial-track${visible === 1 ? " is-auto" : ""}${
            canLoop ? " is-loop" : ""
          }`}
          style={trackStyle}
        >
          {rendered.map((item, itemIndex) => (
            <article
              className="testimonial-card"
              key={`${item.name}-${itemIndex}`}
              aria-hidden={
                itemIndex < total || itemIndex >= total * 2 ? true : undefined
              }
            >
              <Image
                src={item.image}
                alt={`Testimoni ${item.name}`}
                fill
                sizes="(max-width: 900px) 90vw, 360px"
              />
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="carousel-arrow"
        onClick={() => shift(1)}
        disabled={total === 0}
        aria-label="Testimoni berikutnya"
      >
        <LineIcon name="chevron-right" />
      </button>
    </div>
  );
}
