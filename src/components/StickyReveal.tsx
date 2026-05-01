import React, { useEffect, useRef, useState } from 'react';

/**
 * StickyReveal — scroll-pinned text reveal section
 *
 * • 300vh wrapper, 100vh sticky inner
 * • Primary text fades from 0.2 → 1 opacity as you scroll through
 * • Secondary line fades in at the midpoint with a 300ms delay
 * • Uses IntersectionObserver to only attach scroll listener when visible
 */
export default function StickyReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sub1Ref = useRef<HTMLParagraphElement>(null);
  const sub2Ref = useRef<HTMLParagraphElement>(null);
  const sub3Ref = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  /* ── IntersectionObserver: activate scroll tracking only when in view ── */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  /* ── Scroll listener: compute progress and update styles directly ── */
  useEffect(() => {
    if (!isVisible) return;

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollableDistance = wrapperHeight - viewportHeight;
      const scrolled = -rect.top;

      const waitDistance = 1.5 * viewportHeight;
      const effectiveScrolled = Math.max(0, scrolled - waitDistance);
      const effectiveScrollable = Math.max(1, scrollableDistance - waitDistance);

      const p = Math.max(0, Math.min(1, effectiveScrolled / effectiveScrollable));

      // Update Heading
      if (headingRef.current) {
        const textScale = 0.96 + p * 0.04;
        headingRef.current.style.opacity = String(p);
        headingRef.current.style.transform = `scale(${textScale})`;
      }

      // Update Subtexts
      const updateSub = (ref: React.RefObject<HTMLParagraphElement>, threshold: number) => {
        if (!ref.current) return;
        const active = p > threshold;
        ref.current.style.opacity = active ? '1' : '0';
        ref.current.style.transform = active ? 'translateY(0)' : 'translateY(20px)';
      };

      updateSub(sub1Ref, 0.3);
      updateSub(sub2Ref, 0.6);
      updateSub(sub3Ref, 0.85);

      // Update Progress Bar
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleY(${p})`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial calc
    return () => window.removeEventListener('scroll', onScroll);
  }, [isVisible]);

  return (
    <div ref={wrapperRef} id="about" className="sticky-reveal-wrapper">
      <div className="sticky-reveal-inner">
        <div className="sticky-reveal-grain" />

        <div className="sticky-reveal-content max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-12">
          <h2
            ref={headingRef}
            className="sticky-reveal-heading"
            style={{ willChange: 'opacity, transform' }}
          >
            I don't just build models —
            <br />
            <span className="sticky-reveal-heading-accent">I engineer intelligence.</span>
          </h2>

          <div className="flex flex-col gap-8 text-white/80 font-serif text-2xl md:text-3xl font-light">
            <p
              ref={sub1Ref}
              style={{
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'opacity, transform',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              Blending logic, aesthetics, and raw data into seamless digital experiences.
            </p>
            <p
              ref={sub2Ref}
              style={{
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'opacity, transform',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              Because beautiful design and robust architecture should never be mutually exclusive.
            </p>
            <p
              ref={sub3Ref}
              className="font-mono text-sm md:text-base uppercase tracking-widest text-[#a3a3a3]"
              style={{
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'opacity, transform',
                opacity: 0,
                transform: 'translateY(20px)'
              }}
            >
              Every pixel placed with purpose. Every algorithm built to scale.
            </p>
          </div>
        </div>

        <div className="sticky-reveal-progress">
          <div
            ref={progressBarRef}
            className="sticky-reveal-progress-bar"
            style={{ willChange: 'transform' }}
          />
        </div>
      </div>
    </div>
  );
}
