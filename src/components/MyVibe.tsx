import React, { useEffect, useRef } from 'react';
import './MyVibe.css';

const mediaFiles = [
  { src: '/myvibe/cosmos_1141411701.jpeg', type: 'image' },
  { src: '/myvibe/cosmos_12703615.jpg', type: 'image' },
  { src: '/myvibe/cosmos_1368800789 (1).gif', type: 'gif' },
  { src: '/myvibe/cosmos_1443712111.jpg', type: 'image' },
  { src: '/myvibe/cosmos_1662633646 (1).gif', type: 'gif' },
  { src: '/myvibe/cosmos_1945789473 (1) (1).gif', type: 'gif' },
  { src: '/myvibe/cosmos_2018050240.jpg', type: 'image' },
  { src: '/myvibe/cosmos_279044207 (1).gif', type: 'gif' },
  { src: '/myvibe/cosmos_545421381 (1).gif', type: 'gif' },
  { src: '/myvibe/cosmos_638102584 (1).gif', type: 'gif' },
  { src: '/myvibe/cosmos_761579918.jpg', type: 'image' },
  { src: '/myvibe/cosmos_882032947.jpg', type: 'image' },
  { src: '/myvibe/cosmos_918708588.jpg', type: 'image' },
  { src: '/myvibe/cosmos_936748224 (1).jpg', type: 'image' },
  { src: '/myvibe/cosmos_991794584.jpg', type: 'image' }
];

// Shuffle array for a random look every time, but keep a predictable grid structure
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function MyVibe() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Simple scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vibe-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  const shuffledMedia = React.useMemo(() => shuffleArray(mediaFiles), []);

  return (
    <section id="my-vibe" className="vibe-section" ref={sectionRef}>
      <div className="vibe-header">
        <h2 className="vibe-title">Aesthetics & Vibe</h2>
        <p className="vibe-subtitle">A collection of moments, thoughts, and fragments of inspiration.</p>
      </div>

      <div className="vibe-grid">
        {shuffledMedia.map((media, index) => {
          // Assign random span classes to create an organic "bento" or masonry look
          const isLarge = index % 5 === 0; // Every 5th item is large
          const isWide = index % 7 === 0; // Every 7th item is wide
          const isTall = index % 4 === 0 && !isLarge && !isWide; // Every 4th item is tall

          let spanClass = 'vibe-item-normal';
          let customStyle: React.CSSProperties = {};

          // Force specific shapes/fits for media that shouldn't be cropped
          if (media.src.includes('cosmos_1945789473')) {
            spanClass = 'vibe-item-tall'; // Force vertical orientation
            customStyle = { objectFit: 'contain', backgroundColor: '#000' }; // Ensure it fits fully without cropping
          } else {
            if (isLarge) spanClass = 'vibe-item-large';
            else if (isWide) spanClass = 'vibe-item-wide';
            else if (isTall) spanClass = 'vibe-item-tall';
          }

          return (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              className={`vibe-item ${spanClass}`}
              style={{ transitionDelay: `${(index % 8) * 0.1}s`, ...(media.src.includes('cosmos_1945789473') ? { backgroundColor: '#000' } : {}) }}
            >
              <img
                src={media.src}
                alt={`Aesthetic vibe ${index + 1}`}
                className="vibe-image"
                style={customStyle}
                loading="lazy"
              />
              <div className="vibe-overlay"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
