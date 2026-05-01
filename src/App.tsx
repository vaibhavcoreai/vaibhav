import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import PageTransition from './components/PageTransition';
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
const SelectedWork = lazy(() => import('./components/SelectedWork'));
const WorkDetail = lazy(() => import('./components/WorkDetail'));

import { useScrollEffects } from './hooks/useScrollEffects';
import { Analytics } from '@vercel/analytics/react';
import ReactGA from 'react-ga4';
import { SpeedInsights } from "@vercel/speed-insights/react";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Lenis smooth scroll + all IntersectionObserver-driven effects
  useScrollEffects();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock scroll during loading
  useEffect(() => {
    // Initialize GA4 - Replace with your Measurement ID
    ReactGA.initialize('G-W1N52VDY7H');
    // Send initial pageview
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    if (isLoading) {
      document.body.classList.add('is-loading');
    } else {
      document.body.classList.remove('is-loading');
    }
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="font-sans min-h-screen selection:bg-black/20">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <NavBar />
      
      <Suspense fallback={<div className="h-screen bg-[#0e0e0e]" />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <div className="bg-[#0e0e0e] text-[#ededed]">
                  <Hero shouldAnimate={!isLoading} />
                  <Projects />
                  <ShrinkBox />
                  <StickyReveal />
                  <ParallaxShowcase />
                  <div className="bg-[#f8f9fa] text-[#0e0e0e]">
                    <Footer />
                  </div>
                </div>
              </PageTransition>
            } />
            <Route path="/selected-work" element={
              <PageTransition>
                <SelectedWork />
              </PageTransition>
            } />
            <Route path="/selected-work/:id" element={
              <PageTransition>
                <WorkDetail />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </Suspense>

      <Analytics />
      <SpeedInsights />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
