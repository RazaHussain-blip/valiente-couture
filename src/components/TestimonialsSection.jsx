import { testimonials } from "../data/content";
import { FabricLabel, TapeStrip } from "./decor/Textiles";
import { SilkDrape, Tweed } from "./decor/FabricPieces";
import SvgAsset from "./decor/SvgAsset";

/**
 * Client testimonials, presented as personal notes pinned to the fabric.
 * The longest letter is featured; the others sit beside it at their
 * natural heights.
 */
export default function TestimonialsSection() {
  if (testimonials.length === 0) return null;
  const [featured, ...others] = testimonials;

  return (
    <div className="notes tex-blush">
      <div className="section-pieces" aria-hidden="true">
        <Tweed tone="ivory" className="piece piece--notes-tweed" />
        <SilkDrape tone="ivory" className="piece piece--notes-drape" />
      </div>

      <div className="container-x">
        <header className="notes-head" data-reveal>
          <FabricLabel>Valiente Couture</FabricLabel>
          <h2 id="testimonials-title" className="display-heading">
            <em>Testimonials</em>
          </h2>
        </header>

        <div className="notes-grid" aria-labelledby="testimonials-title" role="group">
          <Note item={featured} featured />
          {others.length > 0 && (
            <div className="notes-stack">
              {others.map((item) => (
                <Note key={item.name} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Note({ item, featured = false }) {
  return (
    <figure className={`note ${featured ? "note--featured" : ""}`} data-reveal>
      <TapeStrip className="note__tape" />
      <span className="note__mark" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote>
        <p>{item.quote}</p>
      </blockquote>
      <figcaption className="note__author">
        <SvgAsset name="shirtButton" className="note__button" />
        <span className="note__who">
          <span className="woven-name">{item.name}</span>
          {item.detail && <span className="note__detail">{item.detail}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
