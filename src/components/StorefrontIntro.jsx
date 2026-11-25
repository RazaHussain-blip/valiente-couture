import { useEffect, useRef } from "react";
import { brand, hero } from "../data/content";
import { images } from "../data/images";
import Logo from "./Logo";

/* Keep in step with "Storefront intro" timings in index.css:
   content fades 0-0.4s, doors swing 0.3-1.7s, walk-in 1.35-2.6s. */
const TOTAL_MS = 2700;

/**
 * Boutique storefront shown on page load: the logo on the sign band,
 * display windows with the client's garments, and a pair of glass doors.
 * "Explore the Website" swings the doors open on their hinges, then the
 * view walks through the doorway into the site, and the overlay unmounts.
 *
 * phase: "closed" | "opening"
 */
export default function StorefrontIntro({ phase, onOpen, onDone }) {
  const rootRef = useRef(null);
  const doorwayRef = useRef(null);

  // Lock page scrolling while the storefront is on screen.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    if (phase !== "opening") return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(onDone, reduced ? 50 : TOTAL_MS);
    return () => clearTimeout(timer);
  }, [phase, onDone]);

  // Zoom into the centre of the doorway, far enough that it fills the screen.
  const handleOpen = () => {
    const root = rootRef.current;
    const door = doorwayRef.current?.getBoundingClientRect();
    if (root && door) {
      const cx = door.left + door.width / 2;
      const cy = door.top + door.height / 2;
      const scale = Math.max(window.innerWidth / door.width, window.innerHeight / door.height) * 1.15;
      root.style.setProperty("--zoom-origin", `${cx}px ${cy}px`);
      root.style.setProperty("--zoom-scale", scale.toFixed(3));
    }
    onOpen();
  };

  return (
    <div
      ref={rootRef}
      className={`store store--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-heading"
      aria-describedby="store-text"
    >
      <div className="store__facade" aria-hidden="true">
        <div className="store__fascia">
          <Logo className="store__logo" priority />
        </div>

        <div className="store__front">
          <div className="store__pilaster" />

          <div className="store__window">
            <div className="store__window-glass">
              <img src={`${images.equestrian.webp}-640.webp`} alt="" decoding="async" style={{ objectPosition: "50% 30%" }} />
            </div>
          </div>

          <div className="store__entrance">
            <div className="store__doorway" ref={doorwayRef}>
              <div className="store__door store__door--left">
                <span className="store__handle" />
              </div>
              <div className="store__door store__door--right">
                <span className="store__handle" />
              </div>
            </div>
          </div>

          <div className="store__window">
            <div className="store__window-glass">
              <img src={`${images.dresses.webp}-640.webp`} alt="" decoding="async" style={{ objectPosition: "50% 35%" }} />
            </div>
          </div>

          <div className="store__pilaster" />
        </div>

        <div className="store__floor" />
      </div>

      <div className="store__content">
        <p id="store-heading" className="store__heading">
          {brand.tagline}
        </p>
        <p id="store-text" className="store__text">
          {hero.text}
        </p>
        <button type="button" className="store__button" onClick={handleOpen} disabled={phase !== "closed"}>
          Explore the Website
          <span className="store__arrow" aria-hidden="true">
            &rarr;
          </span>
        </button>
      </div>
    </div>
  );
}
