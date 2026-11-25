import { useState } from "react";
import { coCreation } from "../data/content";
import Photo from "./Photo";
import GalleryLightbox from "./GalleryLightbox";
import { FabricLabel } from "./decor/Textiles";

/**
 * The Process: the client's co-creation paragraph [P7].
 * Each photo opens a pop-up gallery of the pictures related to it.
 */
export default function CoCreationSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="cocreation">
      <div className="container-x">
        <div className="cocreation-grid">
          <header className="cocreation-copy" data-reveal>
            <FabricLabel>{coCreation.label}</FabricLabel>
            <h2 id="cocreation-title" className="display-heading">
              {coCreation.title.join(" ")}
            </h2>
            {coCreation.paragraphs.map((p) => (
              <p key={p} className="cocreation-text">
                {p}
              </p>
            ))}
          </header>

          <div className="cocreation-photos" data-reveal>
            {coCreation.galleries.map((gallery, i) => {
              const [cover] = gallery;
              return (
                <button
                  key={cover.src}
                  type="button"
                  className={`cocreation-photo cocreation-photo--${i + 1}`}
                  onClick={() => setOpenIndex(i)}
                  aria-haspopup="dialog"
                  aria-label={`Open gallery, ${gallery.length} photos: ${cover.alt}`}
                >
                  <Photo image={cover} className="aspect-3/4" compact sizes="(min-width: 1024px) 20vw, 45vw" />
                  <span className="cocreation-photo__hint" aria-hidden="true">
                    View gallery <span>{gallery.length}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <GalleryLightbox
        images={openIndex === null ? [] : coCreation.galleries[openIndex]}
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
}
