import { useEffect, useRef, useState } from "react";

/**
 * Renders a client photograph from the central image config.
 * - Serves responsive WebP copies (with the original JPEG as fallback).
 * - Sets intrinsic width/height so the layout never shifts.
 * - `zoom` / `origin` from the config crop away badges or dark edges.
 * - If the file is missing, shows a refined placeholder naming the file.
 */
export default function Photo({
  image,
  className = "",
  tone = "light",
  loading = "lazy",
  priority = false,
  sizes = "(min-width: 1024px) 45vw, 92vw",
  compact = false,
}) {
  const [status, setStatus] = useState("loading");
  const imgRef = useRef(null);

  // Catch images that resolved (or failed) before React attached handlers.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      setStatus(img.naturalWidth > 0 ? "loaded" : "missing");
    }
  }, []);

  const fileName = decodeURI(image.src.split("/").pop());
  const style = {
    objectPosition: image.position || "center",
    "--zoom": image.zoom || 1,
    transformOrigin: image.origin || "50% 50%",
  };

  return (
    <div className={`photo photo--${tone} ${className}`}>
      {status === "missing" ? (
        <div
          className={`photo-placeholder ${compact ? "photo-placeholder--compact" : ""}`}
          role="img"
          aria-label={`${image.alt} (photograph to be added)`}
        >
          <span className="photo-placeholder__title">Photograph required</span>
          {!compact && <span className="photo-placeholder__need">{image.need}</span>}
          <code className="photo-placeholder__file">public/images/{fileName}</code>
        </div>
      ) : (
        <picture>
          {image.webp && (
            <source
              type="image/webp"
              srcSet={`${image.webp}-640.webp 640w, ${image.webp}-1170.webp 1170w`}
              sizes={sizes}
            />
          )}
          <img
            ref={imgRef}
            src={image.src}
            alt={image.alt}
            width={image.w}
            height={image.h}
            loading={priority ? "eager" : loading}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            style={style}
            className={`photo__img ${status === "loaded" ? "is-loaded" : ""}`}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("missing")}
          />
        </picture>
      )}
    </div>
  );
}
