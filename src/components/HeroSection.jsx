import { hero } from "../data/content";
import { images } from "../data/images";
import HeroSlider from "./HeroSlider";
import MainNavigation from "./MainNavigation";
import { CoutureButton } from "./decor/Textiles";
import { SilkDrape, Spool, Tweed } from "./decor/FabricPieces";

export default function HeroSection() {
  return (
    <section id="home" className="hero" aria-label="Welcome">
      {/* Fabric pieces laid around the composition */}
      <div className="hero-pieces" aria-hidden="true">
        <SilkDrape tone="blush" className="hero-piece hero-piece--drape" />
        <Tweed tone="rose" className="hero-piece hero-piece--tweed-tl" />
        <Tweed tone="ivory" className="hero-piece hero-piece--tweed-tl2" />
        <CoutureButton size="3.4rem" className="hero-piece hero-piece--btn1" />
        <CoutureButton size="2.2rem" className="hero-piece hero-piece--btn2" />
        <Spool className="hero-piece hero-piece--spool" />
        <Tweed tone="rose" className="hero-piece hero-piece--tweed-br" />
        <CoutureButton size="2rem" className="hero-piece hero-piece--btn3" />
      </div>

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

      <a href="#story" className="hero-scroll">
        <span className="hero-scroll__mouse" aria-hidden="true">
          <span />
        </span>
        <span className="hero-scroll__text">Scroll to explore</span>
      </a>
    </section>
  );
}
