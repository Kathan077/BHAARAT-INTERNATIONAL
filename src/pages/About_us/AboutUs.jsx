import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AboutHero from './sections/AboutHero';
import AboutStory from './sections/AboutStory';
import AboutLogistics from './sections/AboutLogistics';
import AboutProcess from './sections/AboutProcess';
import AboutMission from './sections/AboutMission';
import SEO from '../../components/SEO/SEO';

import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="About Us"
        description="Learn about Bhaarat International's mission, advanced logistics, professional processes, and our journey to excellence in global premium supply."
        url="https://bhaaratinternational.org/about"
      />
      <AboutHero />
      <AboutStory />
      <AboutLogistics />
      <AboutProcess />
      <AboutMission />
      
    </motion.div>
  );
};

export default AboutUs;
