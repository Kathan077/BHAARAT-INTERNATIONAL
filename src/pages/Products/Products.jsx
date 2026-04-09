import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { 
  Shield, 
  ShieldCheck, 
  User, 
  Footprints, 
  Layers, 
  Activity, 
  HeartPulse, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import plyMaskImg from './img/574f8825-f263-4ca7-b64e-e789c940ceff.png';
import disposableMaskImg from './img/67d41f65-7de1-4939-9627-0b72c1c0c178.png';
import headCapImg from './img/51T5LxBX9FL._AC_UF1000,1000_QL80_.jpg';
import shoeGlovesImg from './img/images.jpg';
import apronImg from './img/photorealistic-image-disposable-dental-apron-600nw-2624781783.webp';
import bedSheetImg from './img/2-5.webp';
import healthHygineImg from './img/medical-disposable-underpads-500x500.webp';
import salonSpaImg from './img/images (1).jpg';
import elasticMaskImg from './img/61HG1OdfysL._AC_UY1100_.jpg';
import bwMaskImg from './img/images (2).jpg';
import iirMaskImg from './img/images (3).jpg';
import kidsMaskImg from './img/kids-mask.jpg';
import tieOnMaskImg from './img/tie-on-mask.jpg';
import pullOutMaskImg from './img/pull-out-mask.jpg';
import n95EarLoopImg from './img/n95-earloop.jpg';
import n95HeadLoopImg from './img/n95-headloop.jpg';
import kf94MaskImg from './img/kf94-mask.jpg';
import dustMaskImg from './img/dust-mask.jpg';
import kidsN95MaskImg from './img/kids-n95-mask.jpg';
import cupMaskImg from './img/cup-mask.jpg';

import examLightImg from './img/examination-light.jpg';
import surgeonCapImg from './img/surgeon-cap.jpg';
import beardCapImg from './img/beard-cap.jpg';
import chefCapImg from './img/chef-cap.jpg';
import hoodCapImg from './img/hood-cap.webp';
import showerCapImg from './img/shower-cap.jpg';
import earCapImg from './img/ear-cap.jpg';
import nylonCapImg from './img/nylon-cap.jpg';
import customizeCapImg from './img/customize-cap.jpg';

import dispShoeImg from './img/disposable-shoe-covers.jpg';
import plasticShoeImg from './img/plastic-shoe-covers.jpg';
import kneeShoeImg from './img/knee-length-shoe-covers.jpg';
import latexGloveImg from './img/latex-gloves.jpg';
import nitrileGloveImg from './img/nitrile-gloves.jpg';
import surgicalGloveImg from './img/surgical-gloves.jpg';
import plasticGloveImg from './img/plastic-gloves.jpg';
import vetGloveImg from './img/veterinary-gloves.jpg';
import handSleeveImg from './img/hand-sleeves.jpg';

import plasticApronImg from './img/plastic-apron.png';
import nonWovenApronImg from './img/non-woven-apron.jpg';

import './Products.css';

// --- DATA ---
const productCategories = [
  {
    id: 'ply-face-mask',
    title: 'PLY FACE MASK',
    icon: Shield,
    color: '#3498db',
    image: plyMaskImg,
    items: [
      { name: 'Elastic Mask', image: elasticMaskImg },
      { name: 'B/W Mask', image: bwMaskImg },
      { name: 'IIR Mask', image: iirMaskImg },
      { name: 'Kids Mask', image: kidsMaskImg },
      { name: 'Tie-On Mask', image: tieOnMaskImg },
      { name: 'Pull Out Mask', image: pullOutMaskImg }
    ]
  },
  {
    id: 'disposable-face-mask',
    title: 'Disposable FACE MASK',
    icon: ShieldCheck,
    color: '#17a2b8',
    image: disposableMaskImg,
    items: [
      { name: 'N95 Ear Loop', image: n95EarLoopImg },
      { name: 'N95 Head Loop', image: n95HeadLoopImg },
      { name: 'KF 94 Mask', image: kf94MaskImg },
      { name: 'Dust Mask', image: dustMaskImg },
      { name: 'Kids N95 Mask', image: kidsN95MaskImg },
      { name: 'Cup Mask', image: cupMaskImg }
    ]
  },
  {
    id: 'head-cap',
    title: 'HEAD CAP',
    icon: User,
    color: '#0056b3',
    image: headCapImg,
    items: [
    
      { name: 'Bouffant Cap', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR8wWV24sQZKSmzAq0OaAbPiZB6L0_eeS2Pcz7ckOayUDZXHgX1zRxHupPWVtphKG3affW1TA9YaRHqiY-8EdxAsKC2NXUlYA' },
      { name: 'Surgeon Cap', image: surgeonCapImg },
      { name: 'Beard Cap', image: beardCapImg },
      { name: 'Chef Cap', image: chefCapImg },
      { name: 'Hood Cap', image: hoodCapImg },
      { name: 'Shower Cap', image: showerCapImg },
      { name: 'Ear Cap', image: earCapImg },
      { name: 'Customize Cap', image: customizeCapImg },
      { name: 'Nylon Cap', image: nylonCapImg }
    ]
  },
  {
    id: 'shoe-cover-gloves',
    title: 'SHOE COVER & GLOVES',
    icon: Footprints,
    color: '#0ea5e9',
    image: shoeGlovesImg,
    items: [
      { name: 'Disposable Shoe Covers', image: dispShoeImg },
      { name: 'Plastic Shoe Covers', image: plasticShoeImg },
      { name: 'Knee-Length Shoe Covers', image: kneeShoeImg },
      { name: 'Latex Gloves', image: latexGloveImg },
      { name: 'Nitrile Gloves', image: nitrileGloveImg },
      { name: 'Surgical Gloves', image: surgicalGloveImg },
      { name: 'Plastic Gloves', image: plasticGloveImg },
      { name: 'Veterinary Gloves', image: vetGloveImg },
      { name: 'Hand Sleeves', image: handSleeveImg }
    ]
  },
  {
    id: 'disposable-apron',
    title: 'DISPOSABLE APRON',
    icon: Layers,
    color: '#0284c7',
    image: apronImg,
    items: [
      { name: 'Plastic', image: plasticApronImg },
      { name: 'NON WOVEN', image: nonWovenApronImg }
    ]
  },
  {
    id: 'disposable-plain-sheet',
    title: 'DISPOSABLE PLAIN SHEET / BED SHEET',
    icon: Activity,
    color: '#0369a1',
    image: bedSheetImg,
    items: [
      { name: 'Non-Woven Bed Sheet', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS81_l2QloSpVyJg2IlK0VKiSo76HAUOTmZywbEBiVaoyXxNmRSFzhkllkDs4dujsd3RBwFGh2Hq-CjvKfSL2gdQGgENt7i' },
      { name: 'Plastic Bed Sheet', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTeN561UntYDdL2k7lkmFkK7wNV2rMAOKzU9avcSMkhgaKUTTmr6bZjJbhJQoW49-xBE_6jFpLsWk15t4Yzoa54efGgboLV0wZJdP-48swray6ip0pKy0T68Q' },
      { name: 'Bed Rol', image: 'https://m.media-amazon.com/images/I/31R37l-eOIL._AC_UF1000,1000_QL80_.jpg' }
    ]
  },
  {
    id: 'disposable-apparel',
    title: 'DISPOSABLE APPAREL',
    icon: Layers,
    color: '#1e40af',
    image: apronImg,
    items: [
      { name: 'Lab Coat', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTr_IGDnn2q4uYtOLphIv3Jrwy3gXe0jeFvVLGTiVSnMLIkBozuXtbGJ23o56sHYefdaijImiiD4ho10V_vUPF2spyI4rNGuw' },
      { name: 'Coverall', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSbUldO7yvJ4ondChLq0bJDAd88TOFtz7UvDTmhsJShgysPkZLH3y_wxHJwVAkhjdmi-YCWJFY14RYaCaL-yTf_5g-9SLyjKw' },
      { name: 'Scrub Suit', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTTK_o1ZE1hSkhhJNuzZ2yRGwLt_xpMF6tX_Zu_HKqu8qLQ6Q76jTu-A0VTDj1KXOb1Gy1W5U49_6J6mTdPRLIWnoLzaefBWRoV6UA8nuiOAikaKcM1zA92' },
      { name: 'Protective Gown', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQPAkalvfhmYtbWE_zN8pST3EnqMQnTrdYDkimPxVxuWOkxR4oT13EnGUsqUbplBzMJ8dXpv5XR2t2dnJycpkANBY-6f-pNcxwfpuHDwzFHyrntzT6xsJnmQS8' },
      { name: 'Shorts', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTazevLqAVLrXpT9WCDLJKYxvNUCH8LFczx3B1jAeLdHM2CqU6lXT1-QeCBFWEGCy0SMdC6RJCIj11__Mrmo9aJ2oz-KXJYPA' },
      { name: 'Dead Body Cover', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQOYRmHIcJYLg1Gm14McAIZzh_Pl4GT5AaH-bLTRWqu5EjAvATEvnqj_dbEBkDGn3xznv24NzpJct6gW8XP63gxTDb7e56M' }
    ]
  },
  {
    id: 'health-hygine',
    title: 'HEALTH & HYGINE',
    icon: HeartPulse,
    color: '#0c4a6e',
    image: healthHygineImg,
    items: [
      { name: 'Underpads', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTUg4eKQhziPOETeRe5AGqvieVgRYjxsHbKBNw4zd4ubCzCiHUbFh6DAe9GOBA3664aG7YNOzGUmL9dDLBAVGO8zpF3j4M-3BdHM7SH0dHkZ8arpXOCv1KmQ_8' }
    ]
  },
  {
    id: 'salon-spa',
    title: 'SALON & SPA',
    icon: Sparkles,
    color: '#075985',
    image: salonSpaImg,
    items: [
      { name: 'Salon Apron', image: 'https://rukminim2.flixcart.com/image/1500/1500/xif0q/makeup-apron/j/v/k/pack-of-20-disposable-hair-cutting-aprons-for-salon-spa-parlour-original-imahkm9ngf3nbway.jpeg' },
      { name: 'Spa Gown', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSRWSHMYHDdutO_mqPAUS4NuGqpyv3yZaOVBFtf2Q0kfk_-wb0HI_MwOeUVo0c9VZ863qLLc1h8-qX1c2Vmcc3IUSnbXEcmpXbc-h_Idhyx_J_vSrovsT5gMrs' },
      { name: 'Wax Strips', image: 'https://m.media-amazon.com/images/I/51PamTAOUWL.jpg' },
      { name: 'Bed Sheet', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRkFZF3BwKN89D3rcUyiNvS-Q3rn3d6kQHOhiURtvkMvGQIEpxz0C5SCSTH3Jz0OVLwxSpclJliYpo13sc9nbhP92Dfl_4BPAG8Sx3lSvu6' },
      { name: 'Wrap', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTT3KFHmz75vwMlz1Q2KpJeuDYBUQu5nO8J28Yi0LrFqmEKa7x_MLg34JFh75r5Jnh1bh-DYPryuUdQxiVpVThNzNpKflat' },
      { name: 'Non-Woven Brief', image: 'https://m.media-amazon.com/images/I/61Xom+-IWBL.jpg' },
      { name: 'Spun Lace Brief', image: 'https://m.media-amazon.com/images/I/610YUg8-Z1L.jpg' },
      { name: 'Disposable Napkin', image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRPYsqJZShMv0PRw12IlA4xl4i7xl-Ck3Sq_4Xw5W6LerbK7QrT8gbnKV13jHqMCIageishwElagzrc1F5xy06K5HXma34xwK07T-JJuvhnB-yfICmgCY8Y' },
      { name: 'Disposable Tow Towel', image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvsizdCa7EYP9NsvAItQpXr73HCYocf5PSxq9p2CcoTJcsw6ayriipJAd1c7kSDHys9o4s129-iw7PJ9QcFQ2bRdHmPjeh5lI-u_dV7UYrVdtATUckkN6v' },
      { name: 'Head Bands', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR8-7Z6VVqFHlob0PZHg5G-xR_go-kG-qUzZAZro_hBuf9kXztEZ8ll3aGyhHwJcsUNoGVhetH8Uocgzv-62UPOd6pAdTc' }
    ]
  }
];

// --- COMPONENTS ---

const CategoryCard = ({ cat, idx, setSelectedCategory }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="cat-selection-card-pro"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: idx * 0.1,
        type: "spring",
        damping: 20
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setSelectedCategory(cat);
        window.location.hash = cat.id;
      }}
    >
      <div 
        className="cat-card-image" 
        style={{ 
          backgroundImage: `url("${cat.image}")`,
          transform: "translateZ(-20px) scale(1.1)"
        }} 
      />
      <div className="cat-card-overlay-pro" style={{ transform: "translateZ(50px)" }}>
        <div className="cat-card-glass">
          <div className="cat-card-icon-pro" style={{ background: cat.color }}>
            <cat.icon size={22} color="white" />
          </div>
          <h3>{cat.title}</h3>
          <div className="explore-link">
            Explore Collection <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on every navigation/category change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Handle deep-linking via hash
    const hash = location.hash.slice(1);
    if (hash) {
      const found = productCategories.find(c => 
        c.id === hash || 
        c.title.replace(/\s+/g, '-').toLowerCase() === hash
      );
      if (found) {
        setSelectedCategory(found);
      }
    } else {
      // Reset to grid if no hash (Direct link to /products)
      setSelectedCategory(null);
    }
  }, [location]);

  return (
    <div className="products-page-pro">
      {/* Decorative Background Blobs */}
      <div className="pro-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div 
            key="grid"
            className="category-view-pro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <section className="products-hero-pro">
              <div className="container">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="hero-text-container"
                >
                  <motion.h1 
                    className="hero-title-pro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Product Categories
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "80px", opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="hero-divider"
                  />

                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="hero-subtitle-pro"
                  >
                    Precision-engineered medical supplies for <span className="highlight-text">global healthcare excellence</span>.
                  </motion.p>
                </motion.div>
              </div>
            </section>

            <div className="container grid-container-pro">
              <div className="category-grid-pro">
                {productCategories.map((cat, idx) => (
                  <CategoryCard 
                    key={cat.id} 
                    cat={cat} 
                    idx={idx} 
                    setSelectedCategory={setSelectedCategory} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            className="product-list-view-pro"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <header className="list-header-pro" style={{ '--accent-glow': `${selectedCategory.color}20` }}>
              <div className="container">
                <motion.button 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="back-btn-pro"
                  onClick={() => {
                    setSelectedCategory(null);
                    window.location.hash = '';
                  }}
                >
                  <ArrowLeft size={18} /> BACK TO COLLECTIONS
                </motion.button>
                
                <div className="header-flex-pro">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="cat-badge-pro"
                    style={{ background: selectedCategory.color }}
                  >
                    <selectedCategory.icon size={32} />
                  </motion.div>
                  <div className="header-text-pro">
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {selectedCategory.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Explore our premium medical-grade collection designed for clinical precision.
                    </motion.p>
                  </div>
                </div>
              </div>
            </header>

            <div className="container items-grid-container-pro">
              <div className="items-grid-pro">
                {selectedCategory.items.map((item, i) => (
                  <motion.div 
                    key={i}
                    className="item-card-pro"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -12 }}
                  >
                    <div className="item-visual-pro">
                      {item.image ? (
                        <div 
                          className="item-actual-img" 
                          style={{ 
                            backgroundImage: `url("${item.image}")`,
                            width: '100%',
                            height: '100%',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                          }} 
                        />
                      ) : (
                        <>
                          <div className="item-icon-bg" style={{ color: selectedCategory.color }}>
                            <selectedCategory.icon size={40} strokeWidth={1} />
                          </div>
                          <div className="item-aura" style={{ background: selectedCategory.color }}></div>
                        </>
                      )}
                    </div>
                    <div className="item-content-pro">
                      <h3>{typeof item === 'string' ? item : item.name}</h3>
                      <p>High-precision {selectedCategory.title.toLowerCase()} optimized for medical environments.</p>
                      <button className="item-action-btn-pro">
                        Product Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
