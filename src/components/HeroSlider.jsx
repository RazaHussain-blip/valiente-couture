import { useEffect, useState } from "react";
import Photo from "./Photo";

const SLIDE_DURATION = 7000;

/**
 * Crossfades between hero compositions (if more than one is configured).
 * Rotation is paused for visitors who prefer reduced motion.
 */
export default function HeroSlider({ slides }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setTimeout(() => setCurrent((i) => (i + 1) % slides.length), SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [current, slides.length]);

  return (
    <div className="hero-slides">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`hero-slide ${index === current ? "is-active" : ""}`}
          aria-hidden={index !== current}
        >
          <Photo image={slide} tone="hero" priority={index === 0} sizes="(min-width: 900px) 45vw, 92vw" className="h-full w-full" />
        </div>
      ))}
    </div>
  );
}
