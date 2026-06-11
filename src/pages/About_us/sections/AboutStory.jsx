import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Truck, Users } from 'lucide-react';
import storyImg from '../../../assets/WhatsApp Image 2026-06-01 at 17.52.2.jpeg';
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
                src={storyImg} 
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
                <strong>Bhaarat International</strong> is a dedicated exporter of high-quality disposable surgical products, 
                diagnostic kits, and non-woven protective apparel, committed to supporting healthcare systems and industries 
                worldwide with reliable, safe, and cost-effective solutions. With a strong focus on hygiene, durability, 
                and international standards, our product portfolio includes disposable surgical masks, gowns, caps, 
                shoe covers, drapes, diagnostic test kits, and a wide range of non-woven protective products.
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
                Every product is carefully sourced and manufactured to meet stringent quality and safety requirements, 
                ensuring optimal protection and accurate healthcare support for medical professionals and end users. 
                Our operations are driven by consistency, timely delivery, and customer satisfaction. We collaborate with 
                trusted manufacturers and maintain strict quality control processes at every stage—from procurement to 
                packaging and export—so that our clients receive only the best.
              </p>
              
              <p>
                Backed by industry expertise and a global outlook, we aim to build long-term partnerships by offering 
                dependable products, competitive pricing, and responsive service. Whether serving hospitals, laboratories, 
                distributors, healthcare institutions, or government agencies, we are committed to delivering excellence 
                in every shipment.
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
