import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './AboutStory.css';

const AboutStory = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Mega smooth springs for cinematic feel
  const springConfig = { stiffness: 45, damping: 25, restDelta: 0.001 };
  
  const yWatermark = useSpring(useTransform(scrollYProgress, [0, 1], [-150, 150]), springConfig);
  const yMainImg = useSpring(useTransform(scrollYProgress, [0, 1], [80, -80]), springConfig);
  const yFloatCard = useSpring(useTransform(scrollYProgress, [0, 1], [150, -150]), springConfig);
  const rotateImg = useSpring(useTransform(scrollYProgress, [0, 1], [-3, 3]), springConfig);

  const titleWords = "Crafting the Future of Precision".split(" ");

  const wordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { 
        duration: 1.2, 
        delay: i * 0.15, 
        ease: [0.165, 0.84, 0.44, 1] 
      }
    })
  };

  const textStagger = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, delay: 0.8 + (i * 0.25), ease: [0.165, 0.84, 0.44, 1] }
    })
  };

  return (
    <section className="about-story-pro" ref={containerRef}>
      {/* ── Background Watermark ── */}
      <motion.div 
        className="story-watermark"
        style={{ y: yWatermark }}
      >
        EXCELLENCE
      </motion.div>

      <div className="container story-grid-pro">
        <div className="story-content-pro">
          <motion.div 
            className="pro-accent-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.165, 0.84, 0.44, 1] }}
          />
          
          <h2 className="pro-section-title">
            {titleWords.map((word, i) => (
              <span key={i} className="word-wrap">
                <motion.span
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className={word.toLowerCase() === "future" ? "accent" : ""}
                >
                  {word}
                </motion.span>
                {i !== titleWords.length - 1 && "\u00A0"}
              </span>
            ))}
          </h2>

          <div className="pro-description">
            {[
              "Our story began in 2020 with a single, uncompromising goal: to bridge the gap between artisanal craftsmanship and medical-grade precision.",
              "Today, Bhaarat International stands as a global beacon of reliability, serving over 40 countries with instruments that are as much works of art as they are surgical tools.",
              "We believe that every cut matters, every stitch counts, and every life saved is a testament to the tools used by heroes."
            ].map((text, i) => (
              <motion.p 
                key={i}
                custom={i}
                variants={textStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div 
            className="pro-stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.8
                }
              }
            }}
          >
            {[
              { num: '40+', label: 'NATIONS' },
              { num: '5k+', label: 'SURGEONS' },
              { num: '100%', label: 'PRECISION' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="pro-stat-item"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <span className="num">{stat.num}</span>
                <span className="label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="story-visuals-pro">
          {/* Main Image Layer */}
          <motion.div 
            className="pro-main-img-wrap"
            style={{ y: yMainImg, rotate: rotateImg }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: [0.165, 0.84, 0.44, 1] }}
          >
            <img 
              src="/story-main.jpg" 
              alt="Elite Precision Instruments" 
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000'}
            />
            <div className="pro-img-overlay" />
          </motion.div>

          {/* Floating Glass Card */}
          <motion.div 
            className="pro-float-glass"
            style={{ y: yFloatCard }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 1.5, ease: [0.165, 0.84, 0.44, 1] }}
          >
            <div className="glass-inner">
              <div className="glass-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h5>Global Standard</h5>
              <p>Hand-finished in our specialized facility for ISO-certified excellence.</p>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div 
            className="pro-dot-pattern" 
            initial={{ opacity: 0, rotate: -45 }}
            whileInView={{ opacity: 0.4, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
