import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import React, { useState, useRef } from 'react';

export default function NavBar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      setHidden(false);
      return;
    }
    
    if (latest > lastScrollY.current && latest > 150) {
      setHidden(true);
    } else if (latest < lastScrollY.current) {
      setHidden(false);
    }
    
    lastScrollY.current = latest;
  });

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      variants={{
        visible: { y: 0, x: "-50%", opacity: 1 },
        hidden: { y: 100, x: "-50%", opacity: 0 }
      }}
      initial={{ y: 50, x: "-50%", opacity: 0 }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="nav-dock-container"
    >
      <div className="nav-dock-profile">
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
          <img 
            src="https://res.cloudinary.com/dfonotyfb/image/upload/v1775586663/dp_iutq1b.png" 
            alt="Profile" 
          />
        </a>
      </div>
      
      <div className="nav-dock-links">
        <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="nav-dock-link">Home</a>
        <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="nav-dock-link">About</a>
        <a href="#my-vibe" onClick={(e) => scrollToSection(e, 'my-vibe')} className="nav-dock-link">Playground</a>
      </div>

      <a 
        href="https://github.com/vaibhavcoreai" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="nav-dock-connect"
      >
        Connect <span>+</span>
      </a>
    </motion.nav>
  );
}
