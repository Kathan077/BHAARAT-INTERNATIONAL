import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Certifications.css';

const certs = [
  {
    id: 1,
    name: 'Udyog Aadhaar',
    sub: 'MSME Registration Certificate',
    color: '#FF9933',
    logo: <img src="https://www.cajiteshtelisara.com/wp-content/uploads/2023/04/udyog-aadhar.jpg" alt="Udyog Aadhaar" style={{ height: '110%', width: '100%', objectFit: 'contain' }} />,
  },
  {
    id: 2,
    name: 'Make in India',
    sub: 'Global Manufacturing Hub',
    color: '#000000',
    logo: <img src="https://images.seeklogo.com/logo-png/37/1/make-in-india-logo-png_seeklogo-379725.png" alt="Make in India" style={{ height: '150%', width: '100%', objectFit: 'contain' }} />,
  },
  {
    id: 3,
    name: 'MSME',
    sub: 'Micro, Small & Medium Enterprises',
    color: '#8B4513',
    logo: <img src="https://msmedinagpur.gov.in/assets/emblem-dark-CWvnlyPE.png" alt="MSME Logo" style={{ height: '120%', width: '100%', objectFit: 'contain' }} />,
  }
];

/* ── Responsive: how many cards to show based on window width ── */
function useVisible() {
  const getV = () => {
    const w = window.innerWidth;
    if (w < 480)  return 1;
    if (w < 768)  return 2;
    if (w < 1024) return 3;
    return 4;
  };
  const [visible, setVisible] = useState(getV);
  useEffect(() => {
    const handler = () => setVisible(getV());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return visible;
}

const Certifications = () => {
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: '-80px' });
  const visible = useVisible();
  const [start, setStart] = useState(0);
  const [dir, setDir]     = useState(1);
  const timerRef          = useRef(null);

  const max = Math.max(0, certs.length - visible);
  const showSlider = certs.length > visible;

  // Keep start in bounds when visible changes (e.g. window resize)
  useEffect(() => {
    setStart(s => Math.min(s, max));
  }, [max]);

  const next = useCallback(() => {
    setDir(1);
    setStart(s => (s >= max ? 0 : s + 1));
  }, [max]);

  const prev = useCallback(() => {
    setDir(-1);
    setStart(s => (s <= 0 ? max : s - 1));
  }, [max]);

  useEffect(() => {
    if (!inView) return;
    timerRef.current = setInterval(next, 3500);
    return () => clearInterval(timerRef.current);
  }, [inView, next]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3500);
  }, [next]);

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };

  return (
    <section className="cf" id="certifications" ref={ref}>
      <div className="cf__watermark" aria-hidden="true">Certificates</div>

      <div className="container cf__inner">
        {/* ── Header ── */}
        <motion.div
          className="cf__hdr"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <span className="cf__eyebrow">
            <span className="cf__eyebrow-line" />Our Achievements
          </span>
          <h2 className="cf__heading">
            Affiliations &amp; <span className="cf__accent">Certifications</span>
          </h2>
        </motion.div>

        {/* ── Slider ── */}
        <div className="cf__slider-wrap">
          {/* Left arrow */}
          {showSlider && (
            <motion.button
              className="cf__arrow"
              onClick={handlePrev}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.12, backgroundColor: '#0056b3', color: '#fff' }}
              whileTap={{ scale: 0.92 }}
              aria-label="Previous"
            >
              ‹
            </motion.button>
          )}

          {/* Cards track */}
          <div 
            className="cf__track" 
            style={{ 
              '--cf-visible': showSlider ? visible : certs.length,
              justifyContent: showSlider ? 'stretch' : 'center',
              display: showSlider ? 'grid' : 'flex',
              gap: '2rem'
            }}
          >
            {showSlider ? (
              <AnimatePresence mode="popLayout" custom={dir}>
                {certs.slice(start, start + visible).map((c, i) => (
                  <motion.div
                    key={`${c.id}-${start}`}
                    className="cf__card"
                    custom={dir}
                    variants={{
                      enter:  d => ({ opacity: 0, x: d > 0 ? 100 : -100, scale: 0.88 }),
                      center:   { opacity: 1, x: 0, scale: 1 },
                      exit:   d => ({ opacity: 0, x: d > 0 ? -100 : 100, scale: 0.88 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    style={{ '--cf-color': c.color, width: '100%', maxWidth: '300px' }}
                  >
                    <div className="cf__card-logo">{c.logo}</div>
                    <div className="cf__card-name">{c.name}</div>
                    <div className="cf__card-sub">{c.sub}</div>
                    <div className="cf__card-bar" />
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              certs.map((c, i) => (
                <motion.div
                  key={c.id}
                  className="cf__card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  style={{ '--cf-color': c.color, width: '100%', maxWidth: '300px' }}
                >
                  <div className="cf__card-logo">{c.logo}</div>
                  <div className="cf__card-name">{c.name}</div>
                  <div className="cf__card-sub">{c.sub}</div>
                  <div className="cf__card-bar" />
                </motion.div>
              ))
            )}
          </div>

          {/* Right arrow */}
          {showSlider && (
            <motion.button
              className="cf__arrow"
              onClick={handleNext}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.12, backgroundColor: '#0056b3', color: '#fff' }}
              whileTap={{ scale: 0.92 }}
              aria-label="Next"
            >
              ›
            </motion.button>
          )}
        </div>

        {/* ── Dots ── */}
        {showSlider && (
          <motion.div
            className="cf__dots"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button
                key={i}
                className={`cf__dot ${i === start ? 'cf__dot--active' : ''}`}
                onClick={() => { setDir(i > start ? 1 : -1); setStart(i); resetTimer(); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
