import { coCreation } from "../data/content";
import Photo from "./Photo";
import { FabricLabel } from "./decor/Textiles";
import { Tweed } from "./decor/FabricPieces";
import SvgAsset from "./decor/SvgAsset";

/** The Process: the client's co-creation paragraph [P7] with garments made for clients. */
export default function CoCreationSection() {
  return (
    <div className="cocreation tex-ivory">
      <div className="section-pieces" aria-hidden="true">
        <Tweed tone="rose" className="piece piece--services-tweed" />
        <Tweed tone="blush" className="piece piece--services-tweed2" />
        <SvgAsset name="shirtButton" className="piece piece--services-btn deco-button deco-button--lg" />
      </div>

      <div className="container-x">
        <div className="cocreation-grid">
          <header className="cocreation-copy" data-reveal>
            <FabricLabel>{coCreation.label}</FabricLabel>
            <h2 id="cocreation-title" className="display-heading">
              {coCreation.title[0]}
              <br />
              <em>{coCreation.title[1]}</em>
            </h2>
            {coCreation.paragraphs.map((p) => (
              <p key={p} className="cocreation-text">
                {p}
              </p>
            ))}
          </header>

          <div className="cocreation-photos" data-reveal>
            {coCreation.photos.map((image, i) => (
              <div key={image.src} className={`cocreation-photo cocreation-photo--${i + 1}`}>
                <Photo image={image} className="aspect-3/4" compact sizes="(min-width: 1024px) 20vw, 45vw" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
