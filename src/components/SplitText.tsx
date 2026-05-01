import { motion } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: any;
  splitType?: 'chars' | 'words';
  from?: any;
  to?: any;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 0.8,
  ease = [0.22, 1, 0.36, 1],
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  tag: Tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete
}: SplitTextProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: delay / 1000,
        onComplete: onLetterAnimationComplete
      }
    }
  };

  const itemVariants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration: duration,
        ease: ease
      }
    }
  };

  return (
    <Tag
      ref={containerRef as any}
      className={`split-parent inline-block w-full ${className}`}
      style={{ textAlign }}
    >
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="inline-block"
      >
        {items.map((item, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block whitespace-pre"
          >
            {item === ' ' ? '\u00A0' : item}
            {splitType === 'words' && i !== items.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
