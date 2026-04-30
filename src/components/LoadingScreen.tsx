import { useState, useEffect, useRef, useCallback } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'expand' | 'reveal' | 'done'>('expand');
  const boxRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(0);

  const EXPAND_DURATION = 1800;  // ms — white square grows
  const REVEAL_DURATION = 600;   // ms — overlay fades out

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  const animate = useCallback(() => {
    const elapsed = performance.now() - startTime.current;
    const box = boxRef.current;

    if (!box) return;

    if (phase === 'expand') {
      const t = Math.min(elapsed / EXPAND_DURATION, 1);
      const eased = easeOutQuart(t);

      // Start from a tiny square (24px) → full viewport
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const startSize = 24;

      const w = startSize + eased * (vw - startSize);
      const h = startSize + eased * (vh - startSize);

      box.style.width = `${w}px`;
      box.style.height = `${h}px`;



      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        // Box is now full screen — start reveal phase
        box.style.width = '100vw';
        box.style.height = '100vh';
        setPhase('reveal');
      }
    }
  }, [phase]);

  // Start expansion on mount
  useEffect(() => {
    // Small delay so the tiny square is visible first
    const timer = setTimeout(() => {
      startTime.current = performance.now();
      requestAnimationFrame(animate);
    }, 200);
    return () => clearTimeout(timer);
  }, [animate]);

  // Handle reveal phase — fade out the entire overlay
  useEffect(() => {
    if (phase !== 'reveal') return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Trigger CSS transition
    requestAnimationFrame(() => {
      overlay.style.opacity = '0';
    });

    const timer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, REVEAL_DURATION);

    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      ref={overlayRef}
      className="loading-overlay"
      style={{
        opacity: 1,
        transition: `opacity ${REVEAL_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1)`,
      }}
    >
      <div
        ref={boxRef}
        className="loading-box"
        style={{ width: '24px', height: '24px' }}
      />
    </div>
  );
}
