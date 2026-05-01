import { useState } from 'react';
import { Transition } from './ui/transition';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

export default function TransitionDemo() {
  const [key, setKey] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleReload = () => {
    setRotate(true);
    setKey((prev) => prev + 1);
    // Restart animation hook logic
    setTimeout(() => setRotate(false), 600);
  };

  return (
    <section className="w-full bg-[#0a0a0a] py-24" id="playground">
      <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h2 className="font-mono text-sm tracking-widest opacity-40 uppercase text-white">Playground</h2>
        <p className="font-serif italic text-3xl mt-4 text-white">ScrollX UI Experiments</p>
      </div>

      <div className='relative w-full min-h-[87.5vh] flex items-center justify-center'>
        <Transition
          key={key}
          introDuration={1.5}
          transitionDuration={1.0}
          type='curved'
          direction='bottom'
          autoExit
          className='bg-[#0a0a0a] text-white'
          containerClassName="min-h-[87.5vh] w-full bg-[#0a0a0a]"
          intro={
            <div className='flex flex-col items-center justify-center h-full w-full relative overflow-hidden bg-[#0a0a0a]'>
              {/* Background aesthetic image for the curtain */}
              <img 
                src="/myart/sitar.jpg" 
                alt="Curtain Background" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 mix-blend-multiply" 
              />
              <div className="relative z-10 text-center">
                <h1 className='text-4xl md:text-7xl font-serif italic text-white'>
                  Musical Roots
                </h1>
                <p className='mt-6 text-xs font-mono tracking-[0.2em] uppercase text-white/60'>
                  Instruments of my soul
                </p>
              </div>
            </div>
          }
        >
          <div className='flex flex-col items-center justify-center min-h-[87.5vh] w-full space-y-12 px-6 py-12'>
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Flute */}
              <div className="w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src="/myart/flute.jpg" 
                  alt="Bansuri" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="absolute bottom-8 left-8 text-2xl md:text-3xl font-serif text-white tracking-wide">Bansuri</h3>
              </div>
              
              {/* Harmonium */}
              <div className="w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative group md:translate-y-8">
                <img 
                  src="/myart/harmonium.jpg" 
                  alt="Harmonium" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="absolute bottom-8 left-8 text-2xl md:text-3xl font-serif text-white tracking-wide">Harmonium</h3>
              </div>

              {/* Sitar */}
              <div className="w-full aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src="/myart/sitar.jpg" 
                  alt="Sitar" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="absolute bottom-8 left-8 text-2xl md:text-3xl font-serif text-white tracking-wide">Sitar</h3>
              </div>
            </div>

            <div className="text-center mt-12 md:mt-20">
              <h2 className='text-3xl md:text-5xl font-serif text-white leading-tight'>
                The rhythm of
                <br />
                <span className="italic opacity-60">Indian classical.</span>
              </h2>
            </div>

            <Button
              onClick={handleReload}
              variant='outline'
              className='flex items-center space-x-3 rounded-full border-white/20 hover:bg-white hover:text-black transition-all px-6 py-6'
            >
              <motion.div
                animate={{ rotate: rotate ? 360 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <RefreshCw className='w-4 h-4' />
              </motion.div>
              <span className="font-mono text-[10px] uppercase tracking-widest pt-0.5">Replay Transition</span>
            </Button>
          </div>
        </Transition>
      </div>
      </div>
    </section>
  );
}
