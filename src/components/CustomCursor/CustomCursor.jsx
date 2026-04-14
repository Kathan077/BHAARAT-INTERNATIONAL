import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

/* ─────────────────────────────────────────────
   BHAARAT INTERNATIONAL — PROFESSIONAL CURSOR
   • Blue glowing dot
   • Elastic spring ring with globe orbit
   • Speed-based spark trail (Blue/White)
   • Shockwave click burst
───────────────────────────────────────────── */

class Spark {
  constructor(x, y, isBurst = false) {
    const angle = Math.random() * Math.PI * 2;
    const force = isBurst ? (Math.random() * 8 + 3) : (Math.random() * 3 + 1);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * force;
    this.vy = Math.sin(angle) * force - (isBurst ? 1.5 : 0.8);
    this.r = Math.random() * 2 + 0.5;
    this.life = 1;
    this.decay = Math.random() * 0.025 + 0.01;
    this.phase = Math.random() * Math.PI * 2;
    this.twinkleSpeed = Math.random() * 0.3 + 0.1;
    const colors = ['#3b82f6', '#93c5fd', '#ffffff', '#1e3a8a'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.03;
    this.vx *= 0.98;
    this.phase += this.twinkleSpeed;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const alpha = (Math.sin(this.phase * 5) * 0.4 + 0.6) * this.life;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

class Orbit {
  constructor() { this.angle = 0; }

  draw(ctx, x, y, r, speed) {
    this.angle += 0.04 + speed * 0.001;
    ctx.save();
    ctx.translate(x, y);

    // Faint globe ellipses
    ctx.strokeStyle = 'rgba(59,130,246,0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * (0.3 + i * 0.3), this.angle * 0.4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Sweeping arc
    ctx.beginPath();
    ctx.arc(0, 0, r + 6, this.angle, this.angle + 1.2);
    ctx.strokeStyle = 'rgba(59,130,246,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }
}

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const [state, setState] = useState('default');

  useEffect(() => {
    const isTouchOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(any-pointer: fine)').matches;
    if (isTouchOnly) return;

    const dot    = dotRef.current;
    const ring   = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d');
    const mouse  = { x: -400, y: -400 };
    const ringP  = { x: -400, y: -400 };
    const prev   = { x: -400, y: -400 };
    const sparks = [];
    const orbits = new Orbit();

    let speed = 0, sparkAcc = 0, raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      speed  = Math.hypot(e.clientX - prev.x, e.clientY - prev.y);
      prev.x = mouse.x; prev.y = mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;

      if (dot)    dot.style.opacity    = '1';
      if (ring)   ring.style.opacity   = '1';
      if (canvas) canvas.style.opacity = '1';

      dot.style.transform = `translate(${mouse.x}px,${mouse.y}px)`;

      sparkAcc += speed;
      if (sparkAcc > 12) {
        const count = Math.min(Math.floor(speed / 12) + 1, 3);
        for (let i = 0; i < count; i++) sparks.push(new Spark(mouse.x, mouse.y));
        sparkAcc = 0;
      }
    };

    const onOver = (e) => {
      const el = e.target.closest('a, button, input, textarea');
      if (!el)                          return setState('default');
      if (el.matches('input,textarea')) return setState('text');
      setState('hover');
    };

    const onOut  = () => setState('default');
    const onDown = () => {
      setState('click');
      for (let i = 0; i < 14; i++) sparks.push(new Spark(mouse.x, mouse.y, true));
    };
    const onUp   = () => setState('default');

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const smooth = speed > 20 ? 0.22 : 0.12;
      ringP.x = lerp(ringP.x, mouse.x, smooth);
      ringP.y = lerp(ringP.y, mouse.y, smooth);

      const scale = 1 + Math.min(speed / 120, 0.35);
      ring.style.transform = `translate(${ringP.x}px,${ringP.y}px) scale(${scale})`;

      orbits.draw(ctx, ringP.x, ringP.y, state === 'hover' ? 34 * scale : 20, speed);

      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update(); sparks[i].draw(ctx);
        if (sparks[i].life <= 0) sparks.splice(i, 1);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cur__canvas" />
      <div ref={dotRef}  className={`cur__dot  cur__dot--${state}`} />
      <div ref={ringRef} className={`cur__ring cur__ring--${state}`} />
    </>
  );
};

export default CustomCursor;
