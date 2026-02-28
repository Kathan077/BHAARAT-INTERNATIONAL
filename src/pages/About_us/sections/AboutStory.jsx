import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import './AboutStory.css';

const AboutStory = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth springs for parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const yWatermark = useSpring(useTransform(scrollYProgress, [0, 1], [-200, 200]), springConfig);
  const yMainImg = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), springConfig);
  const yFloatCard = useSpring(useTransform(scrollYProgress, [0, 1], [150, -150]), springConfig);
  const rotateImg = useSpring(useTransform(scrollYProgress, [0, 1], [-5, 5]), springConfig);

  const titleReveal = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: { 
      clipPath: 'inset(0 0% 0 0)', 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const textStagger = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.5 + (i * 0.15), ease: "easeOut" }
    })
  };

  return (
    <section className="about-story-pro" ref={containerRef}>
      {/* ── Background Watermark ── */}
      <motion.div 
        className="story-watermark"
        style={{ y: yWatermark }}
      >
        EST. 2020
      </motion.div>

      <div className="container story-grid-pro">
        <div className="story-content-pro">
          <motion.div 
            className="pro-accent-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
          />
          
          <motion.h2 
            className="pro-section-title"
            variants={titleReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            Crafting the <span className="accent">Future</span> of Precision
          </motion.h2>

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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="pro-stat-item">
              <span className="num">40+</span>
              <span className="label">NATIONS</span>
            </div>
            <div className="pro-stat-item">
              <span className="num">5k+</span>
              <span className="label">SURGEONS</span>
            </div>
            <div className="pro-stat-item">
              <span className="num">100%</span>
              <span className="label">PRECISION</span>
            </div>
          </motion.div>
        </div>

        <div className="story-visuals-pro">
          {/* Main Image Layer */}
          <motion.div 
            className="pro-main-img-wrap"
            style={{ y: yMainImg, rotate: rotateImg }}
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
          >
            <div className="glass-inner">
              <div className="glass-icon">★</div>
              <h5>Global Standard</h5>
              <p>Hand-finished in our specialized facility for ISO-certified excellence.</p>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="pro-dot-pattern" />
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
