import { brand, contact, invitation } from "../data/content";
import Photo from "./Photo";
import TestimonialsSection from "./TestimonialsSection";
import { FabricLabel } from "./decor/Textiles";

export default function ContactSection() {
  return (
    <section id="contact" className="contact" aria-labelledby="invite-title">
      <TestimonialsSection />

      <div className="invite">

        <div className="container-x">
          <div className="invite-frame" data-reveal>
            <div className="invite-copy">
              <FabricLabel>{invitation.eyebrow}</FabricLabel>
              <h2 id="invite-title" className="display-heading">
                {invitation.title.join(" ")}
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
              <figure className="pinned-photo invite-media__photo">
                <Photo image={invitation.image} className="aspect-4/5" sizes="(min-width: 1024px) 18rem, 70vw" />
                <figcaption>{brand.designer}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
