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
  Twitter
} from 'lucide-react';
import './Header.css';
import { productCategories, navLinks } from './HeaderData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
            <a href="mailto:bhaaratinternational@zohomail.in" className="contact-item">
              <Mail size={14} strokeWidth={2.5} /> <span>bhaaratinternational@zohomail.in</span>
            </a>
            <a href="tel:+919825275668" className="contact-item">
              <Phone size={14} strokeWidth={2.5} /> <span>+91 98252 75668</span>
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
              >
                <Link to={link.path} className={window.location.pathname === link.path ? 'active' : ''}>
                  {link.name} 
                </Link>
                


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
            <button 
              className="search-btn desktop-only" 
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <Link to="/quote" className="btn btn-primary btn-pro desktop-only">
              Contact Us
            </Link>
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
                    <Phone size={18} /> <span>+91 98252 75668</span>
                  </div>
                  <div className="contact-row">
                    <Mail size={18} /> <span>bhaaratinternational@zohomail.in</span>
                  </div>
                </div>
                
                <div className="drawer-socials">
                  <a href="#"><Linkedin size={22} /></a>
                  <a href="#"><Instagram size={22} /></a>
                  <a href="#"><Facebook size={22} /></a>
                </div>

                <Link to="/quote" className="btn btn-primary btn-block btn-pro" onClick={() => setIsMobileMenuOpen(false)}>
                  Get a Free Quote
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container search-container">
              <div className="search-header">
                <div className="search-input-wrapper">
                  <Search size={24} className="search-input-icon" />
                  <input 
                    type="text" 
                    placeholder="Search products, materials, and more..." 
                    className="search-input"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="search-close" onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}>
                  <X size={28} />
                </button>
              </div>

              <div className="search-results">
                {searchQuery.length > 1 && (
                  <div className="results-grid">
                    {productCategories.flatMap(cat => 
                      cat.items.map(item => ({
                        name: typeof item === 'string' ? item : item.name,
                        categoryId: cat.id,
                        categoryTitle: cat.title
                      }))
                    )
                    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((product, idx) => (
                      <motion.div
                        key={idx}
                        className="search-result-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          navigate(`/products#${product.categoryId}`);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        <div className="result-info">
                          <span className="result-name">{product.name}</span>
                          <span className="result-category">in {product.categoryTitle}</span>
                        </div>
                        <ArrowRight size={16} />
                      </motion.div>
                    ))}
                    {productCategories.flatMap(cat => 
                      cat.items.map(item => ({
                        name: typeof item === 'string' ? item : item.name,
                        categoryId: cat.id,
                        categoryTitle: cat.title
                      }))
                    ).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                      <div className="no-results">
                        No products found matching "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
                {searchQuery.length <= 1 && (
                  <div className="search-suggestions">
                    <h5>SUGGESTED CATEGORIES</h5>
                    <div className="suggested-grid">
                      {productCategories.slice(0, 4).map(cat => (
                        <button 
                          key={cat.id} 
                          className="suggested-item"
                          onClick={() => {
                            navigate(`/products#${cat.id}`);
                            setIsSearchOpen(false);
                          }}
                        >
                          {cat.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

  );
};

export default Header;
