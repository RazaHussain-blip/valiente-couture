import { useReveal } from "./hooks/useReveal";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import ProcessSection from "./components/ProcessSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  useReveal();

  return (
    <>
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
    </>
  );
}

export default App;
