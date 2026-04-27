import { useEffect, useRef, useCallback } from 'react';

// ── Helper: clamp + remap ────────────────────────────────────────
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const remap = (v: number, inMin: number, inMax: number) => clamp((v - inMin) / (inMax - inMin), 0, 1);

export default function ExpandBox() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Elements driven by scroll
  const ghostTextRef = useRef<HTMLDivElement>(null);      // Phase 1: ghost text on grey
  const scrollHintRef = useRef<HTMLDivElement>(null);     // Phase 1: keep-scrolling indicator
  const boxRef = useRef<HTMLDivElement>(null);             // Phase 2-4: expanding black box
  const boxTextRef = useRef<HTMLParagraphElement>(null);   // "just a data scientist?" inside box
  const line2Ref = useRef<HTMLParagraphElement>(null);     // "keep Scrolling" inside box

  const rafId = useRef(0);

  // ── rAF loop: drives ALL phases from one scroll value ───────
  const animate = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const raw = -rect.top / (rect.height - window.innerHeight);
    const p = clamp(raw, 0, 1);

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // ════════════════════════════════════════════════════════════
    // PHASE 1: Ghost text on grey page (p: 0 → 0.15)
    // ════════════════════════════════════════════════════════════
    if (ghostTextRef.current) {
      const p1 = remap(p, 0, 0.15);
      const ghostOp = 1 * (1 - p1);
      ghostTextRef.current.style.opacity = String(ghostOp);
      
      const hasStarted = rect.top <= 0;
      const isInPhase1 = p < 0.15;
      
      ghostTextRef.current.style.visibility = (hasStarted && isInPhase1) ? 'visible' : 'hidden';

      // ── Scroll hint: fades in at p=0, fades out with ghost text ──
      if (scrollHintRef.current) {
        const hintOp = 1 - p1;  // mirrors ghostOp — vanishes with ghost text
        scrollHintRef.current.style.opacity = String(hasStarted ? hintOp : 0);
        // Base offset: 12px (half ghost text) + 48px gap = 60px below viewport centre
        // As phase 1 exits, nudge slightly upward (-12px) to match ghost text fade
        const nudge = p1 * -12;
        scrollHintRef.current.style.transform = `translate(-50%, calc(60px + ${nudge}px))`;
        scrollHintRef.current.style.visibility = (hasStarted && isInPhase1) ? 'visible' : 'hidden';
      }
    }

    // ════════════════════════════════════════════════════════════
    // PHASE 2: Black box forms and expands (p: 0.15 → 0.65)
    // ════════════════════════════════════════════════════════════
    if (boxRef.current && boxTextRef.current) {
      const p2 = remap(p, 0.15, 0.65);

      if (p <= 0.15) {
        boxRef.current.style.opacity = '0';
        boxRef.current.style.visibility = 'hidden';
      } else {
        boxRef.current.style.opacity = '1';
        boxRef.current.style.visibility = 'visible';

        const isMobile = vw < 768;
        const startW = isMobile ? 220 : 320;
        const startH = isMobile ? 56 : 70;
        
        const boxW = startW + p2 * (vw - startW);
        const boxH = startH + p2 * (vh - startH);
        boxRef.current.style.width = `${boxW}px`;
        boxRef.current.style.height = `${boxH}px`;

        const startFS = isMobile ? 0.8 : 1.5;
        const endFS = isMobile ? 1.4 : 3.5;
        const fontSize = startFS + p2 * (endFS - startFS);
        boxTextRef.current.style.fontSize = `${fontSize}rem`;
        boxTextRef.current.style.opacity = '1';
        boxTextRef.current.style.color = '#ffffff';
      }

      // ════════════════════════════════════════════════════════
      // PHASE 3: Full panel + text changes (p: 0.65 → 0.85)
      // ════════════════════════════════════════════════════════
      const p3 = remap(p, 0.65, 0.85);

      if (p >= 0.65) {
        boxRef.current.style.width = '100vw';
        boxRef.current.style.height = '100vh';

        // Text scroll effect: Line 1 slides up and fades
        const line1Op = 1 - p3;
        const line1Y = -p3 * 40; // Slide up 40px
        boxTextRef.current.style.opacity = String(line1Op);
        boxTextRef.current.style.transform = `translateY(${line1Y}px)`;

        if (line2Ref.current) {
          // Line 2 slides up into view and fades in
          const line2Op = remap(p, 0.70, 0.85);
          const line2Y = (1 - line2Op) * 40; // Slide up from 40px below to 0
          line2Ref.current.style.opacity = String(line2Op);
          // Combine with the translate(-50%, -50%) from CSS
          line2Ref.current.style.transform = `translate(-50%, calc(-50% + ${line2Y}px))`;
        }
      } else {
        boxTextRef.current.style.opacity = '1';
        boxTextRef.current.style.transform = 'translateY(0)';
        if (line2Ref.current) {
          line2Ref.current.style.opacity = '0';
          line2Ref.current.style.transform = 'translate(-50%, calc(-50% + 40px))';
        }
      }

      // ════════════════════════════════════════════════════════
      // PHASE 4: Switch to absolute position at end of wrapper
      // ════════════════════════════════════════════════════════
      if (raw >= 1) {
        boxRef.current.style.position = 'absolute';
        boxRef.current.style.top = 'auto';
        boxRef.current.style.bottom = '0';
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

  // ── Lifecycle ─────────────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (ghostTextRef.current) ghostTextRef.current.style.visibility = 'hidden';
      if (boxRef.current) {
        boxRef.current.style.opacity = '0';
        boxRef.current.style.visibility = 'hidden';
      }
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
    <div ref={wrapperRef} className="box-expand-wrapper">
      {/* ── PHASE 1: Ghost text floating on grey ──────────────── */}
      <div ref={ghostTextRef} className="ghost-text">
        just Data Science?
      </div>

      {/* ── PHASE 1: Keep Scrolling hint — anchored just below ghost text ── */}
      <div
        ref={scrollHintRef}
        className="fixed top-1/2 left-1/2 flex flex-col items-center gap-3 pointer-events-none z-40"
        style={{ transform: 'translate(-50%, 60px)', opacity: 0, visibility: 'hidden' }}
      >
        <span
          className="text-black uppercase tracking-[0.25em] text-xs font-medium"
          style={{ fontFamily: 'inherit' }}
        >
          Keep scrolling
        </span>
        <div className="hero-scroll-mouse" style={{ borderColor: '#000000' }}>
          <div className="hero-scroll-mouse-dot" style={{ background: '#000000' }} />
        </div>
      </div>

      {/* ── PHASE 2-4: Expanding black box ────────────────────── */}
      <div ref={boxRef} className="expand-box">
        {/* Center text */}
        <div className="expand-box-text">
          <p ref={boxTextRef} className="expand-line-1">
            just Data Science?
          </p>
          <p ref={line2Ref} className="expand-line-2">
            keep Scrolling
          </p>
        </div>
      </div>
    </div>
  );
}
