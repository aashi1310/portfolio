import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let rafId;
    let hovering = false;
    let clicking = false;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    const onDown = () => { clicking = true; };
    const onUp   = () => { clicking = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    // Attach to all interactive elements
    const attach = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    function tick() {
      if (!dotRef.current || !ringRef.current) return;

      // Dot: instant
      dotRef.current.style.left  = `${mouseX}px`;
      dotRef.current.style.top   = `${mouseY}px`;

      // Ring: lagged lerp
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ringRef.current.style.left = `${ringX}px`;
      ringRef.current.style.top  = `${ringY}px`;

      // Scale states
      const dotScale  = clicking ? 0.5 : hovering ? 0 : 1;
      const ringScale = clicking ? 0.8 : hovering ? 1.8 : 1;

      dotRef.current.style.transform  = `translate(-50%, -50%) scale(${dotScale})`;
      ringRef.current.style.transform = `translate(-50%, -50%) scale(${ringScale})`;

      if (hovering) {
        ringRef.current.style.borderColor = 'rgba(167, 139, 250, 0.7)';
        ringRef.current.style.background  = 'rgba(124, 58, 237, 0.06)';
      } else {
        ringRef.current.style.borderColor = 'rgba(167, 139, 250, 0.4)';
        ringRef.current.style.background  = 'transparent';
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#a78bfa',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'transform 0.1s ease',
          willChange: 'transform, left, top',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          border: '1px solid rgba(167, 139, 250, 0.4)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'transform 0.2s ease, border-color 0.2s ease, background 0.2s ease',
          willChange: 'transform, left, top',
        }}
      />
    </>
  );
}
