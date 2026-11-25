import { craftsmanship, processSteps } from "../data/content";
import Photo from "./Photo";
import CoCreationSection from "./CoCreationSection";
import { FabricLabel } from "./decor/Textiles";

/** "A timeless personal style": alternating rows of text and photo. */
export default function ProcessSection() {
  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <div className="journey">
        <div className="container-x">
          <header className="section-intro" data-reveal>
            <FabricLabel>{craftsmanship.label}</FabricLabel>
            <h2 id="process-title" className="display-heading">
              {craftsmanship.title.join(" ")}
            </h2>
          </header>

          <ul className="journey-list">
            {processSteps.map((step) => (
              <li key={step.number} className="journey-card" data-reveal>
                <div className="journey-card__body">
                  <p className="journey-card__label">{step.caption}</p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <div className="journey-card__media">
                  <Photo
                    image={step.image}
                    className="journey-card__photo"
                    compact
                    sizes="(min-width: 900px) 40vw, 92vw"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CoCreationSection />
    </section>
  );
}
