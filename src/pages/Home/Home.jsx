import React from 'react';
import Hero from '../../components/Hero/Hero';
import Overview from '../../components/Overview/Overview';
import Services from '../../components/Services/Services';
import Skills from '../../components/Skills/Skills';
import Quality from '../../components/Quality/Quality';
import Certifications from '../../components/Certifications/Certifications';
import SEO from '../../components/SEO/SEO';

const Home = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Bhaarat International offers high-end, premium printing and precision-engineered healthcare and medical supplies globally." 
        keywords="premium printing, healthcare solutions, Bhaarat International, disposable medical supplies"
        url="https://bhaaratinternational.org/"
      />
      <Hero />
      <Overview />
      <Services />
      <Skills />
      <Quality />
      <Certifications />
    </>
  );
};

export default Home;
