import { logo } from "../data/images";

/** The Valiente Couture logo. tone: "rose" (#E19999, default) | "burgundy" | "ivory" (dark backgrounds). */
export default function Logo({ tone = "rose", className = "", priority = false }) {
  const base = logo[tone];
  return (
    <picture className={`logo ${className}`}>
      <source type="image/webp" srcSet={`${base}.webp`} />
      <img
        src={`${base}.png`}
        alt="Valiente Couture"
        width={logo.w}
        height={logo.h}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
