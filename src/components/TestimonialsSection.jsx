import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "../data/content";
import { FabricLabel } from "./decor/Textiles";

const AUTOPLAY_MS = 8000;
const SWIPE_THRESHOLD = 0.15; // share of the slide width a drag must travel

/**
 * Client testimonials as a carousel of personal notes, with no visible
 * navigation.
 * - Advances on its own and loops seamlessly (a copy of the first note
 *   sits after the last, so it never rewinds backwards).
 * - Drag with a mouse or swipe with a finger; the note follows the pointer.
 * - Pauses only while a mouse hovers it, while dragging, while it has
 *   keyboard focus (arrow keys then move it) or while the tab is hidden.
 */
export default function TestimonialsSection() {
  const count = testimonials.length;
  const slides = count > 1 ? [...testimonials, testimonials[0]] : testimonials;

  const [index, setIndex] = useState(0); // 0..count (count = the copy of the first note)
  const [animate, setAnimate] = useState(true);
  const [dragPx, setDragPx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [hidden, setHidden] = useState(false);

  const viewportRef = useRef(null);
  const dragRef = useRef(null);
  const pendingRef = useRef(null);

  const next = useCallback(() => {
    if (count < 2) return;
    setAnimate(true);
    setIndex((i) => Math.min(i + 1, count));
  }, [count]);

  const prev = useCallback(() => {
    if (count < 2) return;
    setIndex((i) => {
      if (i > 0) {
        setAnimate(true);
        return i - 1;
      }
      // At the first note: jump (unseen) to the copy at the end, then slide back one.
      setAnimate(false);
      pendingRef.current = count - 1;
      return count;
    });
  }, [count]);

  // After an unseen jump, turn animation back on (and finish a pending move).
  useEffect(() => {
    if (animate) return undefined;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setAnimate(true);
        if (pendingRef.current !== null) {
          setIndex(pendingRef.current);
          pendingRef.current = null;
        }
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [animate]);

  // Reaching the copy of the first note: snap back to the real first note.
  const onTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return;
    if (index === count && count > 1) {
      setAnimate(false);
      setIndex(0);
    }
  };

  // Autoplay
  const paused = hovered || keyboardFocus || dragging || hidden;
  useEffect(() => {
    if (count < 2 || paused) return undefined;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, count, next]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Drag / swipe (mouse, pen and touch)
  const onPointerDown = (event) => {
    if (count < 2 || (event.pointerType === "mouse" && event.button !== 0)) return;
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      width: viewportRef.current.offsetWidth,
      active: false,
    };
  };

  const onPointerMove = (event) => {
    const d = dragRef.current;
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.startX;
    const dy = event.clientY - d.startY;
    if (!d.active) {
      // Only take over clearly horizontal movement; vertical scrolling stays native.
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      d.active = true;
      setDragging(true);
      setAnimate(false);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    setDragPx(dx);
  };

  const endDrag = (event) => {
    const d = dragRef.current;
    if (!d || d.id !== event.pointerId) return;
    dragRef.current = null;
    if (!d.active) return;
    const dx = event.clientX - d.startX;
    setDragging(false);
    setDragPx(0);
    setAnimate(true);
    if (dx < -d.width * SWIPE_THRESHOLD) next();
    else if (dx > d.width * SWIPE_THRESHOLD) prev();
  };

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
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
          onFocus={(e) => e.currentTarget.matches(":focus-visible") && setKeyboardFocus(true)}
          onBlur={() => setKeyboardFocus(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
          }}
        >
          <div
            ref={viewportRef}
            className={`carousel__viewport ${dragging ? "is-dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className={`carousel__track ${animate ? "" : "no-anim"}`}
              style={{ transform: `translateX(calc(${-index * 100}% + ${dragPx}px))` }}
              onTransitionEnd={onTransitionEnd}
            >
              {slides.map((item, i) => {
                const isCopy = i === count;
                const isActive = i === index;
                return (
                  <div
                    key={isCopy ? `${item.name}-copy` : item.name}
                    className="carousel__slide"
                    role={isCopy ? undefined : "group"}
                    aria-roledescription={isCopy ? undefined : "slide"}
                    aria-label={isCopy ? undefined : `${i + 1} of ${count}`}
                    aria-hidden={!isActive || isCopy}
                    inert={!isActive || undefined}
                  >
                    <Note item={item} />
                  </div>
                );
              })}
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
