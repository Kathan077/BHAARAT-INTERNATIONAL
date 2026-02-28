import React, { useRef, useState, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import './AboutHero.css';

const AboutHero = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  /* ── Smooth Spring Motion ── */
  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  /* ── Background Parallax ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Normalized Mouse Position (-0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Update Springs for 3D Tilt & Parallax
    rotateX.set(-y * 25); // Vertical tilt
    rotateY.set(x * 25);  // Horizontal tilt
    springX.set(x * 60);  // Background shift
    springY.set(y * 60);

    setMousePos({ x: (clientX - left) / width, y: (clientY - top) / height });
  }, [rotateX, rotateY, springX, springY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    springX.set(0);
    springY.set(0);
  }, [rotateX, rotateY, springX, springY]);

  /* ── Mask Reveal Variants ── */
  const maskReveal = {
    hidden: { y: "110%", skewY: 10 },
    visible: (i) => ({
      y: "0%",
      skewY: 0,
      transition: { 
        duration: 1, 
        delay: 0.4 + i * 0.1, 
        ease: [0.22, 1, 0.36, 1] 
      },
    }),
  };

  const subtitleText = "GLOBAL EXCELLENCE SINCE 2020";
  const titleWords = ["About", "Us"];

  return (
    <section 
      className="about-hero" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background Layer ── */}
      <motion.div 
        className="about-hero__bg-container"
        style={{ y: yBg, scale: scaleBg, opacity: opacityHero }}
      >
        <motion.img 
          src="/about-hero-bg.jpg" 
          alt="Bhaarat International Global Logistics" 
          className="about-hero__bg-img"
          style={{ x: springX, y: springY }}
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2070'; }}
        />
        <div className="about-hero__vignette" />
        
        {/* Particle/Grid Effect */}
        <div className="about-hero__grid-overlay" />
        
        {/* Dynamic Light Sweep */}
        <motion.div 
          className="about-hero__sweep"
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
            background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.4) 0%, transparent 50%)`
          }}
        />
      </motion.div>
      
      {/* ── Content Layer (3D Perspective) ── */}
      <div className="container about-hero__perspective">
        <motion.div
           ref={cardRef}
           style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
           className="about-hero__glass-card"
        >
          {/* Subtitle with Mask */}
          <div className="about-hero__mask">
            <motion.span 
              className="about-hero__premium-label"
              variants={maskReveal}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {subtitleText}
            </motion.span>
          </div>
          
          {/* Title with Mask Reveal */}
          <div className="about-hero__title-wrap">
            {titleWords.map((word, wIdx) => (
              <div key={wIdx} className="about-hero__mask">
                <motion.h1 
                  className={`about-hero__pro-title ${wIdx === 1 ? 'accent' : ''}`}
                  variants={maskReveal}
                  initial="hidden"
                  animate="visible"
                  custom={wIdx + 1}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>
          
          <motion.div 
            className="about-hero__premium-line"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "circOut" }}
          />

          {/* Depth Elements */}
          <div className="about-hero__depth-glow" />
        </motion.div>
      </div>

      {/* Decorative Blur Orbs */}
      <div className="about-hero__orb about-hero__orb--1" />
      <div className="about-hero__orb about-hero__orb--2" />
    </section>
  );
};

export default AboutHero;
