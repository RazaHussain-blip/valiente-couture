import { story } from "../data/content";
import Photo from "./Photo";
import { FabricLabel } from "./decor/Textiles";

export default function StorySection() {
  return (
    <section id="story" className="story" aria-labelledby="story-title">
      <div className="story-label" aria-hidden="true">
        {story.label}
      </div>

      <div className="container-x">
        <div className="story-grid">
          {/* Asymmetric, layered image composition */}
          <div className="story-media" data-reveal>
            <div className="story-media__main">
              <Photo image={story.mainImage} className="aspect-4/5" sizes="(min-width: 1024px) 34vw, 85vw" />
            </div>
            <div className="story-media__detail">
              <Photo image={story.detailImage} className="aspect-square" compact sizes="(min-width: 1024px) 18vw, 45vw" />
            </div>
            <div className="story-media__origins">
              <span>{story.originsLabel}</span>
              {story.fabricOrigins.join(" · ")}
            </div>
          </div>

          {/* The journey */}
          <div className="story-copy">
            <div data-reveal>
              <FabricLabel>{story.eyebrow}</FabricLabel>
            </div>
            <h2 id="story-title" className="display-heading" data-reveal>
              {story.title.join(" ")}
            </h2>
            <p className="story-lead" data-reveal>
              {story.lead}
            </p>

            <ol className="story-journey">
              {story.chapters.map((chapter) => (
                <li key={chapter.numeral} className="story-chapter" data-reveal>
                  <span className="story-chapter__marker" aria-hidden="true">
                    {chapter.numeral}
                  </span>
                  <div className="story-chapter__body">
                    {chapter.kicker && <p className="story-chapter__kicker">{chapter.kicker}</p>}
                    <h3>{chapter.title}</h3>
                    <p>{chapter.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Oversized quotation and signature */}
        <figure className="story-quote" data-reveal>
          <span className="story-quote__mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote>
            <p>{story.quote}</p>
          </blockquote>
          <figcaption>
            <span className="signature">{story.signature}</span>
            <span className="signature-role">{story.signatureRole}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
