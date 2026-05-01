import AboutSection from './AboutSection';
import ExpandBox from './ExpandBox';
import MyVibe from './MyVibe';
import CircularGallery from './CircularGallery';
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

  const playlistItems = [
    {
      image: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ea/01/29/ea012994-51e8-6883-e1e1-c71fdd51754f/5026854264479.jpg/600x600bb.jpg",
      text: "Khat"
    },
    {
      image: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e3/7b/f8/e37bf8d3-268f-a555-f713-480f4e8f69c1/23UM1IM18506.rgb.jpg/600x600bb.jpg",
      text: "Ocean"
    },
    {
      image: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f5/b8/a8/f5b8a8d3-c54a-20c8-b178-bc304a72d6eb/8903431130129_cover.jpg/600x600bb.jpg",
      text: "Kahe mose"
    },
    {
      image: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/9d/0d/a9/9d0da968-2da7-9850-2100-df1abdd32564/mzi.doaajgfk.jpg/600x600bb.jpg",
      text: "Caribbean Blue"
    },
    {
      image: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c5/3d/97/c53d978b-4433-743e-7a4b-e01942cd33ee/00602517784154.rgb.jpg/600x600bb.jpg",
      text: "Lay all your love"
    }
  ];

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
          className="w-full bg-[#f8f9fa] text-black pt-20 md:pt-32 shadow-[0_-30px_60px_rgba(0,0,0,0.1)] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* My Vibe Masonry Grid */}
            <div className="mb-24">
              <MyVibe />
            </div>

            {/* Circular Gallery (Replacing Playlist Bento) */}
            <div className="mb-32">
              <div className="mb-12">
                <h2 className="text-4xl md:text-6xl font-serif text-black mb-4">Current Rotation</h2>
                <p className="text-black/50 tracking-widest uppercase text-xs md:text-sm">What's playing in the background</p>
              </div>
              <div className="h-[400px] md:h-[600px] relative">
                <CircularGallery 
                  items={playlistItems}
                  bend={3} 
                  textColor="#000000" 
                  borderRadius={0.05} 
                  scrollEase={0.02}
                />
              </div>
            </div>
          </div>

          {/* Project Showcase Section (Moved outside inner max-w container) */}
          <ProjectShowcase />
        </motion.div>
      </div>
    </div>
  );
}
