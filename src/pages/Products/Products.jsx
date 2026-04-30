import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Shield, 
  ShieldCheck, 
  User, 
  Footprints, 
  Layers, 
  Activity, 
  HeartPulse, 
  Sparkles,
  Download,
  FileText
} from 'lucide-react';

import SEO from '../../components/SEO/SEO';

import './Products.css';
import cataloguePdf from '../../assets/Bhaarat [Recovered] (2).pdf';
// ... rest remains same ...
// Use replace range very carefully. Since the file is 171 lines I will just replace around the component definition.

// Import local images
import faceMaskImg from './img/face mask.png';
import disposableFaceMaskImg from './img/disposable-face-mask (1).jpg';
import headCapImg from './img/head cap.jpeg';
import shoesGlovesImg from './img/shoes and gloves.png';
import apronImg from './img/disposable apron.jpeg';
import sheetImg from './img/plain and bed sheet.png';
import hygieneImg from './img/prep pazor.png';
import salonImg from './img/salon and sap.png';


// --- DATA ---
const productCategories = [
  { id: 'ply-face-mask',        title: 'Ply Face Mask',                       icon: Shield,      color: '#3498db', image: faceMaskImg },
  { id: 'disposable-face-mask', title: 'Disposable Face Mask',                icon: ShieldCheck, color: 'var(--accent-teal)', image: disposableFaceMaskImg },
  { id: 'head-cap',             title: 'Head Cap',                            icon: User,        color: 'var(--primary-blue)', image: headCapImg },
  { id: 'shoe-cover-gloves',    title: 'Shoe Cover & Gloves',                 icon: Footprints,  color: '#0ea5e9', image: shoesGlovesImg },
  { id: 'disposable-apron',     title: 'Disposable Apron',                    icon: Layers,      color: '#0284c7', image: apronImg },
  { id: 'disposable-plain-sheet',title: 'Disposable Plain Sheet / Bed Sheet', icon: Activity,    color: '#0369a1', image: sheetImg },
  { id: 'health-hygine',        title: 'Health & Hygiene',                     icon: HeartPulse,  color: '#0c4a6e', image: hygieneImg },
  { id: 'salon-spa',            title: 'Salon & Spa',                         icon: Sparkles,    color: '#075985', image: salonImg },
];

// --- COMPONENTS ---
const CategoryCard = ({ cat, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className="cat-selection-card-pro"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.1, type: 'spring', damping: 20 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', cursor: 'default' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="cat-card-image"
        style={{ backgroundImage: `url("${cat.image}")`, transform: 'translateZ(-20px)' }}
      />
      <div className="cat-card-overlay-pro" style={{ transform: 'translateZ(50px)' }}>
        <div className="cat-card-glass">
          <h3>{cat.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

// --- PAGE ---
const Products = () => {
  return (
    <div className="products-page-pro">
      <SEO 
        title="Our Products"
        description="Explore Bhaarat International's high-quality medical supplies, face masks, protective gear, and salon hygiene products globally."
        keywords="medical supplies, disposable face mask, head cap, surgical mask, Bhaarat International products"
        url="https://bhaaratinternational.org/products"
      />
      <div className="pro-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <motion.div
        className="category-view-pro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <section className="products-hero-pro">
          <div className="container">
            <motion.h1
              className="hero-title-pro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Product Categories
            </motion.h1>


            <motion.p
              className="hero-subtitle-pro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Precision-engineered medical supplies for{' '}
              <span className="highlight-text">global healthcare excellence</span>.
            </motion.p>
          </div>
        </section>

        <div className="container grid-container-pro">
          <div className="category-grid-pro">
            {productCategories.map((cat, idx) => (
              <CategoryCard key={cat.id} cat={cat} idx={idx} />
            ))}
          </div>
        </div>

        {/* Download Section */}
        <motion.div
          className="catalogue-download-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container">
            <div className="catalogue-card">
              <div className="catalogue-icon">
                <FileText size={40} />
              </div>
              <div className="catalogue-text">
                <h2>Want to See All Our Products?</h2>
                <p>
                  Download our complete product catalogue to explore our full range of
                  medical-grade disposables, protective gear, and hygiene solutions.
                </p>
              </div>
              <a
                className="catalogue-download-btn"
                href={cataloguePdf}
                download="Bhaarat-International-Catalogue.pdf"
              >
                <Download size={20} />
                Download Catalogue
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Products;
