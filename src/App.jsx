import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Preloader from './components/Preloader/Preloader';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import BackToTop from './components/BackToTop/BackToTop';
import Home from './pages/Home/Home';
import AboutUs from './pages/About_us/AboutUs';
import './styles/index.css';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const onFinish = useCallback(() => setPreloaderDone(true), []);

  return (
    <div className="App">
      {/* Global overlays */}
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      {!preloaderDone && <Preloader onFinish={onFinish} />}

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

