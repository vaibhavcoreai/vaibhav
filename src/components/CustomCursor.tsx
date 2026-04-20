import { useEffect, useRef, useCallback } from 'react';

/**
 * CustomCursor — Parashux-style floating cursor
 * 
 * • 8×8 filled square by default, lerp-follows the real mouse at 0.12
 * • Morphs into a larger translucent circle on hover over interactive elements
 * • Uses requestAnimationFrame for 60fps tracking
 * • Hidden on touch / mobile devices
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Mutable refs so the rAF loop reads fresh values without re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const pos   = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const raf = useRef<number>(0);
  const isTouchDevice = useRef(false);

  /* ── lerp helper ─────────────────────────────────── */
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  /* ── animation loop ──────────────────────────────── */
  const animate = useCallback(() => {
    const LERP_FACTOR = 0.12;
    pos.current.x = lerp(pos.current.x, mouse.current.x, LERP_FACTOR);
    pos.current.y = lerp(pos.current.y, mouse.current.y, LERP_FACTOR);

    const el = cursorRef.current;
    if (el) {
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    }

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Detect touch-only device — bail out entirely
    const mql = window.matchMedia('(pointer: coarse)');
    if (mql.matches) {
      isTouchDevice.current = true;
      return;
    }

    /* ── mouse move ─────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // First move: snap cursor immediately (no lag on page load)
      if (pos.current.x === 0 && pos.current.y === 0) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
      }

      // Show cursor after first real move
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    /* ── interactive-element hover detection ────────── */
    const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        isHovering.current = true;
        cursorRef.current?.classList.add('cursor--hover');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(INTERACTIVE_SELECTOR)) {
        isHovering.current = false;
        cursorRef.current?.classList.remove('cursor--hover');
      }
    };

    /* ── hide cursor when it leaves the viewport ───── */
    const onMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };
    const onMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    /* ── attach ─────────────────────────────────────── */
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    // Kick off the rAF loop
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [animate]);

  // Don't render anything on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return <div ref={cursorRef} className="custom-cursor" />;
}
