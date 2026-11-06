import { logo } from "../data/images";

/** The Valiente Couture logo. tone: "burgundy" (light backgrounds) | "ivory" (dark). */
export default function Logo({ tone = "burgundy", className = "", priority = false }) {
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
