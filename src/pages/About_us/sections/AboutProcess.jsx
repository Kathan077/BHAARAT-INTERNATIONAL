import React from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, Box, Send } from 'lucide-react';
import './AboutProcess.css';

const AboutProcess = () => {
  const steps = [
    {
      icon: <Search size={32} />,
      title: 'Sourcing',
      desc: 'We select products from trusted manufacturers ensuring quality and compliance with healthcare standards.'
    },
    {
      icon: <CheckCircle2 size={32} />,
      title: 'Quality Check',
      desc: 'Every product is carefully verified to maintain safety, hygiene, and consistent performance.'
    },
    {
      icon: <Box size={32} />,
      title: 'Order Management',
      desc: 'Efficient handling of orders with proper documentation, packaging, and accuracy.'
    },
    {
      icon: <Send size={32} />,
      title: 'Global Delivery',
      desc: 'Strong logistics network ensuring timely and reliable delivery across international markets.'
    }
  ];

  return (
    <section className="about-process-new">
      <div className="process-mesh-overlay" />
      <div className="container">
        <div className="process-header">
          <motion.span 
            className="process-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Methodology
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Supply Chain <span className="gradient-text">Excellence</span>
          </motion.h2>
        </div>

        <div className="process-journey">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="process-step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="step-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="step-icon-inner">
                {step.icon}
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              {index !== steps.length - 1 && <div className="step-connector" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutProcess;
