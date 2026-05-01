import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate home first then scroll (or just navigate home)
      return; // Link to="/" handles it
    }
    
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
        <Link to="/" onClick={(e) => handleNavClick(e, 'home')}>
          <img 
            src="https://res.cloudinary.com/dfonotyfb/image/upload/v1775586663/dp_iutq1b.png" 
            alt="Profile" 
          />
        </Link>
      </div>
      
      <div className="nav-dock-links">
        <Link to="/" onClick={(e) => handleNavClick(e, 'home')} className="nav-dock-link">Home</Link>
        <Link to="/" onClick={(e) => handleNavClick(e, 'about')} className="nav-dock-link">About</Link>
        <Link to="/" onClick={(e) => handleNavClick(e, 'my-vibe')} className="nav-dock-link">Playground</Link>
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
