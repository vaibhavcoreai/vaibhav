import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ shouldAnimate }: { shouldAnimate: boolean }) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleSoundToggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/background.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (isSoundOn) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsSoundOn(!isSoundOn);
  };

  const nameVariants = {
    hidden: (x: number) => ({ opacity: 0, x }),
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="home" className="hero-new">
      {/* Header Controls (Top Right) */}
      <div className="absolute top-8 md:top-12 right-6 md:right-12 z-50 flex flex-col items-end gap-3 md:gap-4">
        {/* Sound Toggle */}
        <button 
          className="hero-sound-toggle cursor-pointer border-none bg-transparent text-white"
          onClick={handleSoundToggle}
        >
          <div className="flex gap-0.5 items-end h-3">
            {[0.4, 0.8, 0.6, 0.9, 0.5].map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: isSoundOn ? [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] : '10%' }}
                transition={{ repeat: isSoundOn ? Infinity : 0, duration: 1, delay: i * 0.1 }}
                className="w-px bg-white"
              />
            ))}
          </div>
          <span>{isSoundOn ? 'Sound is on' : 'Turn the sound on'}</span>
        </button>

        {/* Selected Projects Link */}
        <Link 
          to="/selected-work"
          className="hero-sound-toggle cursor-pointer bg-transparent text-white no-underline flex items-center justify-between gap-4 group hover:bg-white/5 transition-all duration-300"
          style={{ width: 'fit-content', border: '1px solid #ffffff', padding: '0.6rem 1rem' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest translate-y-[1px]">Selected Projects</span>
          <span className="font-mono text-[10px] group-hover:translate-x-1 transition-transform">↗</span>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="hero-content-wrapper">
        <div className="hero-name-container">
          {/* Parash */}
          <motion.div 
            initial="hidden"
            custom={-30}
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={nameVariants}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="hero-name-line"
          >
            <span className="name-stylized">V</span>
            <span className="name-regular">aibhav</span>
          </motion.div>

          {/* Rautela */}
          <motion.div 
            initial="hidden"
            custom={30}
            animate={shouldAnimate ? "visible" : "hidden"}
            variants={nameVariants}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="hero-name-line hero-name-line--rautela"
          >
            <span className="name-stylized">M</span>
            <span className="name-regular">anaji.</span>
          </motion.div>

          {/* Bio Text to the right */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-bio-text"
          >
            Exploring Data Science, AI & Psychology. Somewhere between code and consciousness. Building at the intersection of machines and the human mind. Based in Maharashtra.
          </motion.p>
        </div>
      </div>

      {/* Bottom Right: Rocket */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={shouldAnimate ? { y: 0, opacity: 0.6 } : { y: 100, opacity: 0 }}
        transition={{ duration: 2, delay: 1, ease: "easeOut" }}
        className="hero-rocket"
      >
        <img 
          src="/hero_rocket.png" 
          alt="Rocket trail" 
          className="w-full h-auto mix-blend-screen"
        />
      </motion.div>

      {/* Bottom Center: Keep Scrolling Indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 2 }}
      >
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-mouse-dot" />
        </div>
        <span className="hero-scroll-text">Keep Scrolling</span>
      </motion.div>
    </section>
  );
}
