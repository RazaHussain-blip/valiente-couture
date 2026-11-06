import { story } from "../data/content";
import Photo from "./Photo";
import { SilkDrape, Spool, Tweed } from "./decor/FabricPieces";
import { FabricLabel, TapeStrip } from "./decor/Textiles";
import SvgAsset from "./decor/SvgAsset";

export default function StorySection() {
  return (
    <section id="story" className="story tex-woven" aria-labelledby="story-title">
      <div className="section-pieces" aria-hidden="true">
        <SilkDrape tone="blush" className="piece piece--story-drape" />
        <Tweed tone="rose" className="piece piece--story-tweed" />
        <Tweed tone="ivory" className="piece piece--story-tweed2" />
      </div>

      <div className="story-label" aria-hidden="true">
        {story.label}
      </div>

      <div className="container-x">
        <div className="story-grid">
          {/* Asymmetric, layered image composition */}
          <div className="story-media" data-reveal>
            <div className="story-drape" aria-hidden="true" />
            <div className="story-media__main">
              <Photo image={story.mainImage} className="aspect-4/5" sizes="(min-width: 1024px) 34vw, 85vw" />
              <TapeStrip className="story-media__tape" />
            </div>
            <div className="story-media__detail">
              <Photo image={story.detailImage} className="aspect-square" compact sizes="(min-width: 1024px) 18vw, 45vw" />
            </div>
            <div className="story-media__footer">
              <div className="story-media__origins">
                <span>{story.originsLabel}</span>
                {story.fabricOrigins.join(" · ")}
              </div>
              <SvgAsset name="sewingMachine" className="story-machine" />
            </div>
          </div>

          {/* The journey */}
          <div className="story-copy">
            <div data-reveal>
              <FabricLabel>{story.eyebrow}</FabricLabel>
            </div>
            <h2 id="story-title" className="display-heading" data-reveal>
              {story.title[0]}
              <br />
              <em>{story.title[1]}</em>
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
          <svg className="thread-flourish" viewBox="0 0 420 40" aria-hidden="true" focusable="false">
            <path
              className="thread-draw"
              pathLength="1"
              d="M4 26 C 70 6, 120 38, 190 22 S 300 4, 340 22 C 360 31, 384 30, 416 14"
            />
          </svg>
          <figcaption>
            <span className="story-quote__buttons" aria-hidden="true">
              <SvgAsset name="shirtButton" className="deco-button" />
              <SvgAsset name="shirtButton" className="deco-button" />
            </span>
            <span className="signature">{story.signature}</span>
            <span className="signature-role">{story.signatureRole}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
