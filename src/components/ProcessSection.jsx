import { craftsmanship, processSteps } from "../data/content";
import Photo from "./Photo";
import CoCreationSection from "./CoCreationSection";
import { FabricLabel } from "./decor/Textiles";

/** "A timeless personal style": the four steps laid side by side as cards. */
export default function ProcessSection() {
  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <div className="journey">
        <div className="container-x">
          <header className="section-intro" data-reveal>
            <FabricLabel>{craftsmanship.label}</FabricLabel>
            <h2 id="process-title" className="display-heading">
              {craftsmanship.title[0]}
              <br />
              <em>{craftsmanship.title[1]}</em>
            </h2>
          </header>

          <ul className="journey-list">
            {processSteps.map((step) => (
              <li key={step.number} className="journey-card" data-reveal>
                <Photo
                  image={step.image}
                  className="journey-card__photo"
                  compact
                  sizes="(min-width: 1200px) 18rem, (min-width: 640px) 45vw, 92vw"
                />
                <div className="journey-card__body">
                  <p className="journey-card__label">{step.caption}</p>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
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
