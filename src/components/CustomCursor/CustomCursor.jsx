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
  constructor(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 0.5;
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 0.6;
    this.r = Math.random() * 2 + 1;
    this.life = 1;
    this.decay = Math.random() * 0.03 + 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.r *= 0.95;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;

    ctx.save();
    ctx.globalAlpha = this.life * 0.8;
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 2);
    grad.addColorStop(0, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.4, 'rgba(96,239,255,0.6)');
    grad.addColorStop(1, 'rgba(0,86,179,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 2, 0, Math.PI * 2);
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
    if (window.matchMedia('(pointer: coarse)').matches) return;

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

      dot.style.transform = `translate(${mouse.x}px,${mouse.y}px)`;

      sparkAcc += speed;
      if (sparkAcc > 10) {
        sparks.push(new Spark(mouse.x, mouse.y));
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
    const onDown = () => setState('click');
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