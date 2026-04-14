import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Stethoscope, Bone, BedDouble, Activity } from 'lucide-react';
import './Services.css';

// Import local images
import faceMaskImg from '../../pages/Products/img/face mask.png';
import headCapImg from '../../pages/Products/img/head cap.jpeg';
import shoesGlovesImg from '../../pages/Products/img/shoes and gloves.png';
import apronImg from '../../pages/Products/img/disposable apron.jpeg';

const services = [
  {
    id: 1,
    icon: Stethoscope,
   
    title: 'Ply Face Mask',
    description:
      'Single-use face masks ensuring hygiene, protection, and ease of use.',
    image: faceMaskImg,
    color: '#0ea5e9',
  },
  {
    id: 2,
    icon: Bone,
  
    title: 'Head Cap',
    description:
      'Comfortable disposable caps for effective hygiene and contamination control.',
    image: headCapImg,
    color: '#34d399',
  },
  {
    id: 3,
    icon: BedDouble,

    title: 'Shoe Cover & Gloves',
    description:
      'Protective wear designed to maintain cleanliness and prevent contamination.',
    image: shoesGlovesImg,
    color: '#f59e0b',
  },
  {
    id: 4,
    icon: Activity,
   
    title: 'Disposable Apron',
    description:
      'Reliable disposable aprons for safe and hygienic work environments.',
    image: apronImg,
    color: '#a78bfa',
  },
];

const VISIBLE = 3;

const cardVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.96, transition: { duration: 0.3 } }),
};

const Services = () => {
  const [start, setStart] = useState(0);
  const [dir, setDir] = useState(1);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const canPrev = start > 0;
  const canNext = start + VISIBLE < services.length;

  const prev = () => { if (canPrev) { setDir(-1); setStart(s => s - 1); } };
  const next = () => { if (canNext) { setDir(1);  setStart(s => s + 1); } };

  const visible = services.slice(start, start + VISIBLE);


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
              Featured Services
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

          {/* Arrow controls */}
          <motion.div
            className="srv__arrows"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              className={`srv__arrow ${!canPrev ? 'srv__arrow--disabled' : ''}`}
              onClick={prev}
              aria-label="Previous"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className={`srv__arrow srv__arrow--active ${!canNext ? 'srv__arrow--disabled' : ''}`}
              onClick={next}
              aria-label="Next"
            >
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* ── Cards row ── */}
        <div className="srv__cards-wrap">
          <AnimatePresence mode="popLayout" custom={dir}>
            {visible.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <motion.div
                  key={svc.id}
                  className="srv__card"
                  custom={dir}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  style={{ '--svc-color': svc.color }}
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
                    <a href="#contact" className="srv__card-link">
                      Enquire Now <ArrowRight size={15} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

     
      </div>
    </section>
  );
};

export default Services;
