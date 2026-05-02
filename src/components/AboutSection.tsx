import { useEffect, useRef, useCallback } from 'react';
import MetaBalls from './MetaBalls';
import DecryptedText from './DecryptedText';

/**
 * AboutSection — Parashux-style 4-layer scroll reveal
 * 
 * Layer 1: Center portrait — scale(0.72 → 1.0) driven by scroll progress 1:1
 * Layer 2: Left hand     — translateX(-130% → -8%) at dampened 0.85× speed
 * Layer 3: Right hand    — translateX(+130% → +8%) at dampened 0.85× speed
 * Layer 4: Bio text      — IntersectionObserver staggered fade-up, 140ms stagger
 */

function getScrollProgress(section: HTMLElement): number {
  const rect = section.getBoundingClientRect();
  const windowH = window.innerHeight;
  const total = rect.height + windowH;
  const current = windowH - rect.top;
  return Math.min(1, Math.max(0, current / total));
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const handLeftRef = useRef<HTMLDivElement>(null);
  const handRightRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  const animate = useCallback(() => {
    const section = sectionRef.current;
    if (!section) {
      rafId.current = requestAnimationFrame(animate);
      return;
    }

    const progress = getScrollProgress(section);
    const isMobile = window.innerWidth <= 768;

    // Master opacity: on desktop, fade over 30% of scroll. On mobile, fade faster to avoid clashing with DecryptedText.
    const revealOp = isMobile ? Math.min(1, progress * 4) : Math.min(1, progress * 3.33);

    // LAYER 1: Center Portrait
    if (portraitRef.current) {
      const scale = 1 + progress * (isMobile ? 0.15 : 0.28);
      portraitRef.current.style.transform = `scale(${scale})`;
      portraitRef.current.style.opacity = String(revealOp);
    }

    // LAYER 4: Bio Text
    if (bioRef.current) {
      bioRef.current.style.opacity = String(revealOp);
      // Reduce translateY on mobile for a subtler effect
      const bioY = (1 - revealOp) * (isMobile ? 10 : 20);
      bioRef.current.style.transform = `translateY(${bioY}px)`;
    }

    // Damped progress for hands (0.85× speed)
    const dampedProgress = progress * 0.85;

    // LAYER 2: Left Hand
    if (handLeftRef.current) {
      const leftX = -25 + dampedProgress * 85; // Start visible, move deep inward
      const rotation = -15 + dampedProgress * 15;
      const scale = 0.9 + dampedProgress * 0.2;
      handLeftRef.current.style.transform = `translateX(${leftX}%) translateY(-50%) rotate(${rotation}deg) scale(${scale})`;
      handLeftRef.current.style.opacity = String(revealOp);
    }

    // LAYER 3: Right Hand
    if (handRightRef.current) {
      const rightX = 25 - dampedProgress * 85; // Start visible, move deep inward
      const rotation = 15 - dampedProgress * 15;
      const scale = 0.9 + dampedProgress * 0.2;
      handRightRef.current.style.transform = `translateX(${rightX}%) translateY(-50%) rotate(${rotation}deg) scale(${scale})`;
      handRightRef.current.style.opacity = String(revealOp);
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (portraitRef.current) portraitRef.current.style.transform = 'scale(1)';
      if (handLeftRef.current) handLeftRef.current.style.transform = 'translateX(-10%) translateY(-50%)';
      if (handRightRef.current) handRightRef.current.style.transform = 'translateX(10%) translateY(-50%)';
      if (bioRef.current) bioRef.current.style.opacity = '1';
      return;
    }

    let observer: IntersectionObserver;
    const section = sectionRef.current;
    
    if (section) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          rafId.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafId.current);
        }
      }, { threshold: 0 });
      observer.observe(section);
    }

    return () => {
      if (observer) observer.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-inner">
        {/* Layer 2: Left hand */}
        <div ref={handLeftRef} className="hand hand-left">
          <img
            src="/about-files/left-hand.png"
            alt=""
            draggable={false}
          />
        </div>

        {/* Center Composition: Portrait + Bio Text */}
        <div className="about-center-composition">
          <div ref={portraitRef} className="about-portrait">
            <img
              src="/about-files/about.png"
              alt="About portrait"
              draggable={false}
            />
          </div>

          <div ref={bioRef} className="about-bio">
            <p className="bio-line bio-revealed">
              <DecryptedText 
                text="From Solapur, Maharashtra, I’m Vaibhav—somewhere between code and consciousness. I study Data Science and AI at IIT Madras, building a strong foundation while stepping into psychology. I’m curious about both systems and the human mind—how machines learn, and why people think, feel, and behave the way they do."
                animateOn="view"
                revealDirection="start"
                speed={20}
                sequential={true}
              />
            </p>
            <p className="bio-line bio-revealed">
              <DecryptedText 
                text="I care about design, clarity, and the way ideas take shape. Whether it’s code, a concept, or a product, I approach things with intention—learning deeply, building patiently, and refining my vision through hands-on work and exploration."
                animateOn="view"
                revealDirection="start"
                speed={20}
                sequential={true}
              />
            </p>
            <p className="bio-line bio-revealed">
              <DecryptedText 
                text="Outside of academics, I’m shaped by music, literature, and quiet observation. Flute, sitar, harmonium, piano—different forms, same expression. Drawn to nature and human philosophy, I’m exploring the intersection of AI, creativity, and human behavior, one step at a time."
                animateOn="view"
                revealDirection="start"
                speed={20}
                sequential={true}
              />
            </p>
            <div className="mt-12 w-full h-64 relative">
              <MetaBalls color="#ffffff" cursorBallColor="#ffffff" speed={0.25} ballCount={18} animationSize={60} cursorBallSize={3} enableTransparency={true} />
            </div>
          </div>
        </div>

        {/* Layer 3: Right hand */}
        <div ref={handRightRef} className="hand hand-right">
          <img
            src="/about-files/right-hand.png"
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}

