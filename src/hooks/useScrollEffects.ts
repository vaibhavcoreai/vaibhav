import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * useScrollEffects — Single hook that handles ALL scroll effects:
 * - Lenis smooth scroll
 * - data-scroll="fade-up" (text reveal with stagger)
 * - data-scroll="scale-in" (card bounce-in)
 * - data-glow="entry" (electric blue glow flash)
 *
 * Scans the DOM after React finishes rendering.
 * Re-initializes cleanly on StrictMode double-mount.
 */
export function useScrollEffects() {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    // Respect prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Show everything immediately
      document.querySelectorAll<HTMLElement>('[data-scroll="fade-up"] > *').forEach(el => {
        el.classList.add('revealed');
      });
      document.querySelectorAll<HTMLElement>('[data-scroll="scale-in"]').forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }

    // ── Lenis smooth scroll ────────────────────────────────────
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    let lenis: Lenis | null = null;
    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);
    }

    // ── fade-up observer ───────────────────────────────────────
    const fadeUpObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const container = entry.target as HTMLElement;
          const children = Array.from(container.children) as HTMLElement[];
          children.forEach((child, i) => {
            setTimeout(() => {
              child.classList.add('revealed');
              setTimeout(() => { child.style.willChange = 'auto'; }, 800);
            }, i * 80); // 80ms stagger
          });
          fadeUpObserver.unobserve(container);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    // ── scale-in observer ──────────────────────────────────────
    let cardBatch: HTMLElement[] = [];
    let cardTimer: ReturnType<typeof setTimeout> | null = null;

    function flushCards() {
      const batch = [...cardBatch];
      cardBatch = [];
      batch.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('revealed');
          setTimeout(() => { card.style.willChange = 'auto'; }, 800);
        }, i * 100); // 100ms stagger
      });
    }

    const scaleInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          cardBatch.push(entry.target as HTMLElement);
          scaleInObserver.unobserve(entry.target);
          if (cardTimer) clearTimeout(cardTimer);
          cardTimer = setTimeout(flushCards, 16);
        });
      },
      { threshold: 0.3 }
    );

    // ── glow observer ──────────────────────────────────────────
    const glowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add('glow-active');
          requestAnimationFrame(() => {
            setTimeout(() => el.classList.add('glow-fade'), 80);
          });
          glowObserver.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );

    // ── Scan DOM (small delay so React finishes rendering) ─────
    const scanTimer = setTimeout(() => {
      document.querySelectorAll('[data-scroll="fade-up"]').forEach(el => fadeUpObserver.observe(el));
      document.querySelectorAll('[data-scroll="scale-in"]').forEach(el => scaleInObserver.observe(el));
      document.querySelectorAll('[data-glow="entry"]').forEach(el => glowObserver.observe(el));
    }, 50);

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      clearTimeout(scanTimer);
      if (cardTimer) clearTimeout(cardTimer);
      cancelAnimationFrame(rafRef.current);
      if (lenis) {
        lenis.destroy();
      }
      lenisRef.current = null;
      fadeUpObserver.disconnect();
      scaleInObserver.disconnect();
      glowObserver.disconnect();
    };
  }, [location]);
}
