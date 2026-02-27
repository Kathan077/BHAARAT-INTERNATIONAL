import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Partners.css';

/* ── Animated counter ── */
const Counter = ({ target, suffix = '', inView }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const steps = 80;
    const inc = target / steps;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 25);
    return () => clearInterval(t);
  }, [inView, target]);
  return <>{val.toLocaleString()}{suffix}</>;
};

const logos = [
  { name: 'FedEx',             src: '/logo-fedex.png'     },
  { name: 'DHL',               src: '/logo-dhl.png'       },
  { name: 'Qatar Airways',     src: '/logo-qatar.png'     },
  { name: 'Ethiopian Airlines',src: '/logo-ethiopian.png' },
  { name: 'Maersk',            src: '/logo-maersk.png'    },
  { name: 'Evergreen',         src: '/logo-evergreen.png' },
  { name: 'COSCO Shipping',    src: '/logo-cosco.png'     },
];

/* Duplicate for seamless infinite marquee */
const marqueeLogos = [...logos, ...logos];

const Partners = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="pt" id="partners" ref={ref}>
      {/* World dot-grid background */}
      <div className="pt__map-bg" />

      <div className="container pt__inner">

        {/* ── Giant animated number ── */}
        <div className="pt__hero">
          <motion.div
            className="pt__big-num"
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Counter target={5000} suffix="+" inView={inView} />
          </motion.div>

          <motion.p
            className="pt__hero-label"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            Our team handles all aspects of delivery, ensuring comprehensive coverage.
          </motion.p>
        </div>

        {/* ── Section heading ── */}
        <motion.div
          className="pt__heading-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className="pt__eyebrow">
            <span className="pt__eyebrow-line" />
            Our Shipping Partners
          </span>
          <h2 className="pt__heading">
            Trusted <span className="pt__heading-accent">Partners</span>
          </h2>
        </motion.div>

      </div>

      {/* ── Logo grid (staggered fade-in) ── */}
      <div className="container">
        <div className="pt__logo-grid">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              className="pt__logo-card"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.04, transition: { duration: 0.25 } }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="pt__logo-img"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Infinite scrolling marquee (second row) ── */}
      <motion.div
        className="pt__marquee-wrap"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <div className="pt__marquee">
          <div className="pt__marquee-track">
            {marqueeLogos.map((logo, i) => (
              <div key={i} className="pt__marquee-logo">
                <img src={logo.src} alt={logo.name} className="pt__marquee-img" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Country strip ── */}
      <div className="container">
        <motion.div
          className="pt__countries"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {['India','USA','Germany','UAE','Saudi Arabia','UK','France','Australia',
            'Canada','Brazil','South Africa','Indonesia','Malaysia','Singapore','Nigeria','Kenya','Egypt','Turkey'].map((c, i) => (
            <span key={i} className="pt__country-tag">
              <span className="pt__country-dot" />
              {c}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
