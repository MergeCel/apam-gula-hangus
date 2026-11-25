"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent
} from "react";

type GalleryItem = {
  caption: string;
  image: string;
};

const ROTATIONS = [-4.52, -0.89, -2.97, -0.89];
const SWIPE_THRESHOLD = 40;

type Gesture = {
  startX: number;
  startY: number;
  lastDx: number;
  axis: "x" | "y" | null;
  moved: boolean;
};

export default function GalleryCarousel({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    gesture.current = {
      startX: event.clientX,
      startY: event.clientY,
      lastDx: 0,
      axis: null,
      moved: false
    };
    suppressClick.current = false;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current) {
      return;
    }

    const dx = event.clientX - current.startX;
    const dy = event.clientY - current.startY;
    current.lastDx = dx;

    if (!current.axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) {
        return;
      }

      current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";

      if (current.axis === "y") {
        gesture.current = null;
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      setDragging(true);
    }

    if (current.axis !== "x") {
      return;
    }

    current.moved = true;
    setDrag(dx);
  };

  const endGesture = (event: PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (!current) {
      return;
    }

    if (current.axis === "x") {
      if (Math.abs(current.lastDx) > SWIPE_THRESHOLD) {
        setActive((index) =>
          Math.max(
            0,
            Math.min(items.length - 1, index + (current.lastDx < 0 ? 1 : -1))
          )
        );
      }

      suppressClick.current = current.moved;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    gesture.current = null;
    setDrag(0);
    setDragging(false);
  };

  const cancelGesture = () => {
    gesture.current = null;
    setDrag(0);
    setDragging(false);
  };

  const handleClick = (index: number) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }

    setActive(index);
  };

  return (
    <div className="gallery-mobile" role="region" aria-label="Galeri">
      <div
        className={`gallery-mobile-track${dragging ? " is-dragging" : ""}`}
        style={
          {
            "--active": active,
            "--drag": `${drag}px`
          } as CSSProperties
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endGesture}
        onPointerCancel={cancelGesture}
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
            onClick={() => handleClick(index)}
          >
            <span
              className="gallery-mobile-image"
              style={{
                transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)`
              }}
            >
              <Image
                src={item.image}
                alt={`Galeri apam gula hangus: ${item.caption}`}
                fill
                sizes="72vw"
                draggable={false}
              />
            </span>
            <span className="gallery-mobile-caption">{item.caption}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
