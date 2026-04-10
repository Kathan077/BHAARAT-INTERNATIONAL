import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onFinish }) => {
  const [phase,      setPhase]      = useState('enter');
  const [progress,   setProgress]   = useState(0);

  useEffect(() => {
    const t2 = setTimeout(() => setPhase('hold'),   300);
    const t3 = setTimeout(() => setPhase('exit'),   3800);
    const t4 = setTimeout(() => onFinish(),         4600);

    let cur = 0;
    const iv = setInterval(() => {
      cur += Math.random() * 3 + 1;
      if (cur >= 100) { cur = 100; clearInterval(iv); }
      setProgress(Math.round(cur));
    }, 90);

    return () => { [t2,t3,t4].forEach(clearTimeout); clearInterval(iv); };
  }, [onFinish]);

  const label =
    progress < 25  ? 'Initializing logistics…' :
    progress < 55  ? 'Loading medical systems…' :
    progress < 80  ? 'Clearing global transit…' :
    progress < 100 ? 'Final systems check…' :
                     'Transit ready ✦';

  return (
    <div className={`pl-pro pl-pro--${phase}`} aria-hidden="true">
      {/* Dynamic Background */}
      <div className="pl-pro__bg">
        <div className="pl-pro__grid" />
        <div className="pl-pro__glow pl-pro__glow--1" />
        <div className="pl-pro__glow pl-pro__glow--2" />
      </div>

      {/* Header */}
      <header className="pl-pro__hd">
        <div className="pl-pro__name">
          <span className="pl-pro__n1">BHAARAT</span>
          <span className="pl-pro__n2">INTERNATIONAL</span>
        </div>
      </header>

      {/* Main Scene */}
      <div className="pl-pro__scene">
        
        {/* Parallax Laser Lines */}
        <div className="pl-pro__lasers">
          <div className="pl-pro__laser pl-pro__laser--fast" style={{top: '20%'}} />
          <div className="pl-pro__laser pl-pro__laser--med" style={{top: '60%'}} />
          <div className="pl-pro__laser pl-pro__laser--slow" style={{top: '80%'}} />
          <div className="pl-pro__laser pl-pro__laser--fast" style={{top: '30%', opacity: 0.5}} />
        </div>

        {/* Truck Wrapper */}
        <div className="pl-pro__truck">
          
          <svg viewBox="0 0 600 220" className="pl-pro__svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cab-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="trailer-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="window-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="headlight-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ====== CHASSIS ====== */}
            <rect x="50" y="170" width="500" height="12" rx="4" fill="#020617" />
            <rect x="50" y="170" width="500" height="2" fill="rgba(255,255,255,0.05)" />

            {/* ====== TRAILER ====== */}
            {/* Box */}
            <rect x="50" y="30" width="370" height="135" rx="6" fill="url(#trailer-grad)" />
            
            {/* Highlights & Accents */}
            <rect x="52" y="32" width="366" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
            <rect x="50" y="155" width="370" height="4" fill="rgba(56,189,248,0.2)" />
            
            {/* Sleek diagonal cut styling */}
            <polygon points="50,165 420,165 400,100 50,100" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Glowing Brand on Trailer */}
            <g transform="translate(235, 100)">
              <text x="0" y="0" textAnchor="middle" fill="#38bdf8" fontSize="22" fontWeight="900" fontFamily="Outfit, sans-serif" letterSpacing="6" filter="url(#neon-glow)">BHAARAT</text>
              <text x="0" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="700" fontFamily="Outfit, sans-serif" letterSpacing="4">GLOBAL EXPORTS</text>
            </g>

            {/* Medical Cross Accent */}
            <g transform="translate(80, 80)" filter="url(#neon-glow)" opacity="0.8">
              <rect x="8" y="0" width="8" height="24" rx="2" fill="#38bdf8" />
              <rect x="0" y="8" width="24" height="8" rx="2" fill="#38bdf8" />
            </g>

            {/* ====== CAB (Aero design) ====== */}
            {/* Aero deflector roof */}
            <path d="M430,30 L520,70 L530,90 L430,90 Z" fill="url(#cab-grad)" />
            
            {/* Main cab body (Aerodynamic slope) */}
            <path d="M430,90 L530,90 L550,130 L550,170 L430,170 Z" fill="url(#cab-grad)" />
            
            {/* Dark trims */}
            <path d="M430,60 L510,90 L430,90 Z" fill="rgba(0,0,0,0.3)" />
            <rect x="430" y="165" width="120" height="5" fill="#020617" />
            
            {/* Window (Cyan tinted glass) */}
            <path d="M440,95 L525,95 L540,125 L440,125 Z" fill="url(#window-grad)" opacity="0.8" />
            <polygon points="445,100 515,100 520,110 445,110" fill="rgba(255,255,255,0.15)" />

            {/* Headlights */}
            <rect x="546" y="145" width="6" height="15" rx="3" fill="#ffffff" />
            <circle cx="555" cy="152" r="15" fill="#38bdf8" opacity="0.6" filter="url(#headlight-glow)" />
            <polygon points="555,145 700,120 700,180 555,160" fill="rgba(56, 189, 248, 0.15)" />

            {/* Tail lights */}
            <rect x="45" y="145" width="5" height="20" rx="2" fill="#ef4444" filter="url(#neon-glow)" />

            {/* ====== WHEELS ====== */}
            <g className="pl-pro__wheels">
              {/* Function to render high-tech wheel */}
              {[120, 210, 310, 480].map((cx, i) => (
                <g key={i} transform={`translate(${cx}, 180)`}>
                  {/* Tire */}
                  <circle cx="0" cy="0" r="28" fill="#020617" stroke="#1e293b" strokeWidth="3" />
                  {/* Rim */}
                  <circle cx="0" cy="0" r="18" fill="#0f172a" />
                  {/* Glowing brake disc */}
                  <circle cx="0" cy="0" r="12" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />
                  {/* Spinning spokes */}
                  <g className="pl-pro__spin" style={{transformOrigin: '0px 0px'}}>
                    <line x1="0" y1="-18" x2="0" y2="18" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />
                    <line x1="-18" y1="0" x2="18" y2="0" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />
                    <circle cx="0" cy="0" r="4" fill="#ffffff" />
                  </g>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* The glowing grid road */}
        <div className="pl-pro__road" />
      </div>

      {/* Footer / Progress */}
      <footer className="pl-pro__ft">
        <div className="pl-pro__bar">
          <div className="pl-pro__fill" style={{ width: `${progress}%` }}>
            <div className="pl-pro__fill-glow" />
          </div>
        </div>
        <div className="pl-pro__meta">
          <span className="pl-pro__label">{label}</span>
          <span className="pl-pro__pct">{progress}<small>%</small></span>
        </div>
      </footer>
    </div>
  );
};

export default Preloader;
