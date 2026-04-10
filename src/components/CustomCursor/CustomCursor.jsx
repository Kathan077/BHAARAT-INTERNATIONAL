import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/* ─────────────────────────────────────────────
   ULTRA PROFESSIONAL CURSOR — LUXURY MODE
   • Elastic spring ring
   • Speed-based stretch
   • Cinematic spark trail
   • Liquid hover expansion
   • Shockwave click burst
───────────────────────────────────────────── */

class Spark {
  constructor(x, y, isBurst = false) {
    const angle = Math.random() * Math.PI * 2;
    const force = isBurst ? (Math.random() * 6 + 2) : (Math.random() * 2.5 + 0.5);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * force;
    this.vy = Math.sin(angle) * force - (isBurst ? 1 : 0.5);
    this.r = Math.random() * 1.5 + 0.2; // Sharper glitter
    this.life = 1;
    this.decay = Math.random() * 0.015 + 0.005; // Longer shelf life
    this.twinkleSpeed = Math.random() * 0.2 + 0.1;
    this.phase = Math.random() * Math.PI * 2;
    this.wander = Math.random() * 0.05 - 0.025;
    
    const colors = [
      { top: 'rgba(52, 152, 219, 1)', mid: 'rgba(52, 152, 219, 0.8)', bot: 'rgba(52, 152, 219, 0)' }, // Blue
      { top: 'rgba(0, 86, 179, 1)', mid: 'rgba(0, 112, 224, 0.7)', bot: 'rgba(0, 44, 95, 0)' }  // Vibrant Bhaarat Blue
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx += Math.sin(this.phase) * this.wander; // Wandering motion
    this.vy += 0.02; // Very light gravity
    this.vx *= 0.99;
    this.phase += this.twinkleSpeed;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;

    // Twinkle flickering
    const flicker = (Math.sin(this.phase * 5) * 0.5 + 0.5) * this.life;
    
    ctx.save();
    ctx.globalAlpha = flicker;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
    grad.addColorStop(0, this.color.top);
    grad.addColorStop(0.3, this.color.mid);
    grad.addColorStop(1, this.color.bot);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [state, setState] = useState('default');

  useEffect(() => {
    // Only disable if device ONLY has touch (no mouse/trackpad at all)
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(any-pointer: fine)').matches;
    if (isTouchOnly) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d');

    const mouse = { x: -400, y: -400 };
    const ringP = { x: -400, y: -400 };
    const prev = { x: -400, y: -400 };
    const sparks = [];

    let speed = 0;
    let sparkAcc = 0;
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      speed = Math.hypot(e.clientX - prev.x, e.clientY - prev.y);
      prev.x = mouse.x;
      prev.y = mouse.y;

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Show elements on first move
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
      if (canvas) canvas.style.opacity = '1';

      dot.style.transform = `translate(${mouse.x}px,${mouse.y}px)`;

      sparkAcc += speed;
      if (sparkAcc > 10) {
        // Lowered density
        const count = Math.min(Math.floor(speed / 10) + 1, 3);
        for(let i=0; i<count; i++) {
          sparks.push(new Spark(mouse.x, mouse.y));
        }
        sparkAcc = 0;
      }
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, input, textarea');
      if (!el) {
        setState('default');
        return;
      }
      if (el.matches('input, textarea')) {
        setState('text');
      } else {
        setState('hover');
      }
    };

    const onOut = () => setState('default');
    const onDown = () => {
      setState('click');
      // Reduced Glitter Explosion
      for(let i=0; i<10; i++) {
        sparks.push(new Spark(mouse.x, mouse.y, true));
      }
    };
    const onUp = () => setState('hover');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const smooth = speed > 20 ? 0.22 : 0.12;

      ringP.x = lerp(ringP.x, mouse.x, smooth);
      ringP.y = lerp(ringP.y, mouse.y, smooth);

      const scale = 1 + Math.min(speed / 120, 0.35);

      ring.style.transform =
        `translate(${ringP.x}px,${ringP.y}px) scale(${scale})`;

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw(ctx);
        if (sparks[i].life <= 0) sparks.splice(i, 1);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cur__canvas" />
      <div ref={dotRef} className={`cur__dot cur__dot--${state}`} />
      <div ref={ringRef} className={`cur__ring cur__ring--${state}`} />
    </>
  );
};

export default CustomCursor;