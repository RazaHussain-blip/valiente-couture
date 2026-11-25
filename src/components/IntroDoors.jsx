import { useEffect } from "react";
import { brand, hero } from "../data/content";
import Logo from "./Logo";

/* Keep these in step with the timings in index.css ("Intro doors"). */
const CONTENT_FADE_MS = 350;
const DOOR_DELAY_MS = 150;
const DOOR_SLIDE_MS = 1200;

/**
 * Full-screen frosted-glass doors shown on page load. The website is
 * visible, blurred, through the glass. "Explore the Website" fades the
 * centre content, slides the doors apart and hands control back to the
 * page (the parent unmounts this component via `onDone`).
 *
 * phase: "closed" | "opening"
 */
export default function IntroDoors({ phase, onOpen, onDone }) {
  // Lock page scrolling while the doors are on screen.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Once the doors have parted, remove the overlay.
  useEffect(() => {
    if (phase !== "opening") return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 50 : Math.max(CONTENT_FADE_MS, DOOR_DELAY_MS + DOOR_SLIDE_MS) + 80;
    const timer = setTimeout(onDone, total);
    return () => clearTimeout(timer);
  }, [phase, onDone]);

  return (
    <div
      className={`intro intro--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-heading"
      aria-describedby="intro-text"
    >
      <div className="intro__door intro__door--left" aria-hidden="true" />
      <div className="intro__door intro__door--right" aria-hidden="true" />

      <div className="intro__content">
        <Logo className="intro__logo" priority />
        <p id="intro-heading" className="intro__heading">
          <span className="intro__rule" aria-hidden="true" />
          {brand.tagline}
          <span className="intro__rule" aria-hidden="true" />
        </p>
        <p id="intro-text" className="intro__text">
          {hero.text}
        </p>
        <button
          type="button"
          className="intro__button"
          onClick={onOpen}
          disabled={phase !== "closed"}
        >
          Explore the Website
          <span className="intro__arrow" aria-hidden="true">
            &rarr;
          </span>
        </button>
      </div>
    </div>
  );
}
