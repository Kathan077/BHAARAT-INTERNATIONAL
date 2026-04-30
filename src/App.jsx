import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Preloader from './components/Preloader/Preloader';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import BackToTop from './components/BackToTop/BackToTop';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import Home from './pages/Home/Home';
import AboutUs from './pages/About_us/AboutUs';
import Products from './pages/Products/Products';
import Support from './pages/Support/Support';
import Quote from './pages/Quote/Quote';
import './styles/index.css';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const onFinish = useCallback(() => setPreloaderDone(true), []);

  return (
    <div className="App">
      {/* Preloader Overlay */}
      {!preloaderDone && <Preloader onFinish={onFinish} />}

      {/* Main Content - Only visible after preloader finishes */}
      {preloaderDone && (
        <>
          <ScrollToTop />
          <WhatsAppButton />
          <CustomCursor />
          <ScrollProgress />
          <BackToTop />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/products" element={<Products />} />
              <Route path="/support" element={<Support />} />
              <Route path="/quote" element={<Quote />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;

