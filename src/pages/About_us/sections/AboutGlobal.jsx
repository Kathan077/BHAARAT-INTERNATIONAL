import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import './AboutGlobal.css';

const galleryImages = [
  { id: 1, image: "/global/mou-nepal-parth.jpeg", alt: "Global Trade Meet" },
  { id: 2, image: "/global/mou-africa-delegation.jpeg", alt: "International Meeting" },
  { id: 3, image: "/global/ficci-pharma-meet-2025.jpeg", alt: "Trade Discussion & Exchange" },
  { id: 4, image: "/global/mou-international-buyer.jpeg", alt: "Connecting with Global Partners" },
  { id: 5, image: "/global/mou-myanmar-chanpharm.jpeg", alt: "International Trade Pavilion" },
  { id: 6, image: "/global/mou-export-meet.jpeg", alt: "Global Buyer Meeting" },
  { id: 7, image: "/global/fta-conclave-gujarat.jpeg", alt: "Trade Conclave Participation" },
  { id: 8, image: "/global/fta-conclave-full.jpeg", alt: "International Event Representation" }
];

const AboutGlobal = () => {
  return (
    <section className="about-global-section">
      <div className="about-global-mesh-bg" />

      <div className="container">
        {/* ── Section Header (Simple, Friendly & Natural) ── */}
        <div className="about-global-header">
          <motion.div
            className="global-eyebrow"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Globe size={16} />
            <span>Global Presence</span>
          </motion.div>

          <motion.h2
            className="global-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Trading Globally, <span className="highlight-blue">Connecting Personally</span>
          </motion.h2>

          <motion.p
            className="global-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We actively trade globally, participate in international expos, and meet partners face-to-face worldwide to build strong, trusted, and lasting relationships.
          </motion.p>
        </div>

        {/* ── Pure Photo Gallery (Clean, Zero Cut, No Text) ── */}
        <div className="global-masonry-wrapper">
          <div className="global-masonry-grid pure-photos">
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.id}
                className="global-photo-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <div className="photo-card-inner">
                  <img 
                    src={item.image} 
                    alt={item.alt} 
                    loading="lazy" 
                    className="photo-main-img" 
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGlobal;
