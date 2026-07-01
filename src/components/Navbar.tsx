import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About',        id: 'about' },
  { label: 'Skills',       id: 'skills' },
  { label: 'Experience',   id: 'experience' },
  { label: 'Projects',     id: 'projects' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact',      id: 'contact' },
];

export default function Navbar({ scrollProgress }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [mobileOpen, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const observers = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobile(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: '2px',
          zIndex: 10000,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
            boxShadow: '0 0 10px rgba(124,58,237,0.6)',
            transition: 'width 0.1s ease',
          }}
        />
      </div>

      <nav
        style={{
          position: 'fixed',
          top: 2, left: 0, right: 0,
          height: 'var(--nav-height)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(20px, 5vw, 80px)',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled
            ? 'rgba(4, 3, 10, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.05)'
            : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          style={{
            background: 'none', border: 'none', padding: 0,
            cursor: 'none', marginRight: 'auto',
          }}
        >
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 900,
              fontSize: '1.2rem',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            AJ<span style={{ color: '#7c3aed', WebkitTextFillColor: '#7c3aed' }}>.</span>
          </span>
        </button>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px 14px',
                cursor: 'none',
                fontSize: '0.82rem',
                fontWeight: active === id ? 600 : 400,
                color: active === id ? '#a78bfa' : '#64748b',
                letterSpacing: '0.01em',
                position: 'relative',
                transition: 'color 0.2s ease',
                fontFamily: 'Inter, sans-serif',
                borderRadius: '8px',
              }}
              onMouseEnter={e => {
                if (active !== id) e.currentTarget.style.color = '#94a3b8';
              }}
              onMouseLeave={e => {
                if (active !== id) e.currentTarget.style.color = '#64748b';
              }}
            >
              {label}
              {active === id && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: '14px',
                    right: '14px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, #7c3aed, #a78bfa, transparent)',
                    borderRadius: '2px',
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}

          <button
            onClick={() => scrollTo('contact')}
            className="btn-primary"
            style={{ marginLeft: '8px', fontSize: '0.82rem', padding: '9px 20px' }}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobile(v => !v)}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none', border: 'none', cursor: 'none',
            padding: '8px',
            flexDirection: 'column', gap: '5px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block', width: '22px', height: '1.5px',
                background: '#94a3b8', borderRadius: '2px',
                transition: 'all 0.3s ease',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'scaleX(0)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 'var(--nav-height)',
              left: 0, right: 0,
              background: 'rgba(4,3,10,0.97)',
              backdropFilter: 'blur(20px)',
              zIndex: 9998,
              padding: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {navLinks.map(({ label, id }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'none',
                  padding: '14px 8px',
                  color: active === id ? '#a78bfa' : '#94a3b8',
                  fontSize: '1rem', fontWeight: active === id ? 600 : 400,
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
