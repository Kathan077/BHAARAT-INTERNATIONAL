import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import './Quality.css';

const principles = [
  { id: 1, label: 'Customer\nFocus',               icon: '🎯', color: '#0ea5e9', bg: 'linear-gradient(135deg,#0ea5e9,#0284c7)', angle: -90,  desc: 'Understanding and exceeding customer needs to ensure lasting satisfaction.' },
  { id: 2, label: 'Leadership',                    icon: '🏆', color: '#14b8a6', bg: 'linear-gradient(135deg,#14b8a6,#0d9488)', angle: -31,  desc: 'Creating unity of purpose through strong, visionary leadership at all levels.' },
  { id: 3, label: 'Engagement\nof People',         icon: '🤝', color: '#22c55e', bg: 'linear-gradient(135deg,#22c55e,#16a34a)', angle:  29,  desc: 'Empowering competent people at every level to deliver maximum value.' },
  { id: 4, label: 'Process\nApproach',             icon: '⚙️', color: '#84cc16', bg: 'linear-gradient(135deg,#84cc16,#65a30d)', angle:  90,  desc: 'Consistent results through systematic management of interrelated processes.' },
  { id: 5, label: 'Improvement',                   icon: '📈', color: '#facc15', bg: 'linear-gradient(135deg,#facc15,#ca8a04)', angle: 151,  desc: 'Continual improvement at all levels drives performance and sustainability.' },
  { id: 6, label: 'Evidence-Based\nDecisions',     icon: '📊', color: '#f97316', bg: 'linear-gradient(135deg,#f97316,#ea580c)', angle: 211,  desc: 'Decisions based on objective analysis and evaluation of accurate data.' },
  { id: 7, label: 'Relationship\nManagement',      icon: '🌐', color: '#a855f7', bg: 'linear-gradient(135deg,#a855f7,#7c3aed)', angle: 271,  desc: 'Managing stakeholder relationships to sustain long-term shared success.' },
];

const SIZE   = 560;     // stage px
const CX     = SIZE / 2;
const CY     = SIZE / 2;
const R      = 210;     // orbit radius
const SAT_W  = 108;     // satellite circle width/height

const Quality = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [active, setActive] = useState(null);

  return (
    <section className="ql" id="quality" ref={ref}>
      <div className="ql__bg-dot" />

      <div className="container">
        {/* ── Header ── */}
        <div className="ql__hdr">
          <motion.span className="ql__eyebrow"
            initial={{ opacity:0, y:12 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.5 }}>
            <span className="ql__eyebrow-line" />ISO 9001 : 2015
          </motion.span>

          <motion.h2 className="ql__heading"
            initial={{ opacity:0, y:18 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.12, duration:0.55 }}>
            Quality Management <span className="ql__accent">Principles</span>
          </motion.h2>

          <motion.p className="ql__sub"
            initial={{ opacity:0, y:12 }}
            animate={inView ? { opacity:1, y:0 } : {}}
            transition={{ delay:0.22, duration:0.5 }}>
            Our operations follow the 7 pillars of ISO quality management —
            ensuring every product meets the highest international standards.
          </motion.p>
        </div>

        {/* ── Circular diagram ── */}
        <div className="ql__diagram-wrap">
          {/* Fixed-pixel stage — no CSS centering magic needed */}
          <div className="ql__stage" style={{ width: SIZE, height: SIZE }}>

            {/* SVG layer: orbit rings + connector lines */}
            <svg
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible', zIndex:1, pointerEvents:'none' }}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
            >
              {/* Outer orbit */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />
              {/* Inner dashed */}
              <circle cx={CX} cy={CY} r="145" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" strokeDasharray="5 5" />

              {/* Connector lines */}
              {principles.map((p, i) => {
                const rad = (p.angle * Math.PI) / 180;
                const x2  = CX + Math.cos(rad) * (R - SAT_W / 2 - 2);
                const y2  = CY + Math.sin(rad) * (R - SAT_W / 2 - 2);
                return (
                  <motion.line key={p.id}
                    x1={CX} y1={CY} x2={x2} y2={y2}
                    stroke={p.color} strokeWidth="1.5" strokeOpacity="0.4"
                    initial={{ pathLength:0, opacity:0 }}
                    animate={inView ? { pathLength:1, opacity:1 } : {}}
                    transition={{ delay:0.38 + i * 0.08, duration:0.5 }}
                  />
                );
              })}
            </svg>

            {/* Centre circle — positioned at exact pixel centre */}
            <motion.div
              className="ql__center"
              style={{
                position: 'absolute',
                left: CX,
                top:  CY,
                marginLeft: -74,   /* half of 148px width */
                marginTop:  -74,
                zIndex: 10,
              }}
              initial={{ opacity:0, scale:0 }}
              animate={inView ? { opacity:1, scale:1 } : {}}
              transition={{ duration:0.65, delay:0.25, type:'spring', stiffness:180 }}
            >
              <span className="ql__center-label">Quality<br/>Management<br/>Principles</span>
            </motion.div>

            {/* Satellite circles */}
            {principles.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const px  = CX + Math.cos(rad) * R;   // pixel x (from stage origin)
              const py  = CY + Math.sin(rad) * R;   // pixel y
              const ml  = -(SAT_W / 2);             // -54

              return (
                <motion.button
                  key={p.id}
                  className="ql__sat"
                  style={{
                    position:   'absolute',
                    left:       px,
                    top:        py,
                    marginLeft: ml,
                    marginTop:  ml,
                    background: p.bg,
                    zIndex:     5,
                  }}
                  initial={{ opacity:0, scale:0 }}
                  animate={inView ? { opacity:1, scale:1 } : {}}
                  transition={{ delay:0.42 + i * 0.1, duration:0.5, type:'spring', stiffness:200 }}
                  whileHover={{ scale:1.14, transition:{ duration:0.2 } }}
                  whileTap={{ scale:0.95 }}
                  onClick={() => setActive(active === p.id ? null : p.id)}
                >
                  <span className="ql__sat-icon">{p.icon}</span>
                  <span className="ql__sat-label">{p.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── Detail card (click a satellite) ── */}
        <AnimatePresence>
          {active && (() => {
            const p = principles.find(x => x.id === active);
            if (!p) return null;
            return (
              <motion.div key={active} className="ql__detail"
                style={{ borderColor: p.color }}
                initial={{ opacity:0, y:14 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:8 }}
                transition={{ duration:0.26 }}>
                <span className="ql__detail-icon" style={{ background: p.bg }}>{p.icon}</span>
                <div style={{ flex:1 }}>
                  <h3 className="ql__detail-title" style={{ color: p.color }}>{p.label.replace('\n', ' ')}</h3>
                  <p className="ql__detail-desc">{p.desc}</p>
                </div>
                <button className="ql__detail-close" onClick={() => setActive(null)}>✕</button>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* ── Bottom 7-card grid ── */}
        <div className="ql__cards">
          {principles.map((p, i) => (
            <motion.div key={p.id} className="ql__card"
              style={{ '--ql-color': p.color }}
              initial={{ opacity:0, y:24 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.9 + i * 0.07, duration:0.42, ease:'easeOut' }}
              whileHover={{ y:-5, transition:{ duration:0.2 } }}>
              <span className="ql__card-icon" style={{ background: p.bg }}>{p.icon}</span>
              <span className="ql__card-label">{p.label.replace('\n', ' ')}</span>
              <div className="ql__card-bar" style={{ background: p.bg }} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Quality;
