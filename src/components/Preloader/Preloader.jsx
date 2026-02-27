import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit'

  useEffect(() => {
    // Phase timeline
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 2000);
    const t3 = setTimeout(() => onFinish(), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <div className={`pl pl--${phase}`}>
      {/* Logo mark */}
      <div className="pl__logo">
        <svg viewBox="0 0 64 64" width="64" height="64" className="pl__icon">
          <circle cx="32" cy="32" r="30" fill="none" stroke="url(#plg)" strokeWidth="3"/>
          <defs>
            <linearGradient id="plg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0056b3"/>
              <stop offset="100%" stopColor="#17a2b8"/>
            </linearGradient>
          </defs>
          <text x="32" y="28" textAnchor="middle" fill="#0056b3" fontSize="9" fontWeight="900" fontFamily="Outfit,sans-serif">BHAARAT</text>
          <text x="32" y="40" textAnchor="middle" fill="#17a2b8" fontSize="6.5" fontWeight="600" fontFamily="Outfit,sans-serif">INTERNATIONAL</text>
        </svg>
        <div className="pl__wordmark">
          <span className="pl__word-b">BHAARAT</span>
          <span className="pl__word-i">INTERNATIONAL</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="pl__bar-wrap">
        <div className={`pl__bar pl__bar--${phase}`} />
      </div>

      {/* Tagline */}
      <p className={`pl__tag pl__tag--${phase}`}>
        Precision. Quality. Trust.
      </p>

      {/* Decorative circles */}
      <div className="pl__circle pl__circle--1" />
      <div className="pl__circle pl__circle--2" />
    </div>
  );
};

export default Preloader;
