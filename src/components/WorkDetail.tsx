import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { selectedWorks } from '../data/works';
import Footer from './Footer';

export default function WorkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const work = selectedWorks.find(w => w.slug === id);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Hero Parallax & Scale
  const heroY = useTransform(scrollYProgress, [0, 0.2], ['0%', '30%']);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    if (!work) {
      navigate('/selected-work');
    }
    window.scrollTo(0, 0);
  }, [work, navigate]);

  if (!work) return null;

  const nextWork = selectedWorks[(selectedWorks.indexOf(work) + 1) % selectedWorks.length];

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#ededed] min-h-screen">
      {/* Editorial Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-10 flex justify-between items-center mix-blend-difference">
        <Link to="/selected-work" className="group flex items-center gap-4 no-underline">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
            <span className="font-mono text-xs">←</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">Archive</span>
        </Link>
        <div className="hidden md:flex gap-16 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
          <span>{work.id} / 03</span>
          <span>Role: Lead Dev</span>
        </div>
      </nav>

      {/* Immersive Hero Section */}
      <section className="relative h-screen overflow-hidden hero-new flex items-center justify-center text-center">
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src={work.heroImage}
            alt={work.title}
            className="w-full h-full object-cover grayscale brightness-[0.2] opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
        </motion.div>

        <div className="relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-blue-500 font-mono text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase block mb-6 md:mb-10">{work.client}</span>
            <h1 className="font-serif text-5xl md:text-8xl lg:text-[14rem] leading-[0.9] md:leading-[0.8] mb-8 md:mb-12 tracking-tighter">
              {work.title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'italic opacity-50 font-light' : ''}>{word} </span>
              ))}
            </h1>
          </motion.div>
        </div>

        {/* Scroll Line */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-16 md:h-24 bg-gradient-to-b from-white/20 to-transparent" />
      </section>

      {/* Narrative & Data Spread */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-48 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">
        <div className="lg:col-span-5 space-y-16 md:space-y-24 lg:sticky lg:top-40">
          <div data-scroll="fade-up">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/20 mb-6 md:mb-8 flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Executive Summary
            </h4>
            <p className="font-serif text-2xl md:text-3xl lg:text-5xl italic text-white/90 leading-tight">
              {work.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12" data-scroll="fade-up">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/20 mb-4 md:mb-6">Stack</h4>
              <ul className="space-y-2 md:space-y-3">
                {work.tech.map(t => (
                  <li key={t} className="font-mono text-[8px] md:text-[10px] text-white/60 uppercase tracking-widest">{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/20 mb-4 md:mb-6">Innovations</h4>
              <ul className="space-y-2 md:space-y-3">
                {work.features.slice(0, 3).map(f => (
                  <li key={f} className="font-mono text-[8px] md:text-[10px] text-white/60 uppercase tracking-widest line-clamp-1 md:line-clamp-none">• {f}</li>
                ))}
              </ul>
            </div>
          </div>

          <motion.a
            href={work.link}
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center justify-center lg:justify-start gap-4 md:gap-8 py-4 md:py-6 px-8 md:px-12 bg-white text-black font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-full hover:bg-blue-500 hover:text-white transition-all duration-700 shadow-2xl w-full lg:w-auto"
          >
            Live Experience <span className="text-lg">↗</span>
          </motion.a>
        </div>

        <div className="lg:col-span-7 space-y-24 md:space-y-48 mt-12 lg:mt-0">
          <div data-scroll="fade-up">
            <span className="font-mono text-[10px] text-blue-500 mb-6 md:mb-10 block uppercase tracking-[0.4em] md:tracking-[0.5em]">Phase 01 / Strategy</span>
            <p className="font-sans text-lg md:text-2xl lg:text-3xl leading-relaxed text-white/50">
              {work.longDescription}
            </p>
          </div>

          {/* Interface Display */}
          <div className="relative group" data-scroll="scale-in">
            <div className="absolute -inset-4 bg-blue-500/10 blur-[60px] md:blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 p-3 md:p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3 md:mb-6 px-2 md:px-4">
                <div className="flex gap-1 md:gap-2">
                  <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-green-500/50" />
                </div>
                <span className="font-mono text-[6px] md:text-[8px] uppercase tracking-[0.3em] text-white/30 truncate">prod_v01.enc</span>
              </div>
              <img
                src={work.image}
                alt="Production Detail"
                className="w-full h-auto rounded-lg md:rounded-2xl grayscale brightness-110 contrast-110 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
              />
            </div>
          </div>

          <div data-scroll="fade-up">
            <span className="font-mono text-[10px] text-blue-500 mb-6 md:mb-10 block uppercase tracking-[0.5em]">Phase 02 / Refinement</span>
            <div className="space-y-8 md:space-y-12">
              {work.features.map((feature, i) => (
                <div key={i} className="flex gap-6 md:gap-12 group border-t border-white/5 pt-8 md:pt-12">
                  <span className="font-serif italic text-2xl md:text-4xl text-white/10 group-hover:text-blue-500 transition-colors duration-500">0{i + 1}</span>
                  <p className="font-sans text-base md:text-xl text-white/70 leading-relaxed max-w-xl">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Cinematic Transition */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ backgroundColor: "#050505" }}
          whileInView={{ backgroundColor: "#f8f9fa" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ margin: "-10%" }}
          className="py-40 md:py-80 text-center"
        >
          <div className="max-w-7xl mx-auto px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] md:tracking-[0.8em] text-black/20 block mb-8 md:mb-16">Next Discovery</span>
            <Link
              to={`/selected-work/${nextWork.slug}`}
              className="group inline-block"
            >
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="font-serif text-4xl md:text-7xl lg:text-[14rem] text-black leading-none group-hover:italic transition-all duration-1000 tracking-tighter"
              >
                {nextWork.title}
              </motion.h2>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
