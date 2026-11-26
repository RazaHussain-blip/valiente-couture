import { contact, creations, portfolio } from "../data/content";
import Photo from "./Photo";
import { FabricLabel } from "./decor/Textiles";

/**
 * Her portfolio: introduction across the top, then an even gallery
 * (desktop: three portrait photos, then two landscape photos).
 */
export default function PortfolioSection() {
  return (
    <section id="creations" className="creations" aria-labelledby="creations-title">
      <div className="container-x">
        <header className="gallery-intro" data-reveal>
          <div className="gallery-intro__head">
            <FabricLabel>{creations.label}</FabricLabel>
            <h2 id="creations-title" className="display-heading">
              {creations.title.join(" ")}
            </h2>
          </div>
          <div className="gallery-intro__body">
            <p>{creations.text}</p>
            <ul className="garment-labels" aria-label="Garments">
              {creations.garments.map((g) => (
                <li key={g} className="garment-label">
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="gallery">
          {portfolio.map((item, i) => (
            <GalleryItem key={item.title} item={item} index={i} />
          ))}
        </div>

        <div className="gallery-instagram" data-reveal>
          <a href={contact.instagram} target="_blank" rel="noreferrer" className="text-link">
            Follow {contact.instagramHandle} on Instagram
            <span aria-hidden="true"> &rarr;</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ item, index }) {
  return (
    <figure className="gallery-item" data-reveal>
      <div className="gallery-item__frame">
        <Photo image={item.image} className="gallery-item__photo" sizes="(min-width: 1024px) 40vw, (min-width: 640px) 46vw, 92vw" />
      </div>
      <figcaption className="gallery-item__caption">
        <span className="gallery-item__no">No. {String(index + 1).padStart(2, "0")}</span>
        <span className="gallery-item__title">{item.title}</span>
        {item.caption && <span className="gallery-item__text">{item.caption}</span>}
      </figcaption>
    </figure>
  );
}
