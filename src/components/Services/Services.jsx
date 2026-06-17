import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Services.css';

const services = [
  {
    id: 1,
    title: 'ULTRASONIC SEAM SEALED AND SET',
    description: 'ETO sterile, premium surgical gown sets featuring ultrasonic seam sealing for superior fluid barrier protection and clinical safety.',
    image: '/Product_img/ULTRASONIC%20SEAM%20SEALED%20AND%20SET.png',
    color: '#34d399',
    tag: 'Gown Sets',
    link: '/products#gown-set-contents'
  },
  {
    id: 2,
    title: 'DISPOSABLE 3 PLY FACE MASK',
    description: 'High-filtration medical and protective 3-ply face masks with ultra-soft loops, meltblown filter, and fluid-resistant layers.',
    image: '/Product_img/DISPOSABLE%203%20PLY%20FACE%20MASK.png',
    color: '#0ea5e9',
    tag: '3-Ply Masks',
    link: '/products#disposable-3-ply-face-mask'
  },
  {
    id: 3,
    title: 'RESPIRATORY DISPOSABLE FACE MASK',
    description: 'Certified 5-layer N95 and KF94 respirator masks providing premium multi-layer filtration against airborne particulate matter.',
    image: '/Product_img/RESPIRATORY%20DISPOSABLE%20FACE%20MASK.png',
    color: '#f59e0b',
    tag: 'Respirators',
    link: '/products#respiratory-disposable-face-mask'
  },
  {
    id: 4,
    title: 'DISPOSABLE HEAD CAP',
    description: 'Lightweight, breathable bouffant caps, surgeon caps, chef hats, and customized head covers designed for sterile environments.',
    image: '/Product_img/DISPOSABLE%20HEAD%20CAP.png',
    color: '#a855f7',
    tag: 'Head Caps',
    link: '/products#disposable-head-cap'
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


