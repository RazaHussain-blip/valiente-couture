import { useEffect, useState } from "react";
import { renderFabric } from "../../lib/fabric";
import { images } from "../../data/images";

/**
 * One continuous sheet of ivory satin fixed behind the whole page.
 * Sections tint it (blush, cream, paper) instead of covering it, so the
 * site reads as a single atelier environment from hero to footer.
 *
 * If a real fabric photograph is configured (images.backdrop), it is used
 * instead of the procedural texture.
 */
export default function FabricBackdrop() {
  const [url, setUrl] = useState(images.backdrop ? images.backdrop.src : null);

  useEffect(() => {
    if (images.backdrop) return undefined;
    let cancelled = false;
    let lastAspect = 0;
    let timer = 0;

    const draw = async () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const aspect = w / h;
      // Only redraw when the shape changes noticeably (not on mobile URL-bar resizes).
      if (lastAspect && Math.abs(aspect - lastAspect) / lastAspect < 0.25) return;
      lastAspect = aspect;
      const result = await renderFabric(w, h);
      if (!cancelled) setUrl(result);
    };

    draw();
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(draw, 400);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className={`fabric-backdrop ${url ? "is-ready" : ""}`}
      style={url ? { "--fabric": `url("${url}")` } : undefined}
      aria-hidden="true"
    />
  );
}
