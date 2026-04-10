import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Package, Activity, Truck } from 'lucide-react';
import './AboutLogistics.css';

const AboutLogistics = () => {
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section className="about-logistics-optimized" ref={containerRef}>
      {/* ── Fixed CSS Parallax Background ── */}
      <div className="optimized-bg-fixed" />
      <div className="optimized-overlay" />

      <div className="container optimized-grid-container">
        <motion.div 
          className="logistics-optimized-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* ── Headline Block ── */}
          <motion.div className="opt-headline-block" variants={itemVariants}>
            <span className="opt-eyebrow">Enterprise Logistics</span>
            <h2 className="opt-title">
              Precision Moving at <br />
              <span className="gradient-text">Global Scale</span>
            </h2>

          </motion.div>

          {/* ── Features Grid ── */}
          <div className="opt-features-grid">
            {[
              { 
                icon: <Package size={28} />, 
                title: 'Strategic Warehousing', 
                desc: 'Climate-controlled storage ensuring medical integrity.' 
              },
              { 
                icon: <Activity size={28} />, 
                title: 'Worldwide Distribution', 
                desc: 'Seamless product flow with strong logistics and supply network.' 
              },
              { 
                icon: <ShieldCheck size={28} />, 
                title: 'Quality Compliance', 
                desc: 'Adhering to strict international safety and hygiene standards.' 
              },
              { 
                icon: <Truck size={28} />, 
                title: 'Global Express', 
                desc: 'Optimized transit routes for time-critical medical supplies.' 
              }
            ].map((feature, i) => (
              <motion.div key={i} className="opt-feature-card" variants={itemVariants}>
                <div className="opt-card-icon-wrap">
                  {feature.icon}
                </div>
                <div className="opt-card-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutLogistics;
