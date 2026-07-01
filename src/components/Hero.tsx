import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import ThreeSphere from './ThreeSphere';

const roles = [
  'Full Stack Developer',
  'AI Enthusiast',
  'Problem Solver',
  'Tech Explorer',
];

// Staggered word animation — each word in the name reveals independently
const NameWord = ({ word, delay }) => {
  const chars = word.split('');
  return (
    <span style={{ display: 'inline-flex', overflow: 'hidden' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    const role = roles[roleIndex];
    if (typing) {
      if (displayed.length < role.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(role.slice(0, displayed.length + 1));
        }, 55);
      } else {
        timerRef.current = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 25);
      } else {
        setRoleIndex(i => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [displayed, typing, roleIndex]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '10+', label: 'Projects' },
    { value: '5+',  label: 'Hackathons' },
    { value: '3',   label: 'Internships' },
  ];

  return (
    <section
      id="home"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--nav-height)',
      }}
    >
      {/* Radial highlight — top center glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '60vh',
          background: 'radial-gradient(ellipse at center top, rgba(124,58,237,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content grid */}
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          width: '100%',
          padding: '0 clamp(24px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: '1.05fr 0.95fr',
          gap: 'clamp(2rem, 4vw, 6rem)',
          alignItems: 'center',
        }}
      >
        {/* ── Left column ───────────────────────── */}
        <div>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: 'clamp(12px, 2vh, 20px)' }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 14px',
                background: 'rgba(124,58,237,0.08)',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: '100px',
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                color: '#a78bfa',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#34d399',
                  boxShadow: '0 0 8px rgba(52,211,153,0.8)',
                  display: 'inline-block',
                  animation: 'pulse-green 2s ease-in-out infinite',
                }}
              />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name — staggered char reveal */}
          <h1
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              marginBottom: 'clamp(10px, 1.8vh, 16px)',
              background: 'linear-gradient(155deg, #ffffff 0%, #e2d5ff 40%, #8b5cf6 75%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            <NameWord word="AASHIKA" delay={0.3} />
            <br />
            <NameWord word="JAIN" delay={0.6} />
          </h1>

          {/* Role typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            style={{
              height: 'clamp(28px, 4vh, 38px)',
              display: 'flex',
              alignItems: 'center',
              marginBottom: 'clamp(10px, 2vh, 18px)',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                color: '#8b5cf6',
                fontWeight: 600,
                letterSpacing: '0.01em',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {displayed}
              <span
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '1.1em',
                  background: '#a78bfa',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  animation: 'pulse-violet 1s ease-in-out infinite',
                }}
              />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={{
              fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
              color: '#64748b',
              lineHeight: 1.75,
              marginBottom: 'clamp(18px, 3vh, 28px)',
              maxWidth: '460px',
              fontWeight: 400,
            }}
          >
            Building intelligent solutions and modern digital experiences.
            Turning ideas into{' '}
            <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>
              clean, purposeful code
            </span>
            .
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: 'clamp(20px, 3.5vh, 36px)' }}
          >
            <button
              onClick={() => scrollTo('projects')}
              className="btn-primary"
            >
              View Projects <ArrowRight size={15} />
            </button>

            <a
              href="/resume.pdf"
              download
              className="btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              <Download size={14} /> Resume
            </a>

            <button
              onClick={() => scrollTo('contact')}
              className="btn-ghost"
            >
              <Mail size={14} /> Contact
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            style={{
              display: 'flex',
              gap: 'clamp(20px, 4vw, 40px)',
              paddingTop: 'clamp(16px, 2.5vh, 24px)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {stats.map((s, i) => (
              <div key={s.label}>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: '#4a5568',
                    marginTop: '4px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column — 3D Sphere ───────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            maxHeight: 'calc(100vh - var(--nav-height) - 80px)',
          }}
        >
          <ThreeSphere />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        onClick={() => scrollTo('about')}
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'none',
        }}
      >
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#2d3748', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '36px',
            background: 'linear-gradient(180deg, rgba(124,58,237,0.6), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
