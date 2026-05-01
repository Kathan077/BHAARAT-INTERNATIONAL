import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Truck, Users } from 'lucide-react';
import './AboutStory.css';

const AboutStory = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }
    })
  };

  return (
    <section className="about-story-new">
      <div className="container story-wrapper">
        <div className="story-grid-main">
          {/* Visual Column */}
          <motion.div 
            className="story-visual"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="main-image-container">
              <img 
                src="https://www.entrepreneurindia.co/blogs/wp-content/uploads/2025/03/159.png" 
                alt="Medical Precision" 
                className="main-story-img"
              />
              <div className="experience-badge">
                <span className="years">Reliable</span>
                <span className="text">Global Supply</span>
              </div>
            </div>
            
            <div className="mini-features">
              <div className="m-feature">
                <ShieldCheck size={24} />
                <span>Certified Quality</span>
              </div>
              <div className="m-feature">
                <Globe size={24} />
                <span>Export Specialist</span>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="story-content-new">
            <motion.div 
              className="content-header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeUp}
            >
              <span className="story-eyebrow">COMPANY OVERVIEW</span>
              <h2 className="story-title">

Disposable Surgicals Products and <span className="highlight">Medical</span> Consumables for a Healthier World</h2>
            </motion.div>

            <motion.div 
              className="story-description-large"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeUp}
            >
              <p>
                <strong>Bhaarat International</strong> is a growing and reliable company engaged in the import and export 
                of high quality surgical and medical products, serving clients across domestic and international markets. 
                Our focus is on delivering products that meet strict quality, safety, and hygiene standards required in 
                modern healthcare environments.
              </p>
              
              <p>
                We offer a wide range of products including face masks, disposable medical supplies, protective wear, 
                surgical accessories, and hygiene essentials. Each product is carefully sourced and supplied to ensure 
                consistency, durability, and performance, making them suitable for hospitals, clinics, laboratories, 
                and healthcare professionals.
              </p>

              <div className="story-highlights">
                <div className="h-item">
                  <div className="h-icon"><Truck size={20} /></div>
                  <div className="h-text">
                    <h4>Efficient Logistics</h4>
                    <p>Complete supply process managed from sourcing to timely delivery.</p>
                  </div>
                </div>
                <div className="h-item">
                  <div className="h-icon"><Users size={20} /></div>
                  <div className="h-text">
                    <h4>Client Focused</h4>
                    <p>Building long-term relationships through transparent communication.</p>
                  </div>
                </div>
              </div>

              <p>
                With a strong understanding of global trade and logistics, we manage the complete supply process 
                efficiently from sourcing and quality checks to packaging and timely delivery. Our streamlined 
                operations help us fulfill bulk orders while maintaining reliability and cost-effectiveness.
              </p>
              
              <p>
                At Bhaarat International, we believe in building long-term business relationships by providing 
                dependable products, transparent communication, and responsive customer support. Our commitment is 
                to deliver value, trust, and satisfaction to every client we work with, making us a preferred partner 
                in the surgical and medical supply industry.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="story-bg-decoration">
        <div className="circle circle-1" />
        <div className="circle circle-2" />
      </div>
    </section>
  );
};

export default AboutStory;
