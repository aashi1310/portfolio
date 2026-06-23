import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let particleList: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hoverable = el?.closest('button, a, [data-cursor-hover]');
      setIsHovering(!!hoverable);
    };

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 12; i++) {
        particleList.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          life: 1,
          maxLife: 1,
          size: Math.random() * 4 + 2,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp cursor
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      // Update cursor DOM element
      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${target.current.x}px`;
        dotRef.current.style.top = `${target.current.y}px`;
      }

      // Draw particles
      particleList = particleList.filter(p => p.life > 0);
      for (const p of particleList) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= 0.03;

        const alpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
      {/* Outer ring */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: isHovering ? '50px' : '30px',
          height: isHovering ? '50px' : '30px',
          borderRadius: '50%',
          border: `1.5px solid rgba(139, 92, 246, ${isHovering ? 0.9 : 0.6})`,
          boxShadow: isHovering
            ? '0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(139,92,246,0.4)'
            : '0 0 10px rgba(139,92,246,0.4)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
          background: isHovering ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
          boxShadow: '0 0 10px rgba(139,92,246,1)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
    </>
  );
}
