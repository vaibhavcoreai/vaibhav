import { useEffect, useRef, useCallback } from 'react';

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const remap = (v: number, inMin: number, inMax: number) => clamp((v - inMin) / (inMax - inMin), 0, 1);

export default function ShrinkBox() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const darkScrollHintRef = useRef<HTMLDivElement>(null);

  const rafId = useRef(0);

  const animate = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    
    // Progress of the wrapper through the viewport
    const raw = -rect.top / (rect.height - window.innerHeight);
    const p = clamp(raw, 0, 1);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (boxRef.current && textRef.current) {
      // ════════════════════════════════════════════════════════════
      // PHASE 1: White box shrinks to a glowing orb (p: 0 → 0.5)
      // ════════════════════════════════════════════════════════════
      const p1 = remap(p, 0, 0.5);
      
      const isMobile = vw < 768;
      const orbSize = isMobile ? 80 : 120;
      
      // Easing out the shrink
      const easeP1 = p1 < 0.5 ? 2 * p1 * p1 : 1 - Math.pow(-2 * p1 + 2, 2) / 2;

      const boxW = vw - easeP1 * (vw - orbSize);
      const boxH = vh - easeP1 * (vh - orbSize);
      
      boxRef.current.style.width = `${boxW}px`;
      boxRef.current.style.height = `${boxH}px`;
      
      // Add a subtle glow as it becomes an orb
      const glowOpacity = easeP1 * 0.3;
      boxRef.current.style.boxShadow = `0 0 60px rgba(255, 255, 255, ${glowOpacity})`;
      
      // ════════════════════════════════════════════════════════════
      // PHASE 2: Text fades out as orb shrinks (p: 0 → 0.3)
      // ════════════════════════════════════════════════════════════
      const pText = remap(p, 0, 0.3);
      textRef.current.style.opacity = String(1 - pText);
      textRef.current.style.transform = `scale(${1 - pText * 0.2})`;

      // ════════════════════════════════════════════════════════════
      // SCROLL HINT: Fades out quickly as user starts scrolling (p: 0 → 0.15)
      // ════════════════════════════════════════════════════════════
      if (scrollHintRef.current) {
        const pHint = remap(p, 0, 0.15);
        scrollHintRef.current.style.opacity = String(1 - pHint);
        scrollHintRef.current.style.transform = `translateY(${pHint * -12}px)`;
      }

      // ════════════════════════════════════════════════════════════
      // DARK SCROLL HINT: Visible in the black surrounding area (p: 0.3 → 0.75)
      // ════════════════════════════════════════════════════════════
      if (darkScrollHintRef.current) {
        const pDarkIn  = remap(p, 0.3, 0.45);   // fade in
        const pDarkOut = remap(p, 0.6, 0.75);   // fade out
        const darkOpacity = pDarkIn * (1 - pDarkOut);
        darkScrollHintRef.current.style.opacity = String(darkOpacity);
        darkScrollHintRef.current.style.transform = `translateX(-50%) translateY(${(1 - pDarkIn) * 10}px)`;
      }

      // ════════════════════════════════════════════════════════════
      // PHASE 3: Orb fades out into the dark (p: 0.7 → 0.95)
      // ════════════════════════════════════════════════════════════
      const p3 = remap(p, 0.7, 0.95);
      const easeP3 = p3 * p3 * p3; // steep ease-in
      
      if (p >= 0.7) {
        // Shrink the box to 0
        boxRef.current.style.width = `${orbSize * (1 - easeP3)}px`;
        boxRef.current.style.height = `${orbSize * (1 - easeP3)}px`;
        boxRef.current.style.opacity = String(1 - p3);
      } else {
        boxRef.current.style.opacity = '1';
      }

      // ════════════════════════════════════════════════════════════
      // POSITIONING
      // ════════════════════════════════════════════════════════════
      if (raw >= 1) {
        boxRef.current.style.position = 'absolute';
        boxRef.current.style.top = 'auto';
        boxRef.current.style.bottom = '0';
        boxRef.current.style.transform = 'translateX(-50%)';
      } else if (raw <= 0) {
        boxRef.current.style.position = 'absolute';
        boxRef.current.style.top = '0';
        boxRef.current.style.bottom = 'auto';
        boxRef.current.style.transform = 'translateX(-50%)';
      } else {
        boxRef.current.style.position = 'fixed';
        boxRef.current.style.top = '50%';
        boxRef.current.style.bottom = 'auto';
        boxRef.current.style.transform = 'translate(-50%, -50%)';
      }
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (boxRef.current) boxRef.current.style.display = 'none';
      if (textRef.current) textRef.current.style.display = 'none';
      return;
    }

    let observer: IntersectionObserver;
    const wrapper = wrapperRef.current;
    
    if (wrapper) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          rafId.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafId.current);
        }
      }, { threshold: 0 });
      observer.observe(wrapper);
    }

    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <div ref={wrapperRef} className="h-[250vh] relative z-30 w-full pointer-events-none -mt-px">
      <div 
        ref={boxRef} 
        className="bg-[#f8f9fa] overflow-hidden"
        style={{ width: '100vw', height: '100vh', left: '50%', transform: 'translateX(-50%)', borderRadius: '0px' }}
      >
        {/* Centered group: text + scroll hint stacked */}
        <div
          className="absolute top-1/2 left-1/2 flex flex-col items-center gap-6 pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <p
            ref={textRef}
            className="font-serif italic text-black whitespace-nowrap tracking-wide"
            style={{ fontSize: '2.5rem' }}
          >
            Beyond the surface.
          </p>

          {/* Keep Scrolling Hint — white box (light bg) */}
          <div
            ref={scrollHintRef}
            className="flex flex-col items-center gap-3 pointer-events-none"
          >
            <span className="text-black uppercase tracking-[0.25em] text-xs font-medium" style={{ fontFamily: 'inherit' }}>
              Keep scrolling
            </span>
            <div className="hero-scroll-mouse" style={{ borderColor: '#000000' }}>
              <div className="hero-scroll-mouse-dot" style={{ background: '#000000' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Keep Scrolling Hint — dark / black portion (white text, fixed to viewport) */}
      <div
        ref={darkScrollHintRef}
        className="fixed bottom-10 left-1/2 flex flex-col items-center gap-3 pointer-events-none z-40"
        style={{ transform: 'translateX(-50%)', opacity: 0 }}
      >
        <span className="text-white uppercase tracking-[0.25em] text-xs font-medium" style={{ fontFamily: 'inherit' }}>
          Keep scrolling
        </span>
        <div className="hero-scroll-mouse" style={{ borderColor: '#ffffff' }}>
          <div className="hero-scroll-mouse-dot" style={{ background: '#ffffff' }} />
        </div>
      </div>
    </div>
  );
}
