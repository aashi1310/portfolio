import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Particle background
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.fill();
      }

      // Draw connecting lines for nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / 100) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // Progress simulation
    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 4 + 1;
      current = Math.min(100, current + increment);
      setProgress(Math.floor(current));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onFinish, 800);
        }, 300);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#030712',
            zIndex: 99997,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          />

          {/* Glow blobs */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            top: '20%',
            left: '30%',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
            bottom: '20%',
            right: '30%',
            filter: 'blur(60px)',
          }} />

          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 2rem',
                borderRadius: '50%',
                border: '2px solid rgba(139, 92, 246, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(139,92,246,0.2)',
                background: 'rgba(139, 92, 246, 0.08)',
                position: 'relative',
              }}
            >
              <span style={{
                fontSize: '2rem',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>A</span>
              {/* Spinning ring */}
              <div style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '50%',
                border: '1px solid transparent',
                borderTopColor: '#8B5CF6',
                borderRightColor: 'rgba(139,92,246,0.3)',
                animation: 'spin 2s linear infinite',
              }} />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 900,
                letterSpacing: '0.3em',
                fontFamily: 'Outfit, Inter, sans-serif',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #ffffff 0%, #8B5CF6 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                marginBottom: '0.5rem',
              }}>
                AASHIKA JAIN
              </div>
              <div style={{
                fontSize: '0.85rem',
                letterSpacing: '0.4em',
                color: '#94A3B8',
                textTransform: 'uppercase',
                marginBottom: '3rem',
              }}>
                Full Stack Developer · AI Enthusiast
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ width: '300px', margin: '0 auto' }}
            >
              <div style={{
                height: '2px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '1rem',
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #8B5CF6, #A855F7)',
                  boxShadow: '0 0 10px rgba(139,92,246,0.8)',
                  borderRadius: '4px',
                  transition: 'width 0.1s ease',
                }} />
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: '#8B5CF6',
                letterSpacing: '0.2em',
                fontFamily: 'monospace',
              }}>
                {progress < 100 ? `LOADING... ${progress}%` : 'READY'}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
