import { Linkedin, Github, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <section id="contact" data-glow="entry" className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pb-32">
      {/* Subtle dividing line */}
      <div className="absolute top-0 w-full h-[1px] bg-current opacity-10" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end h-full mt-auto">
        
        <div data-scroll="fade-up" className="flex flex-col items-center md:items-start mb-12 md:mb-0">
          <div className="mb-8">
            <span className="font-serif italic text-[60px] md:text-[120px] leading-[1] block md:-ml-2">
              Thank You.
            </span>
          </div>

          <p className="font-mono text-sm md:text-sm opacity-90 max-w-sm font-medium mb-4 pr-4 text-center md:text-left leading-relaxed">
            I may not have all the algorithms tuned yet, <br className="hidden md:block" />
            But I have the compute to train them with you. <br className="hidden md:block" />
            My best model is always the next one.
          </p>
          <p className="font-serif font-bold text-xl md:text-2xl mt-4">
            Let's make it yours.
          </p>

          <div className="flex gap-6 mt-8">
            <a href="https://github.com/vaibhavcoreai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-current opacity-60 hover:opacity-100 flex items-center justify-center transition-all">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/vaibhav-manaji/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-current opacity-60 hover:opacity-100 flex items-center justify-center transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/vaibhav.wav/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-current opacity-60 hover:opacity-100 flex items-center justify-center transition-all">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>



      </div>
    </section>
  );
}
