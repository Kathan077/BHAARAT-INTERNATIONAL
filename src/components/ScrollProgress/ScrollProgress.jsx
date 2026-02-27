import React, { useEffect, useRef } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width    = `${pct}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="sp">
      <div ref={barRef} className="sp__bar" />
    </div>
  );
};

export default ScrollProgress;
