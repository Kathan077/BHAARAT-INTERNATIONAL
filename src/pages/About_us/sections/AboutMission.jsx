import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Activity, Handshake, Lightbulb, Globe, Leaf } from 'lucide-react';
import './AboutMission.css';

const AboutMission = () => {
  const coreValues = [
    {
      icon: <ShieldCheck size={32} />,
      title: 'Global Integrity',
      desc: 'Executing every trade with absolute transparency and ethical rigor.',
      color: 'var(--primary-blue)'
    },
    {
      icon: <Activity size={32} />,
      title: 'Agile Logistics',
      desc: 'Precision supply chain management at the speed of modern medicine.',
      color: '#a855f7'
    },
    {
      icon: <Handshake size={32} />,
      title: 'Strategic Trust',
      desc: 'Building lifelong partnerships with the world’s leading healthcare providers.',
      color: '#2ecc71'
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Dynamic Innovation',
      desc: 'Continuously sourcing the next generation of surgical products.',
      color: '#f39c12'
    },
    {
      icon: <Globe size={32} />,
      title: 'Healthcare Equity',
      desc: 'Ensuring quality medical supplies reach every corner of the planet.',
      color: '#3498db'
    },
    {
      icon: <Leaf size={32} />,
      title: 'Sustainable Sourcing',
      desc: 'Prioritizing durable, eco-friendly medical solutions for a better future.',
      color: '#16a085'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="about-mission-pro-v3">
      <div className="mesh-gradient-bg" />

      <div className="container">
        {/* ── North Star Hero Segment ── */}
        <div className="mission-hero-segment">
          <motion.div
            className="mission-box"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="box-icon-head"><Target size={40} /></div>
            <span className="box-eyebrow">Our Mission</span>
            <h2>Bridging the <span className="highlight">Global Gap</span> in Healthcare</h2>
            <p>
              To provide high-quality disposable surgical products and non-woven apparel that ensure safety, hygiene, and comfort for health-
              care professionals and end users worldwide. We are committed to maintaining strict quality standards, delivering products on
              time, and building long-term relationships through reliability, transparency, and customer-focused service.
            </p>
          </motion.div>

          <motion.div
            className="vision-box"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="box-icon-head"><Eye size={40} /></div>
            <span className="box-eyebrow">Our Vision</span>
            <h2>Leading Global<span className="highlight-alt">Trade with</span>Trusted Quality</h2>
            <p>
              To become a globally trusted exporter of disposable healthcare and non-woven protective products, recognized for quality,
              consistency, and innovation, while contributing to safer healthcare environments and improved hygiene standards across
              international markets.
            </p>
          </motion.div>
        </div>

        {/* ── Core Values Segment ── */}
        <div className="values-grid-segment">
          <motion.div
            className="values-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <h2>Our Core Values</h2>
          </motion.div>

          <motion.div
            className="values-grid-wrapper"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreValues.map((value, i) => (
              <motion.div key={i} className="value-pro-card" variants={itemVariants}>
                <div className="v-card-icon" style={{ "--icon-color": value.color, color: 'var(--icon-color)' }}>
                  {value.icon}
                </div>
                <div className="v-card-body">
                  <h4>{value.title}</h4>
                  <p>{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
