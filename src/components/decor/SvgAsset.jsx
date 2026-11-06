import { useEffect, useState } from "react";
import { svgAssets } from "../../data/images";

/**
 * Inlines one of the client's original SVG files (public/images) so it can
 * take the site palette while keeping its exact shapes, proportions and
 * transparency. The files themselves are never modified.
 *
 * Colour mapping:
 *   single-colour icons  -> the drawing uses `currentColor`
 *   two-colour icons     -> black = `currentColor`, white = var(--svg-fill)
 */
const cache = new Map();

function load(src) {
  if (!cache.has(src)) {
    cache.set(
      src,
      fetch(src)
        .then((r) => (r.ok ? r.text() : ""))
        .then(prepare)
        .catch(() => "")
    );
  }
  return cache.get(src);
}

function prepare(raw) {
  if (!raw.includes("<svg")) return "";
  let svg = raw.slice(raw.indexOf("<svg"));
  svg = svg.replace(/<!--[\s\S]*?-->/g, "");
  // Judge colours by the shapes only (the root <svg> often carries an unused default fill).
  const body = svg.slice(svg.indexOf(">") + 1);
  const hasBlack = /#000000/i.test(body);
  const hasWhite = /#ffffff/i.test(body);
  const white = hasBlack && hasWhite ? "var(--svg-fill, #fbf3ec)" : "currentColor";
  svg = svg
    .replace(/#000000/gi, "currentColor")
    .replace(/#ffffff/gi, white)
    // drop fixed pixel size so CSS controls it; keep viewBox (proportions)
    .replace(/<svg([^>]*?)\s(width|height)="[^"]*"/, "<svg$1")
    .replace(/<svg([^>]*?)\s(width|height)="[^"]*"/, "<svg$1")
    .replace(/\sid="[^"]*"/g, "")
    .replace("<svg", '<svg aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet"');
  return svg;
}

/** name: key of svgAssets (sewingMachine, measuringTape, spool, mannequin, shirtButton) */
export default function SvgAsset({ name, className = "", style }) {
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    let alive = true;
    load(svgAssets[name]).then((m) => alive && setMarkup(m));
    return () => {
      alive = false;
    };
  }, [name]);

  return (
    <span
      className={`svg-asset svg-asset--${name} ${className}`}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
