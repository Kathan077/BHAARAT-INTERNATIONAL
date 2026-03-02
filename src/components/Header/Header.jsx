import React, { useState, useEffect } from 'react';
import logo from '../../assets/BHAARAT_International_Logo_No_BG.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  Search,
  ArrowRight,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  MapPin,
  Shield,
  User,
  Footprints,
  Layers,
  Activity,
  HeartPulse,
  Sparkles
} from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const productCategories = [
    {
      id: 'ply-face-mask',
      title: 'PLY FACE MASK',
      icon: Shield,
      items: ['Elastic Mask', 'B/W Mask', 'IIR Mask', 'Kids Mask', 'Tie-On Mask', 'Pull Out Mask']
    },
    {
      id: 'disposable-face-mask',
      title: 'Disposable FACE MASK',
      icon: ShieldCheck,
      items: ['N95 Ear Loop', 'N95 Head Loop', 'KF 94 Mask', 'Dust Mask', 'Kids N95 Mask', 'Cup Mask']
    },
    {
      id: 'head-cap',
      title: 'HEAD CAP',
      icon: User,
      items: ['Examination Lights', 'Bouffant Cap', 'Surgeon Cap', 'Beard Cap', 'Chef Cap', 'Hood Cap', 'Shower Cap', 'Ear Cap', 'Customize Cap', 'Nylon Cap']
    },
    {
      id: 'shoe-cover-gloves',
      title: 'SHOE COVER & GLOVES',
      icon: Footprints,
      items: ['Disposable Shoe Covers', 'Plastic Shoe Covers', 'Knee-Length Shoe Covers', 'Latex Gloves', 'Nitrile Gloves', 'Surgical Gloves', 'Plastic Gloves', 'Veterinary Gloves', 'Hand Sleeves']
    },
    {
      id: 'disposable-apron',
      title: 'DISPOSABLE APRON',
      icon: Layers,
      items: ['Plastic', 'NON WOVEN']
    },
    {
      id: 'disposable-plain-sheet',
      title: 'DISPOSABLE PLAIN SHEET / BED SHEET',
      icon: Activity,
      items: ['Lab Coat', 'Coverall', 'Dead Body Cover', 'Non-Woven Bed Sheet', 'Plastic Bed Sheet', 'Bed Rol', 'Scrub Suit', 'Shorts', 'Protective Gown']
    },
    {
      id: 'health-hygine',
      title: 'HEALTH & HYGINE',
      icon: HeartPulse,
      items: ['Underpads']
    },
    {
      id: 'salon-spa',
      title: 'SALON & SPA',
      icon: Sparkles,
      items: ['Salon Apron', 'Spa Gown', 'Wax Strips', 'Bed Sheet', 'Wrap', 'Non-Woven Brief', 'Spun Lace Brief', 'Disposable Napkin', 'Disposable Towel', 'Head Bands']
    }
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { 
      name: 'Products', 
      path: '/products',
      isMega: true,
      categories: productCategories
    },
    { name: 'Support', path: '/Support' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileSub = (index) => {
    setMobileExpanded(mobileExpanded === index ? null : index);
  };

  const sidebarVariants = {
    closed: { x: '100%' },
    open: { 
      x: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const navContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Bar - Desktop Only */}
      <motion.div 
        className="top-bar desktop-only"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="container top-bar-content">
          <div className="contact-info">
            <a href="mailto:info@bhaarat.com" className="contact-item">
              <Mail size={14} strokeWidth={2.5} /> <span>info@bhaarat.com</span>
            </a>
            <a href="tel:+919876543210" className="contact-item">
              <Phone size={14} strokeWidth={2.5} /> <span>+91 98765 43210</span>
            </a>
          </div>
          <div className="top-links">
            <a href="#certifications" className="top-link-item">
              <ShieldCheck size={14} strokeWidth={2.5} /> Certifications
            </a>
            <a href="#global" className="top-link-item">
              <Globe size={14} strokeWidth={2.5} /> Global Presence
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <div className="container nav-content">
          <motion.div 
            className="logo-wrapper"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/" className="logo">
              <img src={logo} alt="Bhaarat International" className="logo-img" />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.ul 
            className="nav-menu desktop-only"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.name}
                variants={itemVariants}
                onMouseEnter={() => (link.dropdown || link.isMega) && setActiveDropdown(index)}
                onMouseLeave={() => (link.dropdown || link.isMega) && setActiveDropdown(null)}
              >
                <Link to={link.path} className={window.location.pathname === link.path ? 'active' : ''}>
                  {link.name} 
                  {(link.dropdown || link.isMega) && <ChevronDown size={14} className={`chevron ${activeDropdown === index ? 'rotate' : ''}`} />}
                </Link>
                
                {link.isMega && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div 
                        className="mega-menu"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="container mega-menu-grid">
                          {link.categories.map((cat, idx) => (
                            <Link 
                              key={idx} 
                              to={`/products#${cat.id}`} 
                              className="mega-column-link"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="mega-column">
                                <div className="mega-category-header">
                                  <div className="mega-icon-wrapper">
                                    <cat.icon size={20} strokeWidth={2.5} />
                                  </div>
                                  <h4 className="mega-title">{cat.title}</h4>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === index && (
                      <motion.div 
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {link.dropdown.map(subItem => (
                          <a href="#" key={subItem.name} className="dropdown-item">
                            <div className="drop-item-content">
                              <span className="drop-name">{subItem.name}</span>
                              <span className="drop-desc">{subItem.desc}</span>
                            </div>
                            <ArrowRight size={14} className="arrow" />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
                </motion.li>
              ))}
            </motion.ul>

          <motion.div 
            className="nav-actions"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <button className="search-btn desktop-only" aria-label="Search">
              <Search size={20} />
            </button>
            <motion.a 
              href="#quote" 
              className="btn btn-primary btn-pro desktop-only"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Quote
            </motion.a>
            <button 
              className="mobile-toggle-btn" 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Mobile Sidebar - Clear & Structured */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="mobile-overlay-wrapper">
            <motion.div 
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.aside 
              className="mobile-drawer"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="drawer-header">
                <div className="logo">
                  <img src={logo} alt="Bhaarat International" className="logo-img" />
                </div>
                <button className="drawer-close" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={28} />
                </button>
              </div>

              <div className="drawer-body">
                <nav className="mobile-navigation">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.name} variants={itemVariants} className="mobile-nav-item">
                      <div className="mobile-link-row">
                        <Link to={link.path} onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}>
                          {link.name}
                        </Link>
                        {link.dropdown && (
                          <button 
                            className={`expand-btn ${mobileExpanded === i ? 'active' : ''}`}
                            onClick={() => toggleMobileSub(i)}
                          >
                            <ChevronDown size={20} />
                          </button>
                        )}
                        {link.isMega && (
                          <button 
                            className={`expand-btn ${mobileExpanded === i ? 'active' : ''}`}
                            onClick={() => toggleMobileSub(i)}
                          >
                            <ChevronDown size={20} />
                          </button>
                        )}
                      </div>
                      
                      {link.dropdown && (
                        <AnimatePresence>
                          {mobileExpanded === i && (
                            <motion.div 
                              className="mobile-submenu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              {link.dropdown.map(sub => (
                                <a key={sub.name} href="#" onClick={() => setIsMobileMenuOpen(false)}>
                                  {sub.name}
                                </a>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {link.isMega && (
                        <AnimatePresence>
                          {mobileExpanded === i && (
                            <motion.div 
                              className="mobile-mega-menu"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              {link.categories.map((cat, catIdx) => (
                                <Link 
                                  key={catIdx} 
                                  to={`/products#${cat.id}`}
                                  className="mobile-cat-group-link"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className="mobile-cat-header">
                                    <cat.icon size={18} strokeWidth={2.5} className="mobile-cat-icon" />
                                    <div className="mobile-cat-title">{cat.title}</div>
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="drawer-footer">
                <div className="drawer-contact">
                  <div className="contact-row">
                    <Phone size={18} /> <span>+91 98765 43210</span>
                  </div>
                  <div className="contact-row">
                    <Mail size={18} /> <span>info@bhaarat.com</span>
                  </div>
                </div>
                
                <div className="drawer-socials">
                  <a href="#"><Linkedin size={22} /></a>
                  <a href="#"><Instagram size={22} /></a>
                  <a href="#"><Facebook size={22} /></a>
                </div>

                <a href="#quote" className="btn btn-primary btn-block btn-pro" onClick={() => setIsMobileMenuOpen(false)}>
                  Get a Free Quote
                </a>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
