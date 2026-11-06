import { sections } from "./data/content";
import { useActiveSection } from "./hooks/useActiveSection";
import { useHeroPassed } from "./hooks/useHeroPassed";
import { useReveal } from "./hooks/useReveal";
import HeroSection from "./components/HeroSection";
import SectionNavigator from "./components/SectionNavigator";
import StorySection from "./components/StorySection";
import ProcessSection from "./components/ProcessSection";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FabricBackdrop from "./components/decor/FabricBackdrop";
import { FabricDefs } from "./components/decor/FabricPieces";

const sectionIds = sections.map((section) => section.id);

function App() {
  const activeId = useActiveSection(sectionIds);
  const heroPassed = useHeroPassed();
  useReveal();

  return (
    <>
      <FabricBackdrop />
      <FabricDefs />
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
      <SectionNavigator heroPassed={heroPassed} activeId={activeId} />
    </>
  );
}

export default App;
