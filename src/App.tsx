import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import StickyReveal from './components/StickyReveal';
import ShrinkBox from './components/ShrinkBox';
import ParallaxShowcase from './components/ParallaxShowcase';
import NavBar from './components/NavBar';
import { useScrollEffects } from './hooks/useScrollEffects';

export default function App() {
  // Lenis smooth scroll + all IntersectionObserver-driven effects
  useScrollEffects();

  return (
    <main className="font-sans min-h-screen selection:bg-black/20">
      <CustomCursor />
      <NavBar />
      <div className="bg-[#0e0e0e] text-[#ededed]">
        <Hero />
      </div>
      <Projects />
      <ShrinkBox />
      <StickyReveal />
      <ParallaxShowcase />
      <div className="bg-[#f8f9fa] text-[#0e0e0e]">
        <Footer />
      </div>
    </main>
  );
}
