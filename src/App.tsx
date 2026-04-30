import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import NavBar from './components/NavBar';
import LoadingScreen from './components/LoadingScreen';

// Lazy load below-the-fold components
const Projects = lazy(() => import('./components/Projects'));
const ShrinkBox = lazy(() => import('./components/ShrinkBox'));
const StickyReveal = lazy(() => import('./components/StickyReveal'));
const ParallaxShowcase = lazy(() => import('./components/ParallaxShowcase'));
const Footer = lazy(() => import('./components/Footer'));
import { useScrollEffects } from './hooks/useScrollEffects';
import { Analytics } from '@vercel/analytics/react';
import ReactGA from 'react-ga4';
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Lenis smooth scroll + all IntersectionObserver-driven effects
  useScrollEffects();

  // Lock scroll during loading
  useEffect(() => {
    // Initialize GA4 - Replace with your Measurement ID
    ReactGA.initialize('G-W1N52VDY7H');
    // Send initial pageview
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    document.body.classList.add('is-loading');
    return () => document.body.classList.remove('is-loading');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    document.body.classList.remove('is-loading');
    setIsLoading(false);
  }, []);

  return (
    <main className="font-sans min-h-screen selection:bg-black/20">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <NavBar />
      <div className="bg-[#0e0e0e] text-[#ededed]">
        <Hero shouldAnimate={!isLoading} />
      </div>
      <Suspense fallback={<div className="h-20" />}>
        <Projects />
        <ShrinkBox />
        <StickyReveal />
        <ParallaxShowcase />
        <div className="bg-[#f8f9fa] text-[#0e0e0e]">
          <Footer />
        </div>
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
