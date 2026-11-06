import { useEffect, useRef, useState } from "react";
import { brand, sections } from "../data/content";
import Logo from "./Logo";

/**
 * Hero top bar: brand framed by fine rules on the left, section links on
 * the right (as in the approved hero). Scrolls away with the hero.
 * On small screens the links collapse into a full-screen menu.
 */
export default function MainNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const firstLinkRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <header className="main-nav">
      <a href="#home" className="brand-mark" aria-label={`${brand.name}, home`}>
        <span className="brand-mark__rule" aria-hidden="true" />
        <Logo className="brand-mark__logo" priority />
        <span className="brand-mark__rule" aria-hidden="true" />
      </a>

      <nav className="main-nav__links" aria-label="Main">
        <ul>
          {sections.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={index === 0 ? "is-current" : undefined}
                aria-current={index === 0 ? "location" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        ref={toggleRef}
        type="button"
        className="main-nav__toggle"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen(true)}
      >
        <span className="main-nav__toggle-lines" aria-hidden="true" />
        Menu
      </button>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!menuOpen}
      >
        <button
          type="button"
          className="mobile-menu__close"
          onClick={() => setMenuOpen(false)}
        >
          Close <span aria-hidden="true">&times;</span>
        </button>
        <Logo className="mobile-menu__logo" />
        <ul>
          {sections.map((item, index) => (
            <li key={item.id}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  setMenuOpen(false);
                  requestAnimationFrame(() => {
                    document.getElementById(item.id)?.scrollIntoView({ block: "start" });
                    history.replaceState(null, "", `#${item.id}`);
                  });
                }}
              >
                <span>{item.number}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mobile-menu__foot">{brand.location}</p>
      </div>
    </header>
  );
}
