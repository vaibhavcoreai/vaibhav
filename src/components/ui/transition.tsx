import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Transition({
  introDuration = 1.5,
  transitionDuration = 1.0,
  type = 'curved',
  direction = 'bottom',
  autoExit = true,
  className = '',
  containerClassName = 'min-h-[87.5vh] rounded-[2rem] border border-white/5 bg-[#151515]',
  intro,
  children,
}: any) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setShowIntro(true);
    if (autoExit) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, introDuration * 1000);
      return () => clearTimeout(timer);
    }
  }, [introDuration, autoExit]);

  const variants = {
    initial: { 
      top: 0, 
      borderBottomLeftRadius: '0%', 
      borderBottomRightRadius: '0%' 
    },
    exit: { 
      top: direction === 'bottom' ? '-100%' : '100%', 
      borderBottomLeftRadius: type === 'curved' ? '100%' : '0%', 
      borderBottomRightRadius: type === 'curved' ? '100%' : '0%',
      transition: { 
        duration: transitionDuration, 
        ease: [0.76, 0, 0.24, 1] 
      }
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className={`absolute inset-0 z-50 flex items-center justify-center shadow-2xl origin-top ${className}`}
            initial="initial"
            exit="exit"
            variants={variants}
          >
            {intro}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
