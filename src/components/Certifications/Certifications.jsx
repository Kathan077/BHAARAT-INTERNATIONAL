import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Certifications.css';

const certs = [
  {
    id: 1,
    name: 'FIEO',
    sub: 'Federation of Indian Export Organisations',
    color: '#1565C0',
    logo: (
      <svg viewBox="0 0 120 80" width="110" height="70" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="40" height="40" fill="none" stroke="#1565C0" strokeWidth="4" transform="rotate(45 30 30)"/>
        <rect x="14" y="14" width="32" height="32" fill="#1565C0" transform="rotate(45 30 30)"/>
        <text x="30" y="34" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="Arial">FIEO</text>
        <text x="72" y="25" fill="#1565C0" fontSize="8.5" fontWeight="800" fontFamily="Arial">FEDERATION OF</text>
        <text x="72" y="36" fill="#1565C0" fontSize="8.5" fontWeight="800" fontFamily="Arial">INDIAN EXPORT</text>
        <text x="72" y="47" fill="#1565C0" fontSize="8.5" fontWeight="800" fontFamily="Arial">ORGANISATIONS</text>
      </svg>
    ),
  },
  {
    id: 2,
    name: 'GCCI',
    sub: 'Gujarat Chamber of Commerce & Industry',
    color: '#b71c1c',
    logo: (
      <svg viewBox="0 0 120 80" width="110" height="70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#b71c1c" strokeWidth="3"/>
        <circle cx="40" cy="40" r="23" fill="#b71c1c"/>
        <text x="40" y="37" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" fontFamily="Arial">GCCI</text>
        <text x="40" y="47" textAnchor="middle" fill="white" fontSize="5.5" fontFamily="Arial">SINCE 1949</text>
        <text x="80" y="30" fill="#b71c1c" fontSize="8" fontWeight="800" fontFamily="Arial">GUJARAT</text>
        <text x="80" y="41" fill="#b71c1c" fontSize="8" fontWeight="800" fontFamily="Arial">CHAMBER</text>
        <text x="80" y="52" fill="#b71c1c" fontSize="7" fontFamily="Arial">OF COMMERCE</text>
      </svg>
    ),
  },
  {
    id: 3,
    name: 'ISO 9001:2015',
    sub: 'Certified Company',
    color: '#0277bd',
    logo: <img src="/cert-iso.png" alt="ISO 9001:2015" style={{ height: 72, objectFit: 'contain' }} />,
  },
  {
    id: 4,
    name: 'Phyto Sanitary',
    sub: 'Phyto-Sanitary Certificate',
    color: '#2e7d32',
    logo: (
      <svg viewBox="0 0 130 80" width="120" height="70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="40" r="26" fill="none" stroke="#2e7d32" strokeWidth="2.5"/>
        <circle cx="22" cy="36" r="7" fill="#57BB3B"/>
        <circle cx="35" cy="25" r="9" fill="#57BB3B"/>
        <circle cx="48" cy="36" r="7" fill="#57BB3B"/>
        <circle cx="35" cy="47" r="7" fill="#57BB3B"/>
        <text x="75" y="30" fill="#2e7d32" fontSize="11" fontWeight="900" fontFamily="Arial">phyto</text>
        <line x1="65" y1="36" x2="112" y2="36" stroke="#2e7d32" strokeWidth="1.5"/>
        <text x="75" y="47" fill="#4CAF50" fontSize="7.5" fontFamily="Arial">SANITARY CERT.</text>
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Spices Board India',
    sub: 'Government of India',
    color: '#6a1b9a',
    logo: (
      <svg viewBox="0 0 130 80" width="120" height="70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#6a1b9a" strokeWidth="2.5"/>
        <circle cx="40" cy="40" r="24" fill="none" stroke="#6a1b9a" strokeWidth="1"/>
        <polygon points="25,48 55,48 50,38 30,38" fill="#6a1b9a"/>
        <line x1="40" y1="38" x2="40" y2="22" stroke="#6a1b9a" strokeWidth="2"/>
        <polygon points="40,24 54,33 40,33" fill="#6a1b9a"/>
        <text x="40" y="64" textAnchor="middle" fill="#6a1b9a" fontSize="5.5" fontWeight="700" fontFamily="Arial">SPICES BOARD</text>
        <text x="82" y="28" fill="#6a1b9a" fontSize="8" fontWeight="800" fontFamily="Arial">SPICES</text>
        <text x="82" y="39" fill="#6a1b9a" fontSize="8" fontWeight="800" fontFamily="Arial">BOARD</text>
        <text x="82" y="50" fill="#6a1b9a" fontSize="7.5" fontFamily="Arial">INDIA</text>
      </svg>
    ),
  },
  {
    id: 6,
    name: 'ISO 13485',
    sub: 'Medical Devices Quality Management',
    color: '#0056b3',
    logo: (
      <svg viewBox="0 0 130 80" width="120" height="70" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="30" fill="none" stroke="#0056b3" strokeWidth="2.5"/>
        <circle cx="40" cy="40" r="24" fill="#0056b3"/>
        <text x="40" y="36" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="900" fontFamily="Arial">CERTIFIED</text>
        <text x="40" y="44" textAnchor="middle" fill="white" fontSize="7" fontFamily="Arial">ISO 13485</text>
        <text x="82" y="30" fill="#0056b3" fontSize="11" fontWeight="900" fontFamily="Arial">ISO</text>
        <text x="82" y="42" fill="#0056b3" fontSize="9" fontWeight="700" fontFamily="Arial">13485</text>
        <text x="82" y="53" fill="#0056b3" fontSize="6.5" fontFamily="Arial">MEDICAL QMS</text>
      </svg>
    ),
  },
  {
    id: 7,
    name: 'CE Mark',
    sub: 'European Conformity Mark',
    color: '#003399',
    logo: (
      <svg viewBox="0 0 130 80" width="120" height="70" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="60" fill="#003399" fontSize="55" fontWeight="900" fontFamily="Arial Narrow, Arial">CE</text>
        <text x="95" y="32" fill="#003399" fontSize="7" fontWeight="700" fontFamily="Arial">EUROPEAN</text>
        <text x="95" y="42" fill="#003399" fontSize="7" fontWeight="700" fontFamily="Arial">CONFORMITY</text>
        <text x="95" y="52" fill="#003399" fontSize="6.5" fontFamily="Arial">MARK</text>
      </svg>
    ),
  },
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

          {/* Cards track */}
          <div className="cf__track" style={{ '--cf-visible': visible }}>
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
                  style={{ '--cf-color': c.color }}
                >
                  <div className="cf__card-logo">{c.logo}</div>
                  <div className="cf__card-name">{c.name}</div>
                  <div className="cf__card-sub">{c.sub}</div>
                  <div className="cf__card-bar" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right arrow */}
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
        </div>

        {/* ── Dots ── */}
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
      </div>
    </section>
  );
};

export default Certifications;
