import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { selectedWorks, WorkItem } from '../data/works';

export default function ProjectShowcase() {
  return (
    <section className="py-24 md:py-48 relative overflow-hidden bg-[#f8f9fa]">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 mb-32 md:mb-64 relative z-10">
        <div data-scroll="fade-up" className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-black/30 font-mono text-[10px] uppercase tracking-[0.6em] block mb-6">Discovery Operations</span>
            <h2 className="font-serif text-6xl md:text-9xl text-black leading-none tracking-tighter">
              Selected<br/><span className="italic opacity-40">Artifacts.</span>
            </h2>
          </div>
          <p className="max-w-md text-black/50 font-sans text-lg md:text-xl leading-relaxed italic border-l border-black/10 pl-8">
            Each project is an experiment in code, aesthetics, and the boundaries of digital interaction.
          </p>
        </div>
      </div>

      <div className="space-y-48 md:space-y-96">
        {selectedWorks.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: WorkItem; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const isEven = index % 2 === 0;
  
  // Parallax Values
  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['50px', '-50px']);
  const bgTitleX = useTransform(scrollYProgress, [0, 1], isEven ? ['-20%', '0%'] : ['0%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity }}
      className="relative w-full"
    >
      {/* Background Floating Title */}
      <motion.div 
        style={{ x: bgTitleX }}
        className="absolute top-1/2 -translate-y-1/2 left-0 w-full whitespace-nowrap pointer-events-none z-0 hidden lg:block"
      >
        <span className="text-[20rem] font-serif italic text-black/[0.03] leading-none select-none">
          {project.title} {project.title} {project.title}
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center`}>
          
          {/* Visual Column */}
          <div className={`lg:col-span-7 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
            <div 
              data-scroll="scale-in"
              className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-black shadow-2xl group cursor-none"
            >
              <motion.img
                style={{ y: imageY, scale: 1.1 }}
                src={project.image}
                alt={project.title}
                className="w-full h-[130%] object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-[1.5s] cubic-bezier(0.22, 1, 0.36, 1)"
              />
              
              {/* Scanline Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
              
              {/* Data Overlay */}
              <div className="absolute top-8 left-8 flex items-center gap-4">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
                <span className="font-mono text-[8px] text-white/40 uppercase tracking-[0.4em]">{project.coordinates}</span>
              </div>

              {/* View Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <Link 
                  to={`/selected-work/${project.slug}`}
                  className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center group/btn hover:bg-white hover:scale-110 transition-all duration-500"
                >
                  <span className="font-mono text-[10px] text-white group-hover/btn:text-black uppercase tracking-widest">View</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <motion.div 
            style={{ y: textY }}
            className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div data-scroll="fade-up" className={`space-y-8 ${isEven ? '' : 'lg:text-right flex flex-col lg:items-end'}`}>
              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-blue-500 tracking-tighter">PROJECT_{project.id}</span>
                <div className="h-px w-12 bg-black/10" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/30">{project.category}</span>
              </div>

              <h3 className="font-serif text-5xl md:text-8xl text-black leading-[0.8] tracking-tighter">
                {project.title.split('').map((char, i) => (
                  <motion.span 
                    key={i} 
                    className={i === 0 ? 'text-blue-500' : ''}
                    whileHover={{ italic: true, color: '#3b82f6' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h3>

              <div className="relative p-8 md:p-12 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-black/5 shadow-xl hover:shadow-2xl transition-all duration-700 group/box">
                <p className="text-black/60 text-lg md:text-xl leading-relaxed font-sans mb-10">
                  {project.description}
                </p>
                <div className={`flex flex-wrap gap-3 ${isEven ? '' : 'justify-end'}`}>
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-mono uppercase tracking-widest text-black/40 border border-black/5 px-4 py-2 rounded-full bg-black/[0.02]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link 
                to={`/selected-work/${project.slug}`}
                className="inline-flex items-center gap-6 group/link"
              >
                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover/link:bg-black group-hover/link:text-white transition-all duration-500">
                  <span className="text-xl">↗</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-black group-hover/link:translate-x-2 transition-transform duration-500">
                  Explore Operation
                </span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
