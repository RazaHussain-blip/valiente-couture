import { hero } from "../data/content";
import { images } from "../data/images";
import HeroSlider from "./HeroSlider";
import MainNavigation from "./MainNavigation";

export default function HeroSection() {
  return (
    <section id="home" className="hero" aria-label="Welcome">
      <MainNavigation />

      <div className="hero-layout">
        <div className="hero-composition">
          <HeroSlider slides={images.heroSlides} />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow__rule" aria-hidden="true" />
            {hero.eyebrow}
            <span className="hero-eyebrow__rule" aria-hidden="true" />
          </p>

          <h1 className="hero-title">
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]} <em>{hero.titleLines[2]}</em>
          </h1>

          <p className="hero-text">{hero.text}</p>

          <a href={hero.cta.href} className="btn btn--outline hero-cta">
            {hero.cta.label}
            <span className="hero-cta__arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
