/**
 * Small textile details drawn entirely in CSS (see "Textile details"
 * in index.css). All are decorative and hidden from screen readers.
 */

export function FabricLabel({ children, as: Tag = "p", className = "" }) {
  return <Tag className={`fabric-label ${className}`}>{children}</Tag>;
}

/** kind: "tweed" | "wool" | "silk" | "herringbone" | "linen" */
export function Swatch({ kind = "tweed", className = "", style }) {
  return <span className={`swatch swatch--${kind} ${className}`} style={style} aria-hidden="true" />;
}

export function SwatchFan({ className = "" }) {
  return (
    <span className={`swatch-fan ${className}`} aria-hidden="true">
      <Swatch kind="wool" />
      <Swatch kind="tweed" />
      <Swatch kind="silk" />
    </span>
  );
}

export function CoutureButton({ size, className = "" }) {
  return (
    <span
      className={`couture-button ${className}`}
      style={size ? { "--size": size } : undefined}
      aria-hidden="true"
    />
  );
}

/** A short straight length of measuring tape, used as "tape" holding photos. */
export function TapeStrip({ className = "" }) {
  return <span className={`tape-strip ${className}`} aria-hidden="true" />;
}
