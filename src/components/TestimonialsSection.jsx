import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "../data/content";
import { FabricLabel } from "./decor/Textiles";

const AUTOPLAY_MS = 10000;

/**
 * Client testimonials as a carousel of personal notes, with no visible
 * navigation. It advances on its own and pauses while hovered or focused.
 * Visitors can also swipe (touch) or use the arrow keys once it has focus.
 * With reduced motion the notes change without sliding.
 */
export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = testimonials.length;

  const go = useCallback((step) => setCurrent((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const timer = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [current, paused, count, go]);

  if (count === 0) return null;

  return (
    <div className="notes">
      <div className="container-x">
        <header className="notes-head" data-reveal>
          <FabricLabel>Valiente Couture</FabricLabel>
          <h2 id="testimonials-title" className="display-heading">
            Testimonials
          </h2>
        </header>

        <div
          className="carousel"
          role="region"
          aria-roledescription="carousel"
          aria-labelledby="testimonials-title"
          tabIndex={0}
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
        >
          <div
            className="carousel__viewport"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="carousel__track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {testimonials.map((item, i) => (
                <div
                  key={item.name}
                  className="carousel__slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={i !== current}
                  inert={i !== current}
                >
                  <Note item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Note({ item }) {
  return (
    <figure className="note">
      <span className="note__mark" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote>
        <p>{item.quote}</p>
      </blockquote>
      <figcaption className="note__author">
        <span className="woven-name">{item.name}</span>
        {item.detail && <span className="note__detail">{item.detail}</span>}
      </figcaption>
    </figure>
  );
}
