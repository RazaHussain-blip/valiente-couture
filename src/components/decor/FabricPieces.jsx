import { useEffect, useState } from "react";
import { getFabric } from "../../lib/fabric";

/**
 * Layered fabric pieces - tweed swatches with frayed edges, silk drapes,
 * thread spools - placed around sections like objects laid on the
 * atelier table. All decorative (aria-hidden), drawn with CSS / SVG.
 *
 * <FabricDefs /> must be rendered once (it holds the SVG fray filter).
 */

export function FabricDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="fray" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale="9" />
      </filter>
    </svg>
  );
}

/** tone: "rose" | "ivory" | "blush" */
export function Tweed({ tone = "rose", className = "", style }) {
  return <span className={`tweed tweed--${tone} ${className}`} style={style} aria-hidden="true" />;
}

/** Shared procedural silk textures (rendered once, reused by every drape). */
function useSilk(tone) {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    let alive = true;
    getFabric(`silk-${tone}`, 900, 1100, { tone, seed: tone === "blush" ? 17 : 29, rotate: -52, relief: 150, downscale: 1.8 })
      .then((u) => alive && setUrl(u));
    return () => {
      alive = false;
    };
  }, [tone]);
  return url;
}

/** A piece of silk laid down in soft folds, with an irregular cut edge. */
export function SilkDrape({ tone = "blush", className = "", style }) {
  const url = useSilk(tone);
  return (
    <span className={`silk-drape silk-drape--${tone} ${className}`} style={style} aria-hidden="true">
      <span className="silk-drape__cloth" style={url ? { backgroundImage: `url("${url}")` } : undefined} />
    </span>
  );
}

export function Spool({ className = "", style }) {
  return (
    <span className={`spool ${className}`} style={style} aria-hidden="true">
      <span className="spool__thread" />
    </span>
  );
}
