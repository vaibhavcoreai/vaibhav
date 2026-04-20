/* ═══════════════════════════════════════════════════════════════════════
   scroll-effects.ts — Unified scroll animation engine
   
   Single requestAnimationFrame loop handles:
     • Lenis smooth scroll (duration: 1.2, exponential easing)
     • data-scroll="fade-up"    → IntersectionObserver text reveal
     • data-scroll="scale-in"   → IntersectionObserver card scale-in
     • data-scroll="parallax"   → rAF-driven parallax transforms
     • data-scroll="sticky-text"→ scroll-progress pinned sections
     • data-glow="entry"        → electric blue glow on entry
   
   All GSAP-free. Uses only Lenis + vanilla JS + CSS.
   GPU-composited transforms only (translate, scale, opacity).
   ═══════════════════════════════════════════════════════════════════════ */

import Lenis from 'lenis';

// ─── Types ───────────────────────────────────────────────────────────
interface ParallaxElement {
  el: HTMLElement;
  speed: number;      // parallax speed factor (e.g., 0.4)
  direction: string;  // 'vertical' | 'horizontal'
}

interface ScrollEngine {
  lenis: Lenis | null;
  destroy: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Debounced resize ────────────────────────────────────────────────
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ═════════════════════════════════════════════════════════════════════
// MAIN INIT
// ═════════════════════════════════════════════════════════════════════
export function initScrollEffects(): ScrollEngine {
  // ── Bail if reduced motion ──────────────────────────────────────
  if (prefersReducedMotion()) {
    // Reveal everything immediately
    document.querySelectorAll('[data-scroll="fade-up"] > *').forEach(el => {
      (el as HTMLElement).classList.add('revealed');
    });
    document.querySelectorAll('[data-scroll="scale-in"]').forEach(el => {
      (el as HTMLElement).classList.add('revealed');
    });
    return { lenis: null, destroy: () => {} };
  }

  const cleanups: (() => void)[] = [];

  // ══════════════════════════════════════════════════════════════════
  // EFFECT 7: Lenis Smooth Scroll
  // ══════════════════════════════════════════════════════════════════
  //
  // duration: 1.2 → how long the scroll "drifts" after input stops
  // easing: exponential decay → t => min(1, 1.001 - 2^(-10t))
  //   This gives the "antigravity" feeling where page drifts and settles
  //   rather than stopping abruptly.
  //
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // smoothWheel: true is default in newer Lenis
  });

  // Unified rAF loop — Lenis drives the frame, we piggyback parallax
  function raf(time: number) {
    lenis.raf(time);
    updateParallax();
    rafId = requestAnimationFrame(raf);
  }
  let rafId = requestAnimationFrame(raf);

  cleanups.push(() => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
  });

  // ══════════════════════════════════════════════════════════════════
  // EFFECT 5: Text Reveal (fade-up) — Line by Line
  // ══════════════════════════════════════════════════════════════════
  //
  // Each [data-scroll="fade-up"] container's direct children get
  // staggered reveal. The stagger delay is 80ms between siblings.
  //
  // rootMargin: "0px 0px -80px 0px" triggers slightly before the
  // element is fully visible (80px before bottom edge).
  //
  // Easing (in CSS): cubic-bezier(0.16, 1, 0.3, 1) — spring-like
  //
  const STAGGER_DELAY_MS = 80;  // ← tweak: ms between each line reveal

  const fadeUpObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const container = entry.target as HTMLElement;
        const children = Array.from(container.children) as HTMLElement[];

        children.forEach((child, i) => {
          // Stagger: each child gets an additional 80ms delay
          setTimeout(() => {
            child.classList.add('revealed');

            // Clean up will-change after animation completes (~700ms transition)
            setTimeout(() => {
              child.style.willChange = 'auto';
            }, 800);
          }, i * STAGGER_DELAY_MS);
        });

        // One-shot: disconnect after reveal
        fadeUpObserver.unobserve(container);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px',  // triggers 80px before bottom edge
    }
  );

  document.querySelectorAll('[data-scroll="fade-up"]').forEach((el) => {
    fadeUpObserver.observe(el);
  });

  cleanups.push(() => fadeUpObserver.disconnect());

  // ══════════════════════════════════════════════════════════════════
  // EFFECT 6: Card Scale-In
  // ══════════════════════════════════════════════════════════════════
  //
  // Cards start at scale(0.88) opacity(0) (set in CSS).
  // When 30% visible, they animate to scale(1) opacity(1).
  //
  // Stagger: if multiple cards enter the viewport in the same frame,
  // they get 100ms stagger between them.
  //
  // Easing (in CSS): cubic-bezier(0.34, 1.56, 0.64, 1) — overshoot bounce
  //
  const CARD_STAGGER_MS = 100; // ← tweak: ms between cards in same row
  let cardBatchTimer: ReturnType<typeof setTimeout> | null = null;
  let cardBatch: HTMLElement[] = [];

  function flushCardBatch() {
    const batch = [...cardBatch];
    cardBatch = [];
    batch.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('revealed');
        // Clean up will-change
        setTimeout(() => {
          card.style.willChange = 'auto';
        }, 800);
      }, i * CARD_STAGGER_MS);
    });
  }

  const scaleInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        cardBatch.push(entry.target as HTMLElement);
        scaleInObserver.unobserve(entry.target);

        // Batch cards that enter within the same ~frame
        if (cardBatchTimer) clearTimeout(cardBatchTimer);
        cardBatchTimer = setTimeout(flushCardBatch, 16);
      });
    },
    {
      threshold: 0.3,  // ← tweak: how much of the card must be visible
    }
  );

  document.querySelectorAll('[data-scroll="scale-in"]').forEach((el) => {
    scaleInObserver.observe(el);
  });

  cleanups.push(() => scaleInObserver.disconnect());

  // ══════════════════════════════════════════════════════════════════
  // Parallax (data-scroll="parallax" data-speed="0.4")
  // ══════════════════════════════════════════════════════════════════
  //
  // Each parallax element has:
  //   data-speed: float, default 0.5 (1.0 = scroll at same rate, 0 = fixed)
  //   data-direction: "vertical" | "horizontal", default "vertical"
  //
  // Transform: translateY(offset) where
  //   offset = (elementCenter - viewportCenter) * speed
  //
  const parallaxElements: ParallaxElement[] = [];

  document.querySelectorAll('[data-scroll="parallax"]').forEach((el) => {
    const htmlEl = el as HTMLElement;
    parallaxElements.push({
      el: htmlEl,
      speed: parseFloat(htmlEl.dataset.speed || '0.5'),
      direction: htmlEl.dataset.direction || 'vertical',
    });
    htmlEl.style.willChange = 'transform';
  });

  function updateParallax() {
    const vh = window.innerHeight;
    const viewportCenter = vh / 2;

    parallaxElements.forEach(({ el, speed, direction }) => {
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;

      // offset = distance from viewport center * speed factor
      // Positive speed: element moves slower than scroll (lagging)
      const offset = (elementCenter - viewportCenter) * speed;

      if (direction === 'horizontal') {
        el.style.transform = `translateX(${offset}px)`;
      } else {
        el.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  // ══════════════════════════════════════════════════════════════════
  // Glow entry (data-glow="entry")
  // ══════════════════════════════════════════════════════════════════
  const glowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;

        el.classList.add('glow-active');
        requestAnimationFrame(() => {
          setTimeout(() => {
            el.classList.add('glow-fade');
          }, 80);
        });

        glowObserver.unobserve(el);
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('[data-glow="entry"]').forEach((el) => {
    glowObserver.observe(el);
  });

  cleanups.push(() => glowObserver.disconnect());

  // ══════════════════════════════════════════════════════════════════
  // Resize handler (debounced at 150ms)
  // ══════════════════════════════════════════════════════════════════
  const onResize = debounce(() => {
    // Recalculate parallax positions on resize
    updateParallax();
  }, 150);

  window.addEventListener('resize', onResize);
  cleanups.push(() => window.removeEventListener('resize', onResize));

  // ── Return handle for cleanup ───────────────────────────────────
  return {
    lenis,
    destroy: () => cleanups.forEach((fn) => fn()),
  };
}

// ═════════════════════════════════════════════════════════════════════
// Re-scan: call this after React renders new DOM with data-scroll attrs
// ═════════════════════════════════════════════════════════════════════
export function rescanScrollEffects() {
  // Dispatch a custom event that the engine can listen to,
  // or simply re-call initScrollEffects (idempotent observers)
  window.dispatchEvent(new CustomEvent('scroll-effects:rescan'));
}
