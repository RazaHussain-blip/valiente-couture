import { useEffect, useState } from "react";

/**
 * Measures the anchor elements inside `containerRef` and returns an SVG
 * path that loops gently from one anchor to the next, like a sewing
 * thread. Also returns the container size and a scroll progress (0-1)
 * so the thread can "sew itself" as the visitor moves through the section.
 */
export function useThreadPath(containerRef, anchorSelector) {
  const [state, setState] = useState({ d: "", width: 0, height: 0, start: null });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const build = () => {
      const box = container.getBoundingClientRect();
      const points = [...container.querySelectorAll(anchorSelector)].map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      if (points.length < 2) return;

      const bulge = Math.min(90, box.width * 0.09);
      const first = points[0];
      const start = { x: first.x, y: Math.max(0, first.y - 70) };
      let d = `M ${start.x} ${start.y} L ${first.x} ${first.y}`;
      for (let i = 1; i < points.length; i += 1) {
        const a = points[i - 1];
        const b = points[i];
        const dy = b.y - a.y;
        const side = i % 2 ? 1 : -1;
        d += ` C ${a.x + bulge * side} ${a.y + dy * 0.35}, ${b.x - bulge * side} ${b.y - dy * 0.35}, ${b.x} ${b.y}`;
      }
      const last = points[points.length - 1];
      d += ` L ${last.x} ${Math.min(box.height, last.y + 70)}`;
      setState({ d, width: box.width, height: box.height, start });
    };

    build();
    const resizeObserver = new ResizeObserver(build);
    resizeObserver.observe(container);
    document.fonts?.ready.then(build);

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const r = container.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the top reaches 75% of the viewport, 1 when the bottom reaches 55%
        const start = vh * 0.75;
        const end = vh * 0.55;
        const p = (start - r.top) / (r.height - end + start);
        setProgress(Math.max(0, Math.min(1, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [containerRef, anchorSelector]);

  return { ...state, progress };
}
