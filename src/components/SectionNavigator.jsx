import { useEffect, useRef, useState } from "react";
import { sections } from "../data/content";
import MeasuringTape, { tapeCurve } from "./decor/MeasuringTape";

/* Shape of the full-height tape. Labels are printed on the tape itself. */
const TAPE_WIDTH = 74;
const SVG_WIDTH = 116;
const AMP = 15;
const WAVES = 0.7;
const PHASE = 0.9;
const STOPS = [0.27, 0.4, 0.53, 0.66, 0.79];

function useViewportHeight() {
  const [h, setH] = useState(() => (typeof window === "undefined" ? 900 : window.innerHeight));
  useEffect(() => {
    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setH(window.innerHeight));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return h;
}

/**
 * Measuring-tape section navigator (as in the approved hero).
 * Tablet/desktop: a softly curving tape down the right edge with each
 * section printed on it; the current section gets a rose marker.
 * Mobile: a compact tape tab that appears after the hero.
 */
export default function SectionNavigator({ heroPassed, activeId }) {
  const height = useViewportHeight();
  const geometry = { width: SVG_WIDTH, height, amp: AMP, waves: WAVES, phase: PHASE };
  const { x } = tapeCurve(geometry);
  const active = sections.find((s) => s.id === activeId) || sections[0];

  return (
    <>
      <nav className="tape-nav" aria-label="Page sections">
        <div className="tape-nav__tape" style={{ width: SVG_WIDTH, height }}>
          <MeasuringTape {...geometry} tapeWidth={TAPE_WIDTH} numbers={false} side="left" />
          <ol>
            {sections.map((item, i) => {
              const y = STOPS[i] * height;
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`tape-nav__item ${isActive ? "is-active" : ""}`}
                    style={{ left: x(y) - TAPE_WIDTH / 2, top: y }}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className="tape-nav__number" aria-hidden="true">
                      {item.number}
                    </span>
                    <span className="tape-nav__label">{item.label}</span>
                    <span className="tape-nav__dot" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>

      <MobileSectionMenu visible={heroPassed} active={active} activeId={activeId} />
    </>
  );
}

function MobileSectionMenu({ visible, active, activeId }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`tape-tab ${visible ? "is-visible" : ""} ${open ? "is-open" : ""}`}
      aria-hidden={!visible}
    >
      <ul id="tape-tab-list" className="tape-tab__list" hidden={!open}>
        {sections.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.id === activeId ? "is-active" : ""}
              aria-current={item.id === activeId ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              <span>{item.number}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="tape-tab__button"
        aria-expanded={open}
        aria-controls="tape-tab-list"
        tabIndex={visible ? 0 : -1}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="tape-tab__number">{active.number}</span>
        <span className="tape-tab__text">
          <span className="sr-only">Sections, current: </span>
          {active.label}
        </span>
        <span className="tape-tab__chevron" aria-hidden="true" />
      </button>
    </div>
  );
}
