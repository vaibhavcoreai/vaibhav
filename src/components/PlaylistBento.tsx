import React from 'react';
import { motion } from 'motion/react';

export default function PlaylistBento() {
  return (
    <section className="w-full bg-[#f0f0f0] py-16 md:py-24 flex justify-center items-center font-sans">
      <div className="max-w-[1100px] w-full px-4 md:px-6">
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-black mb-2">Current Rotation</h2>
          <p className="text-black/50 tracking-wide uppercase text-xs md:text-sm">What's playing in the background</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          
          {/* Card 1: Khat */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col"
          >
            <div className="w-full h-[120px] sm:h-[160px] md:h-[220px] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
              <img 
                src="https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ea/01/29/ea012994-51e8-6883-e1e1-c71fdd51754f/5026854264479.jpg/600x600bb.jpg" 
                alt="Khat Album Cover" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="text-center px-2 md:px-4 mt-auto mb-2 md:mb-4">
              <h3 className="font-serif text-base md:text-2xl text-black mb-1 md:mb-2 leading-tight">Khat</h3>
              <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-black/40">Navjot Ahuja</p>
            </div>
          </motion.div>

          {/* Card 2: Ocean */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col"
          >
            <div className="w-full h-[120px] sm:h-[160px] md:h-[220px] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 relative">
              <img 
                src="https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e3/7b/f8/e37bf8d3-268f-a555-f713-480f4e8f69c1/23UM1IM18506.rgb.jpg/600x600bb.jpg" 
                alt="Ocean Playlist Cover" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <button className="absolute bottom-2 md:bottom-4 right-2 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </button>
            </div>
            <div className="text-center px-2 md:px-4 mt-auto mb-2 md:mb-4">
              <h3 className="font-serif text-base md:text-2xl text-black mb-1 md:mb-2 leading-tight">Ocean</h3>
              <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-black/40">Anuv Jain</p>
            </div>
          </motion.div>

          {/* Card 3: Kahe mose */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 flex flex-col col-span-2 lg:col-span-1"
          >
            <div className="w-full h-[140px] sm:h-[180px] md:h-[220px] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
              <img 
                src="https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f5/b8/a8/f5b8a8d3-c54a-20c8-b178-bc304a72d6eb/8903431130129_cover.jpg/600x600bb.jpg" 
                alt="Kahe mose Album Cover" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="text-center px-2 md:px-4 mt-auto mb-2 md:mb-4">
              <h3 className="font-serif text-xl md:text-2xl text-black mb-1 md:mb-2 leading-tight">Kahe mose</h3>
              <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-black/40">Garvit-Priyansh</p>
            </div>
          </motion.div>

          {/* Card 4: Player 2 (Landscape) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-4 col-span-2 flex flex-col md:flex-row gap-4 md:gap-8 items-center"
          >
            <div className="w-full md:w-[220px] h-[140px] md:h-[220px] rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0">
              <img 
                src="https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/9d/0d/a9/9d0da968-2da7-9850-2100-df1abdd32564/mzi.doaajgfk.jpg/600x600bb.jpg" 
                alt="Caribbean Blue Album Cover" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            <div className="flex-1 w-full px-2 md:px-8 py-2 md:py-4">
              <div className="mb-2 md:mb-6 text-center md:text-left">
                <h3 className="font-serif text-2xl md:text-4xl text-black mb-1 md:mb-3 leading-tight">Caribbean Blue</h3>
                <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-black/40">Enya</p>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Stats & Track */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 shadow-sm rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex min-h-[160px] md:min-h-[252px] col-span-2 lg:col-span-1"
          >
            {/* Track Full Width */}
            <div className="w-full relative group cursor-pointer p-3 md:p-4">
              <div className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative">
                <img 
                  src="https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c5/3d/97/c53d978b-4433-743e-7a4b-e01942cd33ee/00602517784154.rgb.jpg/600x600bb.jpg" 
                  alt="Track" 
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="relative h-full flex flex-col justify-end p-4 md:p-6">
                  <h3 className="font-serif text-xl md:text-3xl text-white mb-1 md:mb-2 leading-tight">Lay all your love</h3>
                  <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-widest text-white/70">ABBA</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
