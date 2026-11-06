import { contact, creations, portfolio } from "../data/content";
import Photo from "./Photo";
import { SilkDrape, Tweed } from "./decor/FabricPieces";
import SvgAsset from "./decor/SvgAsset";
import { FabricLabel } from "./decor/Textiles";

export default function PortfolioSection() {
  const [first, ...rest] = portfolio;

  return (
    <section id="creations" className="creations tex-paper" aria-labelledby="creations-title">
      <div className="section-pieces" aria-hidden="true">
        <SilkDrape tone="blush" className="piece piece--gallery-drape" />
        <Tweed tone="rose" className="piece piece--gallery-tweed" />
      </div>
      <div className="container-x">
        <div className="gallery">
          <GalleryItem item={first} index={0} />

          <header className="gallery-intro" data-reveal>
            <SvgAsset name="mannequin" className="gallery-mannequin" />
            <FabricLabel>{creations.label}</FabricLabel>
            <h2 id="creations-title" className="display-heading">
              {creations.title[0]} <em>{creations.title[1]}</em>
            </h2>
            <p>{creations.text}</p>
            <ul className="garment-labels" aria-label="Garments">
              {creations.garments.map((g) => (
                <li key={g} className="garment-label">{g}</li>
              ))}
            </ul>
          </header>

          {rest.map((item, i) => (
            <GalleryItem key={item.title} item={item} index={i + 1} />
          ))}

          <div className="gallery-instagram" data-reveal>
            <a href={contact.instagram} target="_blank" rel="noreferrer" className="text-link">
              Follow {contact.instagramHandle} on Instagram
              <span aria-hidden="true"> &rarr;</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ item, index }) {
  return (
    <figure className={`gallery-item gallery-item--${item.layout}`} data-reveal>
      <div className="gallery-item__frame">
        <Photo image={item.image} className="gallery-item__photo" sizes={item.layout === "a" || item.layout === "e" ? "(min-width: 1024px) 55vw, 92vw" : "(min-width: 1024px) 32vw, 92vw"} />
      </div>
      <figcaption className="gallery-item__caption">
        <span className="gallery-item__no">
          <SvgAsset name="shirtButton" className="gallery-item__button" />
          No. {String(index + 1).padStart(2, "0")}
        </span>
        <span className="gallery-item__title">{item.title}</span>
        {item.caption && <span className="gallery-item__text">{item.caption}</span>}
      </figcaption>
    </figure>
  );
}
