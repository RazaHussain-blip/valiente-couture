import { useCallback, useState } from "react";
import { useReveal } from "./hooks/useReveal";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import ProcessSection from "./components/ProcessSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import IntroDoors from "./components/IntroDoors";

function App() {
  useReveal();
  // "closed" -> "opening" (doors parting) -> "done" (overlay removed)
  const [intro, setIntro] = useState("closed");
  const openIntro = useCallback(() => setIntro("opening"), []);
  const finishIntro = useCallback(() => setIntro("done"), []);
  const introActive = intro !== "done";

  return (
    <>
      <div className={`site-stage site-stage--${intro}`} inert={introActive || undefined}>
        <a href="#story" className="skip-link">
          Skip to content
        </a>
        <main>
          <HeroSection />
          <StorySection />
          <ProcessSection />
          <PortfolioSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      {introActive && <IntroDoors phase={intro} onOpen={openIntro} onDone={finishIntro} />}
    </>
  );
}

export default App;
