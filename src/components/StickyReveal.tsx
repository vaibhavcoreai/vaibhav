import { useEffect, useRef, useState } from 'react';

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
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const subtextTimer = useRef<ReturnType<typeof setTimeout>>();

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

  /* ── Scroll listener: compute progress through the sticky zone ── */
  useEffect(() => {
    if (!isVisible) return;

    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Scrollable distance = wrapper height minus the sticky viewport
      const scrollableDistance = wrapperHeight - viewportHeight;

      // How far we've scrolled into the wrapper (0 = top edge at viewport top)
      const scrolled = -rect.top;

      // Sync with ShrinkBox: Wait 150vh before starting our text animations
      const waitDistance = 1.5 * viewportHeight;
      const effectiveScrolled = Math.max(0, scrolled - waitDistance);
      const effectiveScrollable = Math.max(1, scrollableDistance - waitDistance);

      // Clamp progress to 0–1
      const p = Math.max(0, Math.min(1, effectiveScrolled / effectiveScrollable));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial calc
    return () => window.removeEventListener('scroll', onScroll);
  }, [isVisible]);

  /* ── Trigger staggered text reveals based on scroll progress ── */
  const [showSub1, setShowSub1] = useState(false);
  const [showSub2, setShowSub2] = useState(false);
  const [showSub3, setShowSub3] = useState(false);

  useEffect(() => {
    setShowSub1(progress > 0.3);
    setShowSub2(progress > 0.6);
    setShowSub3(progress > 0.85);
  }, [progress]);

  // Map progress 0→1 to opacity 0→1 so it's completely hidden during ShrinkBox
  const textOpacity = progress;
  // Subtle scale: 0.96 → 1
  const textScale = 0.96 + progress * 0.04;

  return (
    <div ref={wrapperRef} id="about" className="sticky-reveal-wrapper">
      <div className="sticky-reveal-inner">
        {/* Subtle grain overlay */}
        <div className="sticky-reveal-grain" />

        <div className="sticky-reveal-content max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center gap-12">
          <h2
            className="sticky-reveal-heading"
            style={{
              opacity: textOpacity,
              transform: `scale(${textScale})`,
            }}
          >
            I don't just build models —
            <br />
            <span className="sticky-reveal-heading-accent">I engineer intelligence.</span>
          </h2>

          <div className="flex flex-col gap-8 text-white/80 font-serif text-2xl md:text-3xl font-light">
            <p
              style={{
                opacity: showSub1 ? 1 : 0,
                transform: showSub1 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Blending logic, aesthetics, and raw data into seamless digital experiences.
            </p>
            <p
              style={{
                opacity: showSub2 ? 1 : 0,
                transform: showSub2 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Because beautiful design and robust architecture should never be mutually exclusive.
            </p>
            <p
              className="font-mono text-sm md:text-base uppercase tracking-widest text-[#a3a3a3]"
              style={{
                opacity: showSub3 ? 1 : 0,
                transform: showSub3 ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              Every pixel placed with purpose. Every algorithm built to scale.
            </p>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="sticky-reveal-progress">
          <div
            className="sticky-reveal-progress-bar"
            style={{ transform: `scaleY(${progress})` }}
          />
        </div>
      </div>
    </div>
  );
}
