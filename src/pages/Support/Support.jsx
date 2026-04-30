import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  HelpCircle,
  Clock,
  Globe,
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import SEO from '../../components/SEO/SEO';
import './Support.css';

const Support = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const supportCards = [
    {
      icon: Phone,
      title: 'Voice Support',
      desc: 'Connect with our experts',
      action: 'Call Now',
      value: '+91 9825275668',
      color: 'var(--primary-blue)',
      link: 'tel:+919825275668'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      desc: 'Quick chat assistance',
      action: 'Chat Live',
      value: '+91 9825275668',
      color: '#25D366',
      link: 'https://wa.me/919825275668'
    },
    {
      icon: Mail,
      title: 'Email Support',
      desc: 'Detailed inquiries',
      action: 'Send Email',
      value: 'bhaaratinternational@zohomail.in',
      color: '#ef4444',
      link: 'mailto:bhaaratinternational@zohomail.in'
    }
  ];

  const faqs = [
    {
      q: "What certifications do your products hold?",
      a: "Our products are manufactured under rigorous standards and hold certifications including ISO 9001:2015, ISO 13485:2016, and CE markings where applicable."
    },
    {
      q: "Do you offer international shipping?",
      a: "Yes, Bhaarat International exports to over 50 countries with dedicated logistics for global clinical orders."
    },
    {
      q: "Can I request custom product specifications?",
      a: "Absolutely. We specialize in custom manufacturing (GSM, dimensions, branding) for hospital chains and industrial clients."
    }
  ];

  return (
    <div className="support-page-pro">
      <SEO 
        title="Support & Help Center"
        description="Contact Bhaarat International for expert assistance on clinical and industrial medical supply needs."
        url="https://bhaaratinternational.org/support"
      />
      {/* Hero Section */}
      <section className="support-hero">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-content"
          >
            <span className="support-badge">HELP CENTER</span>
            <h1>How can we <span className="highlight">support</span> you?</h1>
            <p>Get expert assistance for your clinical and industrial supply needs.</p>
          </motion.div>
        </div>
      </section>

      {/* Support Cards */}
      <section className="support-channels">
        <div className="container">
          <div className="channels-grid">
            {supportCards.map((card, idx) => (
              <motion.a
                key={idx}
                href={card.link}
                className="channel-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="card-icon-wrapper" style={{ '--card-color': card.color }}>
                  <card.icon size={28} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <div className="card-value">{card.value}</div>
                <div className="card-action">
                  {card.action} <ArrowRight size={16} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & Quick Contact */}
    
      {/* Map Section */}
      <section className="location-map">
        <div className="container">
          <div className="section-header centered">
            <div className="icon-badge"><MapPin size={20} /></div>
            <h2>Our Global Office</h2>
            <p>Visit us for business inquiries and warehouse inspections.</p>
          </div>
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0523456789!2d72.5150822!3d22.9988057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9acd792af75d%3A0x1f6c605f7688e8ae!2sSuprabh%20Apartment!5e0!3m2!1sen!2sin!4v1712644200000!5m2!1sen!2sin" 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhaarat International — E-007 Suprabh Apartment, Vejalpur, Ahmedabad"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="support-trust">
        <div className="container trust-grid">
          <div className="trust-item">
            <ShieldCheck size={32} />
            <h4>Quality Certified</h4>
            <p> MSME & Make in india marking across our entire catalog.</p>
          </div>
          <div className="trust-item">
            <Clock size={32} />
            <h4>Expert Support</h4>
            <p>Available for technical consultations.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
