import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import './AboutLogistics.css';

const AboutLogistics = () => {
  const containerRef = useRef(null);
  const brands = [
    { name: 'FedEx', logo: 'https://vrundawaninternational.com/wp-content/uploads/2024/04/Fedex-1024x576.png' },
    { name: 'DHL', logo: 'https://vrundawaninternational.com/wp-content/uploads/2024/04/dhl.png' },
    { name: 'Qatar Airways', logo: 'https://vrundawaninternational.com/wp-content/uploads/2024/04/Qatar-Airways-Logo-1024x576.png' },
    { name: 'Ethiopian', logo: 'https://vrundawaninternational.com/wp-content/uploads/2024/04/Ethiopian-Airlines-1.png' },
    { name: 'Maersk', logo: 'https://vrundawaninternational.com/wp-content/uploads/2024/04/2560px-Maersk_Group_Logo.svg-1024x235.png' },
    { name: 'Evergreen', logo: 'https://vrundawaninternational.com/wp-content/uploads/2024/04/2560px-Evergreen_Logo.svg-1024x186.png' },
    { name: 'Cosco Shipping', logo: 'https://vrundawaninternational.com/wp-content/uploads/2024/04/COSCOCS-ver1.svg-1024x660.png' }
  ];

  const marqueeBrands = [...brands, ...brands];

  // Scroll Parallax for Background Image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const xOrb1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [50, -50]));
  const yOrb1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [50, -50]));
  
  const xOrb2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-80, 80]));
  const yOrb2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-80, 80]));

  return (
    <section className="about-logistics-pro" onMouseMove={handleMouseMove} ref={containerRef}>
      {/* ── Custom High-Fidelity Background ── */}
      <motion.div 
        className="logistics-custom-bg"
        style={{ y: yBg }}
      >
        <img 
          src="https://www.legalwiz.in/wp-content/uploads/How-to-start-import-export-business-in-india.jpg" 
          alt="Import Export Logistics" 
        />
        <div className="bg-overlay-gradient" />
      </motion.div>

      {/* ── Ultra-Pro Animation Layers ── */}
      <div className="logistics-bg-layers">
        <motion.div className="bg-orb bg-orb--1" style={{ x: xOrb1, y: yOrb1 }} />
        <motion.div className="bg-orb bg-orb--2" style={{ x: xOrb2, y: yOrb2 }} />
        <div className="bg-scan-line" />
        <div className="logistics-map">
          <div className="map-pulsar map-pulsar--1" />
          <div className="map-pulsar map-pulsar--2" />
          <div className="map-pulsar map-pulsar--3" />
          <div className="map-dot-pattern" />
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* ── Cinematic Counter Section ── */}
        <div className="logistics-hero-pro">
          <motion.div 
            className="logistics-number-wrap"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1 
              className="pro-logistics-num"
              animate={{ backgroundPosition: ["0% 100%", "100% 50%", "0% 50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              22,800
            </motion.h1>
            <motion.div 
              className="num-underline"
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.div>
          
          <motion.p 
            className="pro-logistics-sub"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            GLOBAL DELIVERIES MANAGED BY OUR ELITE LOGISTICS TEAM
          </motion.p>
        </div>

        {/* ── Brand Logo Marquee ── */}
        <div className="logistics-marquee-container">
          <div className="marquee-fade marquee-fade--left" />
          <motion.div 
            className="logistics-marquee"
            animate={{ x: [0, -2000] }}
            transition={{ 
              repeat: Infinity, 
              duration: 40, 
              ease: "linear" 
            }}
          >
            {marqueeBrands.map((brand, idx) => (
              <div key={idx} className="marquee-brand-item">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="brand-logo-img" 
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
          <div className="marquee-fade marquee-fade--right" />
        </div>
      </div>
    </section>
  );
};

export default AboutLogistics;
