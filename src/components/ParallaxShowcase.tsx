import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * ParallaxShowcase — 3-layer parallax section
 *
 * Layer 1 (center): Portrait scales 0.85 → 1.0
 * Layer 2 (left):   Slides from translateX(-120%) → translateX(-10%) at factor 0.4
 * Layer 3 (right):  Slides from translateX(120%)  → translateX(10%)  at factor 0.4
 *
 * progress = clamp((scrollY - sectionTop) / sectionHeight, 0, 1)
 * Side layers use progress * 0.4 for their own rate, mapped over full range.
 */

const PARALLAX_FACTOR = 0.4;

// Reusable lerp
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function ParallaxShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    // progress goes 0→1 as the section scrolls through the viewport
    const sectionTop = rect.top;
    const raw = (viewportHeight - sectionTop) / (sectionHeight + viewportHeight);
    setProgress(clamp(raw, 0, 1));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Gate with IntersectionObserver for performance
    let scrollBound = false;
    const attachScroll = () => {
      if (!scrollBound) {
        window.addEventListener('scroll', onScroll, { passive: true });
        scrollBound = true;
        onScroll();
      }
    };
    const detachScroll = () => {
      if (scrollBound) {
        window.removeEventListener('scroll', onScroll);
        scrollBound = false;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attachScroll();
        else detachScroll();
      },
      { threshold: 0, rootMargin: '100px' }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      detachScroll();
      cancelAnimationFrame(rafId.current);
    };
  }, [onScroll]);

  // ── Layer transforms ──────────────────────────
  // Center portrait: scale 0.85 → 1.0 with slight upward drift
  const centerScale = lerp(0.85, 1.0, progress);
  const centerY = lerp(20, 0, progress); // subtle upward drift

  // Side elements: use their own parallax speed
  // They complete -120%→-10% / 120%→10% mapped through the slower factor
  // Expand effective progress so sides finish their journey by the time section exits
  const sideProgress = clamp(progress / (1 - PARALLAX_FACTOR), 0, 1);
  const leftX = lerp(-120, -10, sideProgress);
  const rightX = lerp(120, 10, sideProgress);

  // Opacity: fade in as they enter
  const sideOpacity = clamp(progress * 3, 0, 1);
  const centerOpacity = clamp(progress * 2.5, 0, 1);

  return (
    <div ref={sectionRef} id="playground" className="parallax-showcase">
      <div className="parallax-showcase__inner">
        {/* ── Layer 1: Center portrait ────────────── */}
        <div
          className="parallax-layer parallax-layer--center"
          style={{
            transform: `scale(${centerScale}) translateY(${centerY}px)`,
            opacity: centerOpacity,
          }}
        >
          <img
            src="/myart/sitar.jpg"
            alt="Sitar"
            className="parallax-img parallax-img--center"
            referrerPolicy="no-referrer"
          />
          {/* Overlay text on center image */}
          <div className="parallax-center-overlay">
            <span className="parallax-center-label">Musical</span>
            <span className="parallax-center-title">Roots</span>
          </div>
        </div>

        {/* ── Layer 2: Left element ───────────────── */}
        <div
          className="parallax-layer parallax-layer--left"
          style={{
            transform: `translateX(${leftX}%)`,
            opacity: sideOpacity,
          }}
        >
          <img
            src="/myart/flute.jpg"
            alt="Bansuri"
            className="parallax-img parallax-img--side"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* ── Layer 3: Right element ──────────────── */}
        <div
          className="parallax-layer parallax-layer--right"
          style={{
            transform: `translateX(${rightX}%)`,
            opacity: sideOpacity,
          }}
        >
          <img
            src="/myart/harmonium.jpg"
            alt="Harmonium"
            className="parallax-img parallax-img--side"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient glow behind center image */}
        <div
          className="parallax-glow"
          style={{ opacity: centerOpacity * 0.6 }}
        />
      </div>
    </div>
  );
}
