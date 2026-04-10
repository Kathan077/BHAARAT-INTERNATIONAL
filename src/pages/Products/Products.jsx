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


import './Products.css';
import cataloguePdf from '../../assets/Bhaarat [Recovered] (2).pdf';

// --- DATA ---
const productCategories = [
  { id: 'ply-face-mask',        title: 'PLY FACE MASK',                       icon: Shield,      color: '#3498db', image: 'https://m.media-amazon.com/images/I/71ghGvZ7H4S.jpg' },
  { id: 'disposable-face-mask', title: 'Disposable FACE MASK',                icon: ShieldCheck, color: '#17a2b8', image: 'https://cdn.moglix.com/p/yPKkv6OtIxmAR-xxlarge.jpg' },
  { id: 'head-cap',             title: 'HEAD CAP',                            icon: User,        color: '#0056b3',image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR6I4D-nDiToUYKSooISt_1F6aKoUqcK2jQClq_nEGOUopp6xTKkpQ05bp4APx0Qwh6ehwvg0j8SyfLQ4b2uT7tGn25M4s7' },
  { id: 'shoe-cover-gloves',    title: 'SHOE COVER & GLOVES',                 icon: Footprints,  color: '#0ea5e9',image: 'https://5.imimg.com/data5/SELLER/Default/2023/8/334215433/AL/KU/TX/4255008/plastic-shoe-cover-500x500.jpg' },
  { id: 'disposable-apron',     title: 'DISPOSABLE APRON',                    icon: Layers,      color: '#0284c7', image: 'https://m.media-amazon.com/images/I/51qMoaxK5gL.jpg' },
  { id: 'disposable-plain-sheet',title: 'DISPOSABLE PLAIN SHEET / BED SHEET', icon: Activity,    color: '#0369a1',image: 'https://tiimg.tistatic.com/fp/1/006/490/highly-reliable-disposable-bed-833.jpg'},
  { id: 'health-hygine',        title: 'HEALTH & HYGINE',                     icon: HeartPulse,  color: '#0c4a6e',  image: 'https://assets.medpagetoday.net/media/images/107xxx/107053.jpg' },
  { id: 'salon-spa',            title: 'SALON & SPA',                         icon: Sparkles,    color: '#075985',image: 'https://m.media-amazon.com/images/I/61mJbGIANsL._AC_UY1100_.jpg'},
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
        style={{ backgroundImage: `url("${cat.image}")`, transform: 'translateZ(-20px) scale(1.1)' }}
      />
      <div className="cat-card-overlay-pro" style={{ transform: 'translateZ(50px)' }}>
        <div className="cat-card-glass">
          <div className="cat-card-icon-pro" style={{ background: cat.color }}>
            <cat.icon size={22} color="white" />
          </div>
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

            <motion.div
              className="hero-divider"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '80px', opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />

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
