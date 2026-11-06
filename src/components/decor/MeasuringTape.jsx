import { useId } from "react";

/**
 * Builds a gently curving vertical path. Exported so other components
 * (the tape navigator) can place items exactly on the tape.
 */
export function tapeCurve({ width, height, amp = 10, waves = 0.75, phase = 0 }) {
  const cx = width / 2;
  const x = (y) => cx + amp * Math.sin((y / height) * Math.PI * 2 * waves + phase);
  let d = `M ${x(0).toFixed(2)} 0`;
  for (let y = 6; y <= height; y += 6) d += ` L ${x(y).toFixed(2)} ${y}`;
  return { d, x };
}

/**
 * Decorative curved measuring tape (purely visual, aria-hidden).
 * Minor and major markings follow the curve via dashed strokes,
 * and the inch numbers run along the tape with <textPath>.
 */
export default function MeasuringTape({
  width = 64,
  height = 480,
  amp = 10,
  waves = 0.75,
  phase = 0,
  tapeWidth = 26,
  numbers = true,
  side = "right",
  className = "",
}) {
  const id = useId().replace(/:/g, "");
  const { d } = tapeCurve({ width, height, amp, waves, phase });
  const half = tapeWidth / 2;
  const dir = side === "left" ? -1 : 1;
  const count = Math.floor(height / 30);

  return (
    <svg
      className={`measuring-tape ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id={`tape-${id}`} d={d} />
        <filter id={`tape-shadow-${id}`} x="-50%" y="-5%" width="200%" height="110%">
          <feDropShadow dx="1.5" dy="2" stdDeviation="2" floodColor="#6e2f3a" floodOpacity="0.16" />
        </filter>
      </defs>

      {/* tape body */}
      <use href={`#tape-${id}`} className="measuring-tape__body" strokeWidth={tapeWidth} filter={`url(#tape-shadow-${id})`} />
      {/* woven sheen */}
      <use href={`#tape-${id}`} className="measuring-tape__sheen" strokeWidth={tapeWidth - 6} />
      {/* edges */}
      <use href={`#tape-${id}`} className="measuring-tape__edge" transform={`translate(${-half + 0.6} 0)`} />
      <use href={`#tape-${id}`} className="measuring-tape__edge" transform={`translate(${half - 0.6} 0)`} />
      {/* minor & major markings along the right edge */}
      <use href={`#tape-${id}`} className="measuring-tape__minor" transform={`translate(${dir * (half - 3.5)} 0)`} />
      <use href={`#tape-${id}`} className="measuring-tape__major" transform={`translate(${dir * (half - 6)} 0)`} />

      {numbers && (
        <text className="measuring-tape__numbers" transform={`translate(${-half / 2.4} 0)`}>
          {Array.from({ length: count }, (_, i) => (
            <textPath key={i} href={`#tape-${id}`} startOffset={i * 30 + 13}>
              {i + 1}
            </textPath>
          ))}
        </text>
      )}
    </svg>
  );
}
