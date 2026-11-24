"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { LineIcon } from "./Icons";

type Testimonial = {
  name: string;
  location: string;
  quote: string;
  rating: number;
};

export default function TestimonialCarousel({
  testimonials
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 900px)");
    const update = () => setVisible(query.matches ? 1 : 3);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visible);
  const currentIndex = Math.min(index, maxIndex);

  useEffect(() => {
    if (visible !== 1) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value >= maxIndex ? 0 : value + 1));
    }, 2000);
    return () => window.clearInterval(timer);
  }, [visible, maxIndex]);

  const goTo = (direction: number) => {
    if (maxIndex === 0) return;
    const nextIndex = currentIndex + direction;
    const wrappedIndex =
      nextIndex < 0 ? maxIndex : nextIndex > maxIndex ? 0 : nextIndex;
    setIndex(wrappedIndex);
  };

  const trackStyle = {
    "--visible": visible,
    "--testimonial-gap": "1.5rem",
    transform: `translateX(calc(${-currentIndex} * (100% + var(--testimonial-gap)) / var(--visible)))`
  } as CSSProperties;

  return (
    <div className="testimonial-carousel">
      <button
        type="button"
        className="carousel-arrow"
        onClick={() => goTo(-1)}
        disabled={maxIndex === 0}
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
          className={`testimonial-track${visible === 1 ? " is-auto" : ""}`}
          style={trackStyle}
        >
          {testimonials.map((item, itemIndex) => (
            <article
              className={`testimonial-card ${
                itemIndex % 3 === 0 ? "badge-left" : "badge-right"
              }`}
              key={`${item.name}-${itemIndex}`}
            >
              <div className="testimonial-person">
                <span className="avatar">{item.name.trim().charAt(0).toUpperCase()}</span>
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.location}</small>
                </div>
              </div>
              <p className="testimonial-quote">“{item.quote}”</p>
              <span className="rating-badge">{item.rating}</span>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="carousel-arrow"
        onClick={() => goTo(1)}
        disabled={maxIndex === 0}
        aria-label="Testimoni berikutnya"
      >
        <LineIcon name="chevron-right" />
      </button>
    </div>
  );
}
