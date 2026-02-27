import React, { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Overview from './components/Overview/Overview';
import Services from './components/Services/Services';
import Skills from './components/Skills/Skills';
import Partners from './components/Partners/Partners';
import Quality from './components/Quality/Quality';
import Certifications from './components/Certifications/Certifications';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Preloader from './components/Preloader/Preloader';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import './styles/index.css';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const onFinish = useCallback(() => setPreloaderDone(true), []);

  return (
    <div className="App">
      {/* Global overlays */}
      <CustomCursor />
      <ScrollProgress />
      {!preloaderDone && <Preloader onFinish={onFinish} />}

      <Header />
      <main>
        <Hero />
        <Overview />
        <Services />
        <Skills />
        <Partners />
        <Quality />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}

export default App;

