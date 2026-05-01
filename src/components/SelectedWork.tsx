import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { selectedWorks, WorkItem } from '../data/works';

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Parallax for header background
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0]);

  const featuredWork = selectedWorks[0];

  return (
    <div ref={containerRef} className="bg-[#0e0e0e] text-[#ededed] min-h-screen">
      {/* Header Section with Immersive Background */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Cinematic Background Image */}
        <motion.div 
          style={{ y: bgY, opacity: bgOpacity }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={featuredWork.heroImage} 
            alt="Archive Background" 
            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0e0e0e]/60 to-[#0e0e0e]" />
          {/* Scanline Overlay to match ProjectShowcase */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
        </motion.div>
        
        <Link 
          to="/" 
          className="absolute top-12 left-12 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors flex items-center gap-2 group z-10"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Return Home
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <span className="text-blue-500 font-mono text-[10px] tracking-[0.6em] uppercase block mb-8">Production Archive</span>
          <h1 className="font-serif text-7xl md:text-[10rem] mb-8 leading-[0.85] tracking-tighter">
            Selected<br/><span className="italic opacity-60 font-light text-white">Projects.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/50 leading-relaxed font-sans text-lg md:text-xl italic border-l border-white/10 pl-8 md:pl-12">
            Engineering intelligence through code and aesthetics. A collection of academic and personal projects built with precision.
          </p>
        </motion.div>

        {/* Technical Data Overlay (Top Right) */}
        <div className="absolute top-12 right-12 hidden md:flex flex-col items-end gap-2 z-10 opacity-40">
          <span className="font-mono text-[8px] uppercase tracking-widest">Archive_Status: Online</span>
          <span className="font-mono text-[8px] uppercase tracking-widest">Latent_Space: {featuredWork.coordinates}</span>
        </div>

        {/* Scroll Line */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/20 to-transparent z-10" />
      </section>

      {/* Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {selectedWorks.map((work, index) => (
            <BentoCard key={work.id} work={work} index={index} />
          ))}
        </div>
      </section>

      {/* Contact Trigger with Theme Transition */}
      <section className="relative overflow-hidden">
        {/* Animated Background Overlay */}
        <motion.div 
          initial={{ backgroundColor: "#0e0e0e" }}
          whileInView={{ backgroundColor: "#f8f9fa" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ margin: "-10%" }}
          className="py-48 text-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl mx-auto px-6"
          >
            <motion.h2 
              initial={{ color: "#ffffff" }}
              whileInView={{ color: "#000000" }}
              transition={{ duration: 1.5 }}
              className="font-serif text-5xl md:text-9xl mb-12 leading-tight"
            >
              Next Project?
            </motion.h2>
            <a 
              href="mailto:hi@vaibhav.wav" 
              className="inline-block py-6 px-12 border-2 border-black text-black font-serif italic text-2xl hover:bg-black hover:text-white transition-all duration-500 rounded-full"
            >
              Let's build it together.
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

function BentoCard({ work, index }: { work: WorkItem; index: number }) {
  // Logic for bento spans based on index
  const spanClasses = [
    'col-span-2 md:col-span-2 lg:col-span-8 lg:row-span-2', // Large Feature
    'col-span-1 md:col-span-2 lg:col-span-4 lg:row-span-2', // Tall Side
    'col-span-1 md:col-span-4 lg:col-span-12 lg:row-span-2', // Ultra Wide
  ][index % 3];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity, y }}
      className={`relative rounded-2xl md:rounded-3xl overflow-hidden group bg-white/5 border border-white/10 ${spanClasses}`}
    >
      <Link to={`/selected-work/${work.slug}`} className="block h-full w-full relative">
        {/* Background Image */}
        <img 
          src={work.image} 
          alt={work.title}
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 md:group-hover:grayscale-0 md:group-hover:scale-105 md:group-hover:brightness-100 transition-all duration-1000"
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 p-4 md:p-8 lg:p-12 flex flex-col justify-end">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4 opacity-60">
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] text-white">{work.id}</span>
            <div className="h-px w-4 md:w-6 bg-white/20" />
            <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-white truncate">{work.client}</span>
          </div>

          <h3 className="font-serif text-xl md:text-4xl lg:text-6xl text-white mb-2 md:mb-6 leading-tight md:group-hover:italic transition-all duration-500">
            {work.title}
          </h3>

          <div className="flex flex-wrap gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {work.tags.map(tag => (
              <span key={tag} className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[8px] font-mono text-white/80 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-white text-lg">↗</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
