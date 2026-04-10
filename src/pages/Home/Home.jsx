import React from 'react';
import Hero from '../../components/Hero/Hero';
import Overview from '../../components/Overview/Overview';
import Services from '../../components/Services/Services';
import Skills from '../../components/Skills/Skills';
import Quality from '../../components/Quality/Quality';
import Certifications from '../../components/Certifications/Certifications';

const Home = () => {
  return (
    <>
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
