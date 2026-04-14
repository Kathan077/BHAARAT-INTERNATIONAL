import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Award, ShieldCheck,
  Facebook, Linkedin, Twitter, Instagram, ArrowUpRight
} from 'lucide-react';
import logo from '../../assets/BHAARAT_International_Logo_No_BG.png';
import './Footer.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
};

const SOCIAL_LINKS = [
  { Icon: Facebook,  href: '#', label: 'Facebook'  },
  { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { Icon: Twitter,   href: '#', label: 'Twitter'   },
  { Icon: Instagram, href: '#', label: 'Instagram' },
];

const FOOTER_LINKS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us',         href: '/about'      },
      { label: 'Our Services',     href: '/#services'  },
      { label: 'Quality Standards',href: '/#quality'   },
      { label: 'Global Presence',  href: '/#about'     },
    ]
  },
  {
    title: 'Products',
    links: [
      { label: 'Ply Face Mask',        href: '/products' },
      { label: 'Head Cap',             href: '/products' },
      { label: 'Shoe Cover & Gloves',  href: '/products' },
      { label: 'Disposable Apron',     href: '/products' },
    ]
  }
];

const CERTS = [
  { Icon: ShieldCheck, label: 'UDYAM Registered'   },
  { Icon: Award,       label: 'Govt. Certified IE' },
];

const Col = ({ children, index }) => (
  <motion.div
    className="footer__col"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    custom={index}
    variants={fadeUp}
  >
    {children}
  </motion.div>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">

          {/* ── Brand ── */}
          <Col index={0}>
            <div className="footer__logo-wrap">
              <img src={logo} alt="Bhaarat International" className="footer__logo-img" />
            </div>

            <p className="footer__description">
              Specialising in the export and import of high-quality surgical and medical
              consumable products — delivering reliable healthcare solutions to global markets.
            </p>

            <div className="footer__socials">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="footer__social-link"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </Col>

          {/* ── Contact ── */}
          <Col index={1}>
            <h4 className="footer__title">Contact Us</h4>
            <ul className="footer__info">
              <li className="footer__info-item">
                <MapPin className="footer__info-icon" size={16} />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
              <li className="footer__info-item">
                <Mail className="footer__info-icon" size={16} />
                <a href="mailto:bhaaratinternational@zohomail.in">
                  bhaaratinternational@zohomail.in
                </a>
              </li>
              <li className="footer__info-item">
                <Phone className="footer__info-icon" size={16} />
                <a href="tel:+919825275668">+91 98252 75668</a>
              </li>
            </ul>
          </Col>

          {/* ── Nav link groups ── */}
          {FOOTER_LINKS.map((group, i) => (
            <Col key={group.title} index={i + 2}>
              <h4 className="footer__title">{group.title}</h4>
              <ul className="footer__links">
                {group.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link to={href} className="footer__link">
                      <ArrowUpRight size={12} className="footer__link-arrow" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>
          ))}

          {/* ── Certifications ── */}
          <Col index={4}>
            <h4 className="footer__title">Certifications</h4>
            <div className="footer__certs">
              {CERTS.map(({ Icon, label }) => (
                <div key={label} className="footer__cert-item">
                  <Icon size={18} className="footer__cert-icon" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Col>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer__bottom">
          <p>© {year} Bhaarat International. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;