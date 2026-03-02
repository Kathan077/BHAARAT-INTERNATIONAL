import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useSpring, animate } from 'framer-motion';
import './Skills.css';

const skills = [
  { label: 'Surgical Instrument Quality', value: 98, color: '#0056b3' },
  { label: 'Orthopedic Implant Precision', value: 95, color: '#17a2b8' },
  { label: 'International Export Expertise', value: 92, color: '#0ea5e9' },
  { label: 'ISO Compliance & Certification', value: 99, color: '#138808' },
  { label: 'Customer Satisfaction Rate',    value: 97, color: '#f97316' },
];

const extras = [
  { value: '25+', label: 'Years Experience' },
  { value: '40+', label: 'Countries Exported' },
  { value: '500+', label: 'Healthcare Partners' },
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

/* Single skill bar */
const SkillBar = ({ label, value, color, index, inView }) => (
  <motion.div
    className="sk__bar-wrap"
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.25 + index * 0.12, duration: 0.55, ease: 'easeOut' }}
    whileHover={{ x: 6, transition: { duration: 0.2 } }}
  >
    <div className="sk__bar-header">
      <span className="sk__bar-label">{label}</span>
      <span className="sk__bar-pct" style={{ color }}>
        <AnimatedPercent target={value} inView={inView} />
      </span>
    </div>

    {/* Track */}
    <div className="sk__track">
      {/* Animated fill */}
      <motion.div
        className="sk__fill"
        style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ delay: 0.3 + index * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Glowing tip */}
      <motion.div
        className="sk__tip"
        style={{ background: color, boxShadow: `0 0 10px 3px ${color}66` }}
        initial={{ left: 0 }}
        animate={inView ? { left: `calc(${value}% - 6px)` } : { left: 0 }}
        transition={{ delay: 0.3 + index * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.3, boxShadow: `0 0 15px 5px ${color}aa` }}
      />
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
            <span className="sk__eyebrow-line" />
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
            Over two decades of expertise in precision medical manufacturing,
            global exports, and ISO-certified quality assurance — delivering
            healthcare solutions that professionals trust.
          </motion.p>

          {/* Skill bars */}
          <div className="sk__bars">
            {skills.map((s, i) => (
              <SkillBar key={s.label} {...s} index={i} inView={inView} />
            ))}
          </div>

          {/* Mini stats row */}
          <motion.div
            className="sk__mini-stats"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {extras.map(({ value, label }) => (
              <motion.div
                key={label}
                className="sk__mini-stat"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <span className="sk__mini-val">{value}</span>
                <span className="sk__mini-label">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: image ── */}
        <motion.div
          className="sk__right"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltFrame className="sk__img-frame">
            <img src="/skills.png" alt="Quality inspection of medical instruments" className="sk__img" />

            {/* Floating card */}
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
              <div className="sk__float-ring" />
              <div className="sk__float-content">
                <span className="sk__float-val">99%</span>
                <span className="sk__float-label">Quality Pass Rate</span>
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
