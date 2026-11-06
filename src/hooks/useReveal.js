import { useEffect } from "react";

/**
 * Gentle reveal for elements marked with `data-reveal`.
 * Content is only hidden once this hook has run (html.reveal-ready),
 * so nothing disappears if JavaScript fails. Reduced-motion users
 * see everything immediately (handled in CSS).
 */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const targets = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) return;
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
