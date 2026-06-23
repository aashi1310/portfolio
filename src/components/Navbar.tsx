import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ scrollProgress }: { scrollProgress: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find active section
      const sections = navItems.map(n => n.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'rgba(255,255,255,0.05)',
        zIndex: 10000,
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #8B5CF6, #A855F7)',
            boxShadow: '0 0 10px rgba(139,92,246,0.8)',
            scaleX: scrollProgress / 100,
            transformOrigin: 'left',
          }}
        />
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          top: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9990,
          width: '95%',
          maxWidth: '1100px',
        }}
      >
        <div style={{
          background: scrolled ? 'rgba(3, 7, 18, 0.85)' : 'rgba(3, 7, 18, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.15)',
          borderRadius: '16px',
          padding: '12px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled ? '0 8px 32px rgba(139,92,246,0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollTo('#home')}
            style={{ cursor: 'none' }}
          >
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
            }}>AJ</span>
          </motion.div>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="hidden md:flex">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: active === item.href.slice(1) ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  border: active === item.href.slice(1) ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  color: active === item.href.slice(1) ? '#A855F7' : '#94A3B8',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  cursor: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: active === item.href.slice(1) ? '0 0 15px rgba(139,92,246,0.2)' : 'none',
                }}
                onMouseEnter={e => {
                  if (active !== item.href.slice(1)) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (active !== item.href.slice(1)) {
                    (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8';
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: '8px',
              padding: '8px',
              color: '#A855F7',
              cursor: 'none',
            }}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                marginTop: '8px',
                background: 'rgba(3, 7, 18, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '16px',
                padding: '12px',
              }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 16px',
                    color: active === item.href.slice(1) ? '#A855F7' : '#94A3B8',
                    fontSize: '0.9rem',
                    background: active === item.href.slice(1) ? 'rgba(139,92,246,0.1)' : 'transparent',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'none',
                    marginBottom: '4px',
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
