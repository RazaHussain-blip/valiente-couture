import { useEffect, useRef, useState } from "react";

/**
 * Pop-up gallery built on the native <dialog> (focus is kept inside it,
 * Escape closes it, the page behind is inert). Arrow keys and swipes move
 * between pictures; thumbnails jump straight to one.
 */
export default function GalleryLightbox({ images, open, onClose }) {
  const dialogRef = useRef(null);
  const touchX = useRef(null);
  const [index, setIndex] = useState(0);
  const count = images.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) {
      setIndex(0);
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClose = () => {
      document.body.style.overflow = "";
      onClose();
    };
    dialog?.addEventListener("close", handleClose);
    return () => dialog?.removeEventListener("close", handleClose);
  }, [onClose]);

  const go = (step) => setIndex((i) => (i + step + count) % count);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };

  const current = images[index];

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Photo gallery"
      onKeyDown={onKeyDown}
      onClick={(event) => {
        // A click on the dark backdrop (not on a picture or control) closes it.
        if (event.target === event.currentTarget || event.target.classList.contains("lightbox__stage")) {
          dialogRef.current.close();
        }
      }}
    >
      {current && (
        <div className="lightbox__inner">
          <div className="lightbox__bar">
            <p className="lightbox__count" aria-live="polite">
              {index + 1} / {count}
            </p>
            <button type="button" className="lightbox__close" onClick={() => dialogRef.current.close()} autoFocus>
              Close <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div
            className="lightbox__stage"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            {count > 1 && (
              <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous photo">
                <span aria-hidden="true">&larr;</span>
              </button>
            )}

            <figure className="lightbox__figure" key={current.src}>
              <LightboxImage image={current} />
              <figcaption className="sr-only">{current.alt}</figcaption>
            </figure>

            {count > 1 && (
              <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next photo">
                <span aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>

          {count > 1 && (
            <ul className="lightbox__thumbs">
              {images.map((image, i) => (
                <li key={image.src}>
                  <button
                    type="button"
                    className={`lightbox__thumb ${i === index ? "is-active" : ""}`}
                    onClick={() => setIndex(i)}
                    aria-label={`Show photo ${i + 1} of ${count}`}
                    aria-current={i === index ? "true" : undefined}
                  >
                    <img src={`${image.webp}-640.webp`} alt="" loading="lazy" decoding="async" style={{ objectPosition: image.position }} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </dialog>
  );
}

/** The full picture at its own proportions; `lightbox.zoom` trims Instagram badges. */
function LightboxImage({ image }) {
  const crop = image.lightbox || {};
  return (
    <div className="lightbox__frame">
      <picture>
        <source type="image/webp" srcSet={`${image.webp}-1170.webp`} />
        <img
          src={image.src}
          alt={image.alt}
          width={image.w}
          height={image.h}
          decoding="async"
          style={{ transform: `scale(${crop.zoom || 1})`, transformOrigin: crop.origin || "50% 50%" }}
        />
      </picture>
    </div>
  );
}
