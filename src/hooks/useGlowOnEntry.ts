import { useEffect, useRef } from 'react';

/**
 * useGlowOnEntry — Electric blue glow border on scroll entry
 *
 * Attaches an IntersectionObserver (threshold: 0.3) to the returned ref.
 * When the element enters view:
 *   1. Instantly applies the glow via `.glow-entry`
 *   2. After a brief hold (80ms to let the glow render), adds `.glow-entry--fade`
 *      which transitions the shadow out over 800ms
 *
 * Once fired, the observer disconnects (one-shot by default).
 */
export function useGlowOnEntry<T extends HTMLElement = HTMLDivElement>(
  options?: { once?: boolean }
) {
  const ref = useRef<T>(null);
  const once = options?.once ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Step 1 — flash the glow on
          el.classList.add('glow-entry');

          // Step 2 — after a brief hold, fade the glow out
          requestAnimationFrame(() => {
            setTimeout(() => {
              el.classList.add('glow-entry--fade');
            }, 80);
          });

          if (once) observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return ref;
}
