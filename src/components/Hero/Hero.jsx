import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const MotionLink = motion(Link);

const Hero = () => {
  return (
    <section className="hero" id="home">
      {/* ── Background Image ── */}
      <div className="hero__video-wrap">
        <img
          className="hero__img"
          src="https://amertranslogistics.com/wp-content/uploads/2022/06/Import-Export-Logistics.jpeg"
          alt="Import Export Logistics background"
        />
        {/* Layered overlays */}
        <div className="hero__overlay hero__overlay--grad" />
        <div className="hero__overlay hero__overlay--dark" />
      </div>

      {/* ── Content ── */}
      <div className="container hero__content">

        {/* Pre-text / eyebrow */}
        <motion.div
          className="hero__pre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="hero__heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Disposable Surgicals Products 
          <span className="hero__heading-accent"> and Medical </span> Consumables for a 
          Healthier World
        </motion.h1>

        {/* Sub-text */}
        <motion.p
          className="hero__sub"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
  We are engaged in the import and export of high-quality surgical and medical products, delivering reliable solutions to global markets.
        </motion.p>

        {/* Two CTAs */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <MotionLink
            to="/products"
            className="hero__btn hero__btn--primary"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Products <ArrowRight size={18} />
          </MotionLink>

          <MotionLink
            to="/quote"
            className="hero__btn hero__btn--outline"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
          
            Get a Quote
          </MotionLink>
        </motion.div>

      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="hero__scroll-label">Scroll down</span>
        <div className="hero__scroll-bar">
          <div className="hero__scroll-dot" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
