import AboutSection from './AboutSection';
import ExpandBox from './ExpandBox';
import MyVibe from './MyVibe';
import PlaylistBento from './PlaylistBento';
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
          className="w-full bg-[#f8f9fa] text-black pt-32 pb-24 shadow-[0_-30px_60px_rgba(0,0,0,0.1)] overflow-hidden"
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

          {/* NeuralSight Showcase */}
          <section data-glow="entry" className="min-h-screen flex flex-col justify-center py-24 rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div data-scroll="fade-up">
                <span className="text-black/40 font-mono text-sm tracking-widest uppercase mb-4 block">Classified Operation</span>
                <h3 className="font-serif text-5xl md:text-7xl mb-6 text-black">Cooking... 👨‍🍳</h3>
                <div className="flex flex-wrap gap-4 mb-8 text-xs font-mono uppercase tracking-widest text-black/40">
                  <span className="border border-gray-300 px-3 py-1 rounded-full pt-1.5">Late Nights</span>
                  <span className="border border-gray-300 px-3 py-1 rounded-full pt-1.5">Caffeine</span>
                  <span className="border border-gray-300 px-3 py-1 rounded-full pt-1.5">Broken Code</span>
                </div>
                <p className="text-black/60 leading-relaxed font-sans max-w-xl text-lg">
                  I'm currently in the lab putting the pieces together for the next big thing. There's a lot of typing, sighing, and staring blankly at the screen involved right now. Check back soon when it's finally ready for the world!
                </p>
                <button className="mt-12 border border-gray-300 text-black/40 px-8 py-4 font-mono text-sm uppercase tracking-widest cursor-not-allowed">
                  Still Baking ⏳
                </button>
              </div>
              <div data-scroll="scale-in" className="bg-white border border-gray-200 shadow-sm p-8 rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
                  alt="Coding in progress"
                  className="w-full h-auto rounded-xl shadow-xl hover:-translate-y-2 transition-all duration-500 grayscale opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>
        </div>
        </motion.div>
      </div>
    </div>
  );
}
