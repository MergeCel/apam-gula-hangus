"use client";

import { useEffect, useState } from "react";

type HeroTransitionProps = {
  images: string[];
  tabletImages?: string[];
  mobileImages?: string[];
};

export default function HeroTransition({
  images,
  tabletImages,
  mobileImages
}: HeroTransitionProps) {
  const [active, setActive] = useState(0);
  const total = Math.max(
    images.length,
    tabletImages?.length ?? 0,
    mobileImages?.length ?? 0
  );

  useEffect(() => {
    if (total < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [total]);

  const renderFrames = (sources: string[] | undefined, modifier?: string) =>
    sources?.map((src, index) => (
      <span
        key={`${modifier ?? "base"}-${src}`}
        className={`hero-transition-frame${modifier ? ` ${modifier}` : ""}`}
        style={{
          backgroundImage: `url("${src}")`,
          opacity: index === active % sources.length ? 1 : 0
        }}
      />
    ));

  return (
    <div className="hero-transition" aria-hidden="true">
      {renderFrames(images)}
      {tabletImages?.length
        ? renderFrames(tabletImages, "is-tablet")
        : null}
      {mobileImages?.length
        ? renderFrames(mobileImages, "is-mobile")
        : null}
    </div>
  );
}
