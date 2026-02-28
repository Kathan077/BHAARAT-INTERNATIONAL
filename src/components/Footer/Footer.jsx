import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Award, ShieldCheck, Globe, Calendar, ArrowUpRight, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import logo from '../../assets/BHAARAT_International_Logo_No_BG.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Services', href: '/#services' },
        { label: 'Quality Standards', href: '/#quality' },
        { label: 'Global Presence', href: '/#about' },
      ]
    },
    {
      title: 'Products',
      links: [
        { label: 'Surgical Instruments', href: '#services' },
        { label: 'Orthopedic Implants', href: '#services' },
        { label: 'Hospital Equipment', href: '#services' },
        { label: 'Custom Solutions', href: '#skills' },
      ]
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          
          {/* Brand Column */}
          <motion.div 
            className="footer__brand"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
            <div className="footer__logo-wrap">
              <img src={logo} alt="Bhaarat International Logo" className="footer__logo-img" />
            </div>
            <p className="footer__description">
              A leading name in TRADING and manufacturing of precision surgical instruments 
              and hospital equipment since 2020.
            </p>
            <div className="footer__socials">
              {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  className="footer__social-link"
                  whileHover={{ y: -5, backgroundColor: '#0056b3', color: '#fff' }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div 
            className="footer__col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeUp}
          >
            <h4 className="footer__title">Contact Us</h4>
            <ul className="footer__info">
              <li className="footer__info-item">
                <MapPin className="footer__info-icon" size={18} />
                <span>Ahmedabad, Gujarat, India</span>
              </li>
              <li className="footer__info-item">
                <Mail className="footer__info-icon" size={18} />
                <a href="mailto:bhaaratinternational@gmail.com">bhaaratinternational@gmail.com</a>
              </li>
              <li className="footer__info-item">
                <Calendar className="footer__info-icon" size={18} />
                <span>Est. 2020</span>
              </li>
            </ul>
          </motion.div>

          {/* Quick Links */}
          {footerLinks.map((group, groupIdx) => (
            <motion.div 
              key={group.title}
              className="footer__col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={groupIdx + 2}
              variants={fadeUp}
            >
              <h4 className="footer__title">{group.title}</h4>
              <ul className="footer__links">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="footer__link">
                      {link.label}
                      <ArrowUpRight size={12} className="footer__link-arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Certifications Column */}
          <motion.div 
            className="footer__col"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
          >
            <h4 className="footer__title">Certifications</h4>
            <div className="footer__certs">
              <div className="footer__cert-item">
                <ShieldCheck size={20} className="footer__cert-icon" />
                <span>UDYAM REGISTERED</span>
              </div>
              <div className="footer__cert-item">
                <Award size={20} className="footer__cert-icon" />
                <span>GOVT. CERTIFIED IE</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p>© {currentYear} BHAARAT INTERNATIONAL. All Rights Reserved.</p>
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
