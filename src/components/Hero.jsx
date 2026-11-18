import { useEffect, useRef } from 'react';
import heroBg from '../assets/hero.webp';

export default function Hero() {
  const canvasRef = useRef(null);

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── 3D Weather Particle System ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    /* --- Rain particles --- */
    const RAIN_COUNT = 120;
    const rain = Array.from({ length: RAIN_COUNT }, () => createRain());

    function createRain() {
      const z = Math.random(); // 0 = far, 1 = near
      return {
        x: Math.random() * 2000 - 500,
        y: Math.random() * -1500,
        z,
        speed: 4 + z * 10,
        len: 12 + z * 28,
        opacity: 0.05 + z * 0.15,
        drift: (Math.random() - 0.5) * 0.8,
      };
    }

    /* --- Fog / mist wisps --- */
    const FOG_COUNT = 8;
    const fog = Array.from({ length: FOG_COUNT }, () => createFog());

    function createFog() {
      return {
        x: Math.random() * 2000 - 300,
        y: Math.random() * 1200,
        radius: 150 + Math.random() * 300,
        opacity: 0.02 + Math.random() * 0.04,
        speedX: 0.15 + Math.random() * 0.4,
        speedY: (Math.random() - 0.5) * 0.1,
        phase: Math.random() * Math.PI * 2,
      };
    }

    /* --- Floating luminous orbs --- */
    const ORB_COUNT = 25;
    const orbs = Array.from({ length: ORB_COUNT }, () => createOrb());

    function createOrb() {
      const z = Math.random();
      return {
        x: Math.random() * 2000,
        y: Math.random() * 1200,
        z,
        radius: 1 + z * 3,
        opacity: 0.1 + z * 0.25,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -0.2 - Math.random() * 0.6,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      };
    }

    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t++;

      /* ── Draw fog wisps ── */
      fog.forEach((f) => {
        f.x += f.speedX;
        f.y += f.speedY + Math.sin(t * 0.005 + f.phase) * 0.15;

        if (f.x - f.radius > w + 100) {
          f.x = -f.radius - 100;
          f.y = Math.random() * h;
        }

        const wobble = Math.sin(t * 0.003 + f.phase) * 0.015;
        const currentOpacity = f.opacity + wobble;

        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        grad.addColorStop(0, `rgba(200, 210, 230, ${currentOpacity})`);
        grad.addColorStop(0.5, `rgba(180, 195, 220, ${currentOpacity * 0.4})`);
        grad.addColorStop(1, 'rgba(180, 195, 220, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        // Stretch the fog horizontally for a wispy look
        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.scale(2.5, 1);
        ctx.arc(0, 0, f.radius, 0, Math.PI * 2);
        ctx.restore();
        ctx.fill();
      });

      /* ── Draw rain streaks ── */
      rain.forEach((r) => {
        r.x += r.drift;
        r.y += r.speed;

        if (r.y > h + 50) {
          r.y = Math.random() * -400;
          r.x = Math.random() * (w + 200) - 100;
        }

        // 3D perspective: near particles are brighter & larger
        const scale = 0.5 + r.z * 0.5;
        const len = r.len * scale;

        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x + r.drift * 2, r.y + len);
        ctx.strokeStyle = `rgba(200, 215, 240, ${r.opacity})`;
        ctx.lineWidth = 0.5 + r.z * 1.2;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      /* ── Draw floating orbs ── */
      orbs.forEach((o) => {
        o.x += o.speedX;
        o.y += o.speedY;
        o.pulse += o.pulseSpeed;

        if (o.y < -50) {
          o.y = h + 50;
          o.x = Math.random() * w;
        }
        if (o.x < -50) o.x = w + 50;
        if (o.x > w + 50) o.x = -50;

        const pulseScale = 1 + Math.sin(o.pulse) * 0.3;
        const r = o.radius * pulseScale;
        const currentOpacity = o.opacity * (0.7 + Math.sin(o.pulse) * 0.3);

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r * 4);
        grad.addColorStop(0, `rgba(220, 200, 170, ${currentOpacity})`);
        grad.addColorStop(0.3, `rgba(200, 185, 160, ${currentOpacity * 0.4})`);
        grad.addColorStop(1, 'rgba(200, 185, 160, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(255, 245, 230, ${currentOpacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(o.x, o.y, r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg">
        <img
          src={heroBg}
          alt="Cinematic VFX scene"
        />
      </div>

      {/* 3D Weather Canvas — sits between bg and overlay */}
      <canvas ref={canvasRef} className="hero-weather-canvas" />

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-label">
          <div className="hero-label-line"></div>
          <span>Award-Winning VFX Studio</span>
          <div className="hero-label-line"></div>
        </div>

        <h1 className="hero-title">Where Imagination Meets Reality</h1>

        <p className="hero-subtitle">
          We craft breathtaking visual effects that push the boundaries of storytelling —
          from blockbuster films to immersive digital experiences.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            View Our Work
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button className="btn-secondary" onClick={() => {
            const el = document.getElementById('showreels');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="material-symbols-outlined">play_arrow</span>
            Watch Showreel
          </button>
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToServices}>
        <span>Scroll</span>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
}

