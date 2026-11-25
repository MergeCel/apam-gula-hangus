"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent
} from "react";

type Product = {
  name: string;
  price: string;
  quantity: string;
  image: string;
};

const SWIPE_THRESHOLD = 40;

type Gesture = {
  startX: number;
  startY: number;
  lastDx: number;
  axis: "x" | "y" | null;
  moved: boolean;
};

export default function MenuCarousel({ products }: { products: Product[] }) {
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
            Math.min(
              products.length - 1,
              index + (current.lastDx < 0 ? 1 : -1)
            )
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
    <div className="menu-mobile" role="region" aria-label="Menu">
      <div
        className={`menu-mobile-track${dragging ? " is-dragging" : ""}`}
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
        {products.map((product, index) => (
          <button
            type="button"
            key={product.name}
            className={`menu-mobile-slide${
              index === active ? " is-active" : ""
            }`}
            aria-label={`Tampilkan menu ${product.name}`}
            aria-pressed={index === active}
            onClick={() => handleClick(index)}
          >
            <span className="menu-mobile-image">
              <Image
                src={product.image}
                alt={`Apam gula hangus rasa ${product.name}`}
                fill
                sizes="64vw"
                draggable={false}
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
