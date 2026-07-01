import { useRef, useEffect } from 'react';

// A fixed full-viewport background that creates the continuous dark space feel.
// Each section is transparent, so this shows through everywhere.
export default function GlobalBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rafId;
    let time = 0;
    let alive = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles — two tiers: small ambient + rare bright
    const particles = [];
    for (let i = 0; i < 180; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() < 0.15 ? Math.random() * 1.8 + 0.8 : Math.random() * 0.9 + 0.2,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.12 + 0.02,
        twinkleOffset: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.04,
      });
    }

    // Slow-drifting nebula orbs
    const nebulae = [
      { x: 0.15, y: 0.2,  radius: 0.35, color: [124, 58, 237],  alpha: 0.06, phase: 0 },
      { x: 0.85, y: 0.5,  radius: 0.28, color: [167, 139, 250], alpha: 0.04, phase: 1.5 },
      { x: 0.45, y: 0.85, radius: 0.32, color: [109, 40, 217],  alpha: 0.05, phase: 3.1 },
    ];

    function drawNebulaPass() {
      for (const n of nebulae) {
        const cx = n.x * canvas.width + Math.sin(time * 0.15 + n.phase) * 40;
        const cy = n.y * canvas.height + Math.cos(time * 0.12 + n.phase) * 30;
        const r  = n.radius * Math.min(canvas.width, canvas.height);
        const a  = n.alpha * (0.8 + 0.2 * Math.sin(time * 0.4 + n.phase));

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, `rgba(${n.color.join(',')}, ${a})`);
        grad.addColorStop(0.5, `rgba(${n.color.join(',')}, ${a * 0.4})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    function drawParticles() {
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;

        if (p.y < -2) { p.y = canvas.height + 2; p.x = Math.random() * canvas.width; }
        if (p.x < -2) p.x = canvas.width + 2;
        if (p.x > canvas.width + 2) p.x = -2;

        const twinkle = 0.55 + 0.45 * Math.sin(time * 1.8 + p.twinkleOffset);
        const alpha   = p.alpha * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 210, 255, ${alpha})`;
        ctx.fill();
      }
    }

    function animate() {
      if (!alive) return;
      time += 0.006;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space base
      const baseGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      baseGrad.addColorStop(0,   '#05030e');
      baseGrad.addColorStop(0.5, '#070511');
      baseGrad.addColorStop(1,   '#04030a');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Very subtle grid
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.025)';
      ctx.lineWidth = 1;
      const gs = 56;
      for (let x = 0; x < canvas.width; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      drawNebulaPass();
      drawParticles();

      rafId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      alive = false;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
