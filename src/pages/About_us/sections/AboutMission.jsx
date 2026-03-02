import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Target, Eye, ShieldCheck } from 'lucide-react';
import './AboutMission.css';

const MissionCard = ({ item }) => {
  const cardRef = useRef(null);
  
  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for "pro" feel
  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 20 });

  // Transformations for 3D tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Transformations for magnetic icon
  const iconX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const iconY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to -0.5 to 0.5
    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      className="mission-card-ultra"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.165, 0.84, 0.44, 1] }}
    >
      <div className="card-glass-shine" />
      
      <motion.div 
        className="mission-icon-wrap"
        style={{ x: iconX, y: iconY, translateZ: 50, color: item.color }}
      >
        <item.icon size={48} strokeWidth={1.2} />
        <div className="icon-glow" style={{ backgroundColor: `${item.color}20` }} />
      </motion.div>

      <div className="card-content-ultra" style={{ transform: "translateZ(30px)" }}>
        <span className="card-tag" style={{ borderLeftColor: item.color }}>{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>

      <div className="card-footer-glow" style={{ background: `radial-gradient(circle at center, ${item.color}15, transparent 70%)` }} />
    </motion.div>
  );
};

const AboutMission = () => {
  const missions = [
    {
      icon: Target,
      title: 'Precision Mission',
      desc: 'To deliver high-precision surgical instruments that redefine the limits of medical possibility.',
      color: '#3498db',
      tag: 'CRAFTSMANSHIP'
    },
    {
      icon: Eye,
      title: 'Visionary Reach',
      desc: 'To be the global cornerstone of healthcare innovation, trusted by surgeons in every continent.',
      color: '#a855f7',
      tag: 'INNOVATION'
    },
    {
      icon: ShieldCheck,
      title: 'Unwavering Ethics',
      desc: 'Integrity is our core. We maintain the highest standards of safety and regulatory compliance.',
      color: '#2ecc71',
      tag: 'INTEGRITY'
    }
  ];

  return (
    <section className="about-mission-ultra section-padding">
      <div className="mission-mesh-bg" />
      
      <div className="container">
        <div className="mission-header-ultra">
          <motion.div 
            className="mission-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            OUR VALUES
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
          >
            Guided by <span className="gradient-text">Excellence</span>
          </motion.h2>
          <motion.div 
            className="header-divider"
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8 }}
          />
        </div>

        <div className="mission-grid-ultra">
          {missions.map((item, idx) => (
            <MissionCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
