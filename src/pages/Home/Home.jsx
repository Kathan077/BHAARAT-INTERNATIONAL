import React from 'react';
import Hero from '../../components/Hero/Hero';
import Overview from '../../components/Overview/Overview';
import Services from '../../components/Services/Services';
import Skills from '../../components/Skills/Skills';
import Partners from '../../components/Partners/Partners';
import Quality from '../../components/Quality/Quality';
import Certifications from '../../components/Certifications/Certifications';

const Home = () => {
  return (
    <>
      <Hero />
      <Overview />
      <Services />
      <Skills />
      <Partners />
      <Quality />
      <Certifications />
    </>
  );
};

export default Home;
