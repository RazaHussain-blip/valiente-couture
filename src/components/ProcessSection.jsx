import { useId, useRef } from "react";
import { craftsmanship, processSteps } from "../data/content";
import { useThreadPath } from "../hooks/useThreadPath";
import Photo from "./Photo";
import { SilkDrape, Tweed } from "./decor/FabricPieces";
import CoCreationSection from "./CoCreationSection";
import { FabricLabel, Swatch, SwatchFan, TapeStrip } from "./decor/Textiles";
import SvgAsset from "./decor/SvgAsset";

export default function ProcessSection() {
  const stepsRef = useRef(null);
  const maskId = `thread-mask-${useId().replace(/:/g, "")}`;
  const thread = useThreadPath(stepsRef, ".journey-step__badge");

  return (
    <section id="process" className="process" aria-labelledby="process-title">
      <div className="journey tex-blush">
        <div className="section-pieces" aria-hidden="true">
          <Tweed tone="ivory" className="piece piece--journey-tweed" />
          <SilkDrape tone="ivory" className="piece piece--journey-drape" />
        </div>
        <div className="container-x">
          <header className="section-intro" data-reveal>
            <FabricLabel>{craftsmanship.label}</FabricLabel>
            <h2 id="process-title" className="display-heading">
              {craftsmanship.title[0]}
              <br />
              <em>{craftsmanship.title[1]}</em>
            </h2>
          </header>

          <div className="journey-steps" ref={stepsRef}>
            {thread.d && (
              <svg
                className="journey-thread"
                width={thread.width}
                height={thread.height}
                viewBox={`0 0 ${thread.width} ${thread.height}`}
                aria-hidden="true"
                focusable="false"
                style={{ "--thread-progress": thread.progress }}
              >
                <defs>
                  <mask id={maskId} maskUnits="userSpaceOnUse">
                    <path className="journey-thread__reveal" d={thread.d} pathLength="1" />
                  </mask>
                </defs>
                <path className="journey-thread__guide" d={thread.d} />
                <path className="journey-thread__stitch" d={thread.d} mask={`url(#${maskId})`} />
              </svg>
            )}

            {thread.start && (
              <SvgAsset
                name="spool"
                className="journey-spool"
                style={{ left: thread.start.x, top: thread.start.y }}
              />
            )}

            <ol className="journey-list">
              {processSteps.map((step, index) => (
                <li
                  key={step.number}
                  className={`journey-step ${index % 2 ? "journey-step--right" : "journey-step--left"}`}
                  data-reveal
                >
                  <div className="journey-step__badge" aria-hidden="true">
                    <span>{step.number}</span>
                  </div>

                  <div className="journey-step__text">
                    {step.label && <p className="journey-step__label">{step.label}</p>}
                    <h3>
                      <span className="sr-only">Step {step.number}: </span>
                      {step.title}
                    </h3>
                    <p>{step.text}</p>
                  </div>

                  <div className="journey-step__visual">
                    <StepVisual visual={step.visual} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <CoCreationSection />
    </section>
  );
}

function StepVisual({ visual }) {
  if (visual.type === "photo") {
    return (
      <figure className="pinned-photo">
        <TapeStrip className="pinned-photo__tape" />
        <Photo image={visual.image} className="aspect-4/5" compact sizes="16rem" />
        <figcaption>{visual.caption}</figcaption>
      </figure>
    );
  }

  if (visual.type === "buttons") {
    return (
      <div className="step-ornament step-ornament--fit">
        <Swatch kind="silk" className="step-ornament__swatch" />
        <SvgAsset name="measuringTape" className="step-ornament__tape" />
        <span className="step-ornament__buttons">
          <SvgAsset name="shirtButton" className="deco-button" />
          <SvgAsset name="shirtButton" className="deco-button deco-button--lg" />
          <SvgAsset name="shirtButton" className="deco-button" />
        </span>
        <span className="step-ornament__caption">{visual.caption}</span>
      </div>
    );
  }

  return (
    <div className="step-ornament">
      <SwatchFan />
      <span className="step-ornament__caption">{visual.caption}</span>
    </div>
  );
}
