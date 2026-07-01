import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);
  const canvasRef               = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.4,
        vy:    (Math.random() - 0.5) * 0.4,
        size:  Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.15,
      });
    }

    let alive = true;  // guard flag — prevents post-unmount access
    let animId;

    const tick = () => {
      if (!alive) return;  // stop if unmounted
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
        ctx.fill();
      }

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${(1 - d / 90) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    // Progress simulation
    let current = 0;
    const interval = setInterval(() => {
      if (!alive) return;
      current = Math.min(100, current + Math.random() * 4 + 1);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (!alive) return;
          setDone(true);
          setTimeout(onFinish, 700);
        }, 300);
      }
    }, 40);

    return () => {
      alive = false;  // prevent any future canvas access
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#04030a',
            zIndex: 99997,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

          {/* Nebula glow */}
          <div
            style={{
              position: 'absolute',
              width: '500px', height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)',
              filter: 'blur(60px)',
              top: '15%', left: '25%',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: '72px', height: '72px',
                margin: '0 auto 2rem',
                borderRadius: '20px',
                border: '1px solid rgba(124,58,237,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 40px rgba(124,58,237,0.4)',
                background: 'rgba(124,58,237,0.08)',
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.04em',
                }}
              >
                AJ
              </span>
              <div
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '26px',
                  border: '1px solid transparent',
                  borderTopColor: 'rgba(124,58,237,0.8)',
                  borderRightColor: 'rgba(124,58,237,0.3)',
                  animation: 'spin-slow 2s linear infinite',
                }}
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 60%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '8px',
                }}
              >
                Aashika Jain
              </div>
              <div
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.25em',
                  color: '#4a5568',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '2.5rem',
                }}
              >
                Full Stack Developer · AI Enthusiast
              </div>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ width: '240px', margin: '0 auto' }}
            >
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '10px',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                    boxShadow: '0 0 8px rgba(124,58,237,0.8)',
                    borderRadius: '4px',
                    transition: 'width 0.08s ease',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  color: '#7c3aed',
                  letterSpacing: '0.2em',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {progress < 100 ? `${progress}%` : 'READY'}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
