import React, { useRef, useState, useCallback } from 'react';
import { motion, useInView, useSpring, animate } from 'framer-motion';
import { ShieldCheck, Globe, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import overviewImg from '../../assets/WhatsApp Image 2026-04-10 at 2.40.55 PM.jpeg';
import './Overview.css';

/* ── Animated counter ── */
const Counter = ({ target, suffix = '', duration = 2, startAnimation }) => {
  const nodeRef = useRef(null);

  React.useEffect(() => {
    if (!startAnimation) return;

    const controls = animate(0, target, {
      duration: duration,
      onUpdate: (value) => {
        if (nodeRef.current) {
          nodeRef.current.textContent = Math.floor(value) + suffix;
        }
      },
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [startAnimation, target, duration, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const stats = [
  { icon: Award, value: 25, suffix: '+', label: 'Years of Excellence' },
  
  { icon: ShieldCheck, value: 100, suffix: '%', label: 'Quality Assured' },
];

const highlights = [
  'International Supplier of Medical & Protective Solutions',
  'Certified Manufacturing with Global Quality Standards',
  'Reliable Bulk Supply Across Multiple Countries',
  'Flexible Custom Branding & Private Label Support',
  'Consistent Quality with Scalable Production Capacity',
];

/* ── Animation variants ── */
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

/* ── Stat card ── */
const StatCard = ({ icon: Icon, value, suffix, label, delay, inView }) => {
  const cardRef = useRef(null);

  // ✅ FIXED (removed invalid margin)
  const cardInView = useInView(cardRef, { once: true });

  return (
    <motion.div
      ref={cardRef}
      className="overview__stat-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55 }}
    >
      <div className="overview__stat-icon-wrap">
        <Icon size={24} className="overview__stat-icon" />
      </div>

      <div className="overview__stat-number">
        <Counter
          target={value}
          suffix={suffix}
          startAnimation={cardInView}
        />
      </div>

      <div className="overview__stat-label">{label}</div>
    </motion.div>
  );
};

/* ── 3D Tilt Frame (Pro Level) ── */
const TiltFrame = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const springX = useSpring(0, { stiffness: 150, damping: 20 });
  const springY = useSpring(0, { stiffness: 150, damping: 20 });

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * 16;
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
      className={`overview__tilt-frame ${className} ${hovered ? 'overview__tilt-frame--hovered' : ''}`}
    >
      {children}
      
      {/* Dynamic Shine */}
      <div
        className="overview__shine"
        style={{
          background: `radial-gradient(circle at ${50 + tilt.x * 2.5}% ${50 + tilt.y * 2.5}%, rgba(255,255,255,0.25) 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      
      {/* 3D Parallax Badges */}
      

     
    </motion.div>
  );
};

/* ── Main Component ── */
const Overview = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section className="overview" id="about" ref={sectionRef}>
      <div className="container overview__grid">

        {/* LEFT COLUMN */}
        <motion.div
          className="overview__image-col"
          variants={fadeLeft}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <TiltFrame className="overview__img-frame">
            <img
              src={overviewImg}
              alt="Bhaarat International — Medical Instruments"
              className="overview__img"
            />
          </TiltFrame>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          className="overview__content-col"
          variants={fadeRight}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2
            className="overview__heading"
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            Company <span className="overview__heading-accent">Overview</span>
          </motion.h2>

          <motion.p
            className="overview__body"
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
           We are engaged in the import and export of high-quality surgical and medical products, delivering reliable solutions to global markets.
          </motion.p>

          <motion.ul
            className="overview__highlights"
            variants={fadeUp(0.45)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {highlights.map((item) => (
              <li key={item} className="overview__highlight-item">
                <CheckCircle2 size={17} />
                {item}
              </li>
            ))}
          </motion.ul>

          <a href="#contact" className="overview__cta">
            Learn More About Us <ArrowRight size={17} />
          </a>
        </motion.div>
      </div>

      {/* STATS */}
      <div className="container">
        <div className="overview__stats">
          {stats.map(({ icon, value, suffix, label }, i) => (
            <StatCard
              key={label}
              icon={icon}
              value={value}
              suffix={suffix}
              label={label}
              delay={0.4 + i * 0.12}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
