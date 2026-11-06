import { brand, contact, invitation } from "../data/content";
import Photo from "./Photo";
import TestimonialsSection from "./TestimonialsSection";
import { FabricLabel, Swatch, TapeStrip } from "./decor/Textiles";
import { SilkDrape, Tweed } from "./decor/FabricPieces";
import SvgAsset from "./decor/SvgAsset";

export default function ContactSection() {
  return (
    <section id="contact" className="contact" aria-labelledby="invite-title">
      <TestimonialsSection />

      <div className="invite tex-folds">
        <div className="section-pieces" aria-hidden="true">
          <SilkDrape tone="blush" className="piece piece--invite-drape" />
          <Tweed tone="rose" className="piece piece--invite-tweed" />
        </div>

        <div className="container-x">
          <div className="invite-frame" data-reveal>
            <div className="invite-copy">
              <FabricLabel>{invitation.eyebrow}</FabricLabel>
              <h2 id="invite-title" className="display-heading">
                {invitation.title[0]}
                <br />
                <em>{invitation.title[1]}</em>
              </h2>
              <p className="invite-text">{invitation.text}</p>

              <dl className="invite-details">
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Instagram</dt>
                  <dd>
                    <a href={contact.instagram} target="_blank" rel="noreferrer">
                      {contact.instagramHandle}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Follow</dt>
                  <dd>
                    <a href={contact.facebook} target="_blank" rel="noreferrer">
                      Facebook
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>{brand.location}</dd>
                </div>
                {contact.phone && (
                  <div>
                    <dt>Telephone</dt>
                    <dd>
                      <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="invite-media">
              <Swatch kind="tweed" className="invite-media__swatch" />
              <figure className="pinned-photo invite-media__photo">
                <TapeStrip className="pinned-photo__tape" />
                <Photo image={invitation.image} className="aspect-4/5" sizes="(min-width: 1024px) 18rem, 70vw" />
                <figcaption>{brand.designer}</figcaption>
              </figure>
              <span className="invite-media__buttons" aria-hidden="true">
                <SvgAsset name="shirtButton" className="deco-button deco-button--lg" />
                <SvgAsset name="shirtButton" className="deco-button" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
