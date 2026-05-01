import AboutSection from './AboutSection';
import ExpandBox from './ExpandBox';
import MyVibe from './MyVibe';
import PlaylistBento from './PlaylistBento';
import ProjectShowcase from './ProjectShowcase';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"]
  });

  const borderTopRadius = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  const yOffset = useTransform(scrollYProgress, [0, 1], ["150px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <div id="projects" className="relative isolate w-full bg-black">
      <ExpandBox />

      <AboutSection />

      {/* ════════════════════════════════════════════════════════════
          POST-REVEAL CONTENT (Light Mode)
          ════════════════════════════════════════════════════════════ */}
      <div ref={containerRef} className="relative z-20">
        <motion.div 
          style={{
            borderTopLeftRadius: borderTopRadius,
            borderTopRightRadius: borderTopRadius,
            y: yOffset,
            opacity: opacity,
          }}
          className="w-full bg-[#f8f9fa] text-black pt-20 md:pt-32 pb-16 md:pb-24 shadow-[0_-30px_60px_rgba(0,0,0,0.1)] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* My Vibe Masonry Grid */}
            <div className="mb-24">
              <MyVibe />
            </div>

            {/* Current Playlist Bento UI */}
            <div className="mb-32">
              <PlaylistBento />
            </div>

            {/* Project Showcase Section */}
            <ProjectShowcase />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
