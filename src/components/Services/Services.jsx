import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Layers, Activity } from 'lucide-react';
import './Services.css';

const services = [
  {
    id: 1,
    icon: Shield,
    title: 'Medical Disposables',
    description: 'Medical-grade protective wear, including 3-ply and respiratory face masks, head caps, shoe covers, gloves, plain sheets, and salon disposables.',
    image: '/svc-hospital.png',
    color: '#34d399',
    tag: 'Protective Wear',
    link: '/products#disposable-3-ply-face-mask'
  },
  {
    id: 2,
    icon: Layers,
    title: 'Surgical Gowns & Packs',
    description: 'AAMI Level 3 & 4 certified sterile surgical gowns and customized drape packs for Orthopaedic, Cardiology, Gynecology, Urology, and general surgeries.',
    image: '/svc-surgical.png',
    color: '#0ea5e9',
    tag: 'Sterile Gowns',
    link: '/products#surgical-gowns'
  },
  {
    id: 3,
    icon: Activity,
    title: 'Diagnostics & ELISA Kits',
    description: 'Advanced rapid antigen/antibody test devices and ELISA kits for screening Dengue, Malaria, Typhoid, HIV, Hepatitis, Troponin, and other infections.',
    image: '/svc-diagnostic.png',
    color: '#f59e0b',
    tag: 'Rapid Tests',
    link: '/products#diagnostic-kits'
  }
];

const Services = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section className="srv" id="services" ref={sectionRef}>
      {/* Big watermark */}
      <div className="srv__watermark" aria-hidden="true">
        {"Services".split("").map((letter, index) => (
          <span
            key={index}
            className="srv__watermark-letter"
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="container">
        {/* ── Header row ── */}
        <div className="srv__header">
          <div className="srv__header-left">
            <motion.div
              className="srv__eyebrow"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="srv__eyebrow-line" />
              Featured Categories
            </motion.div>

            <motion.h2
              className="srv__heading"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              What <span className="srv__heading-accent">We Do</span>
            </motion.h2>
          </div>
        </div>

        {/* ── Cards row ── */}
        <div className="srv__cards-wrap">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.id}
                className="srv__card"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                style={{ '--svc-color': svc.color }}
                onClick={() => navigate(svc.link)}
              >
                {/* Image */}
                <div className="srv__card-img-wrap">
                  <img src={svc.image} alt={svc.title} className="srv__card-img" />
                  <div className="srv__card-img-overlay" />

                  {/* Tag pill over image */}
                  <span className="srv__card-tag">{svc.tag}</span>

                  {/* Icon circle */}
                  <div className="srv__card-icon-wrap">
                    <Icon size={22} />
                  </div>
                </div>

                {/* Body */}
                <div className="srv__card-body">
                  <h3 className="srv__card-title">{svc.title}</h3>
                  <p className="srv__card-desc">{svc.description}</p>
                  <span className="srv__card-link">
                    Explore Products <ArrowRight size={15} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

