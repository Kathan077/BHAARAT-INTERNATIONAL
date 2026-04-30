import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useSpring, animate } from 'framer-motion';
import './Skills.css';

const skills = [
  { 
    label: 'Global Export Network', 
    description: 'Extensive reach across international markets with optimized supply chain logistics.',
    color: 'var(--primary-blue)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )
  },
  { 
    label: 'Import & Distribution', 
    description: 'Seamless import processes and efficient local distribution networks for medical supplies.',
    color: 'var(--accent-teal)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8V21H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/>
      </svg>
    )
  },
  { 
    label: 'International Export Expertise', 
    description: 'Specialized knowledge in global trade regulations and healthcare export standards.',
    color: 'var(--accent-blue)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
 
  { 
    label: 'Customer Logistics Support', 
    description: 'Dedicated support for tracking, documentation, and end-to-end delivery satisfaction.',
    color: '#d97706',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    )
  },
];



/* ── 3D Tilt Frame (Agency Level) ── */
const TiltFrame = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const springX = useSpring(0, { stiffness: 180, damping: 20 });
  const springY = useSpring(0, { stiffness: 180, damping: 20 });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 18;
    const y = ((e.clientY - top)  / height - 0.5) * 14;
    springX.set(y);
    springY.set(-x);
    setTilt({ x, y });
  }, [springX, springY]);

  const onLeave = useCallback(() => {
    springX.set(0);
    springY.set(0);
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  }, [springX, springY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={`sk__tilt-frame ${className} ${hovered ? 'sk__tilt-frame--hovered' : ''}`}
    >
      {children}
      <div
        className="sk__shine"
        style={{
          background: `radial-gradient(circle at ${50 + tilt.x * 2.5}% ${50 + tilt.y * 2.5}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
};

/* Animated number for % */
const AnimatedPercent = ({ target, inView }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, target, {
      duration: 1.5,
      onUpdate: (value) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.floor(value) + '%';
        }
      },
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [inView, target]);

  return <span ref={nodeRef}>0%</span>;
};

/* Single skill card */
const SkillCard = ({ label, description, color, icon, index, inView }) => (
  <motion.div
    className="sk__card"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
  >
    <div className="sk__card-icon-wrap" style={{ '--icon-color': color }}>
      <div className="sk__card-icon">{icon}</div>
      <div className="sk__card-glow" />
    </div>
    
    <div className="sk__card-content">
      <h3 className="sk__card-label">{label}</h3>
      <p className="sk__card-description">{description}</p>
    </div>
  </motion.div>
);

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });


  return (
    <section className="sk" id="skills" ref={ref}>
      {/* Background watermark */}
      <div className="sk__watermark" aria-hidden="true">
        {"Skills".split("").map((letter, index) => (
          <span 
            key={index} 
            className="sk__watermark-letter"
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="container sk__grid">

        {/* ── Left: content ── */}
        <div className="sk__left">
          {/* Eyebrow */}
          <motion.div
            className="sk__eyebrow"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Expertise Areas
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="sk__heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55 }}
          >
            Our <span className="sk__heading-accent">Skills</span>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="sk__tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
           Over two decades of expertise in precision medical solutions and pharmaceutical supply, with global exports of surgical products and rigorous quality assurance delivering healthcare solutions trusted by professionals worldwide
          </motion.p>

          {/* Skill cards grid */}
          <div className="sk__cards">
            {skills.map((s, i) => (
              <SkillCard key={s.label} {...s} index={i} inView={inView} />
            ))}
          </div>


        </div>

        {/* ── Right: image ── */}
        <motion.div
          className="sk__right"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltFrame className="sk__img-frame">
            <img src="https://media.licdn.com/dms/image/v2/D5612AQETOlWhNKWkYg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721594484828?e=2147483647&v=beta&t=L7tviVgY_t7ck5PFyv5kQD3m-xcsVWYidvYU5YWObQ8" alt="Quality inspection of medical instruments" className="sk__img" />

            {/* Floating info card */}
            <motion.div
              className="sk__float-card"
              initial={{ opacity: 0, y: 20, scale: 0.85 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.45, type: 'spring', stiffness: 180 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(0, 86, 179, 0.35)',
                transition: { duration: 0.2 }
              }}
            >
              <div className="sk__float-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div className="sk__float-content">
                <span className="sk__float-val">Verified</span>
                <span className="sk__float-label">Global Standards</span>
              </div>
            </motion.div>

            {/* Dots decoration */}
            <div className="sk__dots-deco" />
          </TiltFrame>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
