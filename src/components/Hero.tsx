import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import ThreeSphere from './ThreeSphere';
import resumePdf from '../assets/Aashika_Jain_Resume.pdf';

const roles = [
  'Full Stack Developer',
  'AI Enthusiast',
  'Problem Solver',
  'Tech Explorer',
];

// Character-by-character reveal
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
      className="hero-section"
    >
      {/* Radial glow */}
      <div className="hero-glow" />

      {/* Content grid */}
      <div className="hero-grid">
        {/* Left column */}
        <div className="hero-left">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="hero-badge">
              <span className="availability-dot" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="hero-name">
            <NameWord word="AASHIKA" delay={0.3} />
            <br />
            <NameWord word="JAIN" delay={0.6} />
          </h1>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="hero-role-wrap"
          >
            <span className="hero-role">
              {displayed}
              <span className="hero-cursor" />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="hero-tagline"
          >
            Building intelligent solutions and modern digital experiences.
            Turning ideas into{' '}
            <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>
              clean, purposeful code
            </span>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6 }}
            className="hero-buttons"
          >
            <button onClick={() => scrollTo('projects')} className="btn-primary">
              View Projects <ArrowRight size={15} />
            </button>
            <a href={resumePdf} download className="btn-secondary" style={{ textDecoration: 'none' }}>
              <Download size={14} /> Resume
            </a>
            <button onClick={() => scrollTo('contact')} className="btn-ghost">
              <Mail size={14} /> Contact
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="hero-stats"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right column — 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="hero-3d"
        >
          <ThreeSphere />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        onClick={() => scrollTo('about')}
        className="hero-scroll"
      >
        <span className="hero-scroll-text">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="hero-scroll-line"
        />
      </motion.div>

      {/* Responsive hero styles — all in one block so they're co-located */}
      <style>{`
        .hero-section {
          height: 100vh;
          height: 100dvh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: var(--nav-height);
          box-sizing: border-box;
        }

        .hero-glow {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 55vh;
          background: radial-gradient(ellipse at center top, rgba(124,58,237,0.12) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-grid {
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
          padding: 0 clamp(24px, 5vw, 80px);
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(1.5rem, 3vw, 5rem);
          align-items: center;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px;
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.25);
          border-radius: 100px;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #a78bfa;
          text-transform: uppercase;
          font-family: JetBrains Mono, monospace;
          font-weight: 600;
          margin-bottom: min(1.5vh, 12px);
        }

        .hero-name {
          font-family: Outfit, sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 5.2rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.04em;
          margin-bottom: min(1.5vh, 12px);
          background: linear-gradient(155deg, #ffffff 0%, #e2d5ff 40%, #8b5cf6 75%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-role-wrap {
          height: min(4vh, 34px);
          display: flex;
          align-items: center;
          margin-bottom: min(1.5vh, 12px);
        }

        .hero-role {
          font-size: clamp(0.95rem, 1.8vw, 1.3rem);
          color: #8b5cf6;
          font-weight: 600;
          letter-spacing: 0.01em;
          font-family: Inter, sans-serif;
        }

        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 1.1em;
          background: #a78bfa;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: pulse-violet 1s ease-in-out infinite;
        }

        .hero-tagline {
          font-size: clamp(0.8rem, 1.2vw, 0.95rem);
          color: #64748b;
          line-height: 1.7;
          margin-bottom: min(2vh, 18px);
          max-width: 440px;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: min(2.5vh, 24px);
        }

        .hero-stats {
          display: flex;
          gap: clamp(16px, 3vw, 36px);
          padding-top: min(2vh, 16px);
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .hero-stat-value {
          font-family: Outfit, sans-serif;
          font-size: clamp(1.2rem, 2.2vw, 1.8rem);
          font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }

        .hero-stat-label {
          font-size: 0.65rem;
          color: #4a5568;
          margin-top: 3px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-family: JetBrains Mono, monospace;
        }

        .hero-3d {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-height: calc(100vh - var(--nav-height) - 60px);
        }

        .hero-scroll {
          position: absolute;
          bottom: min(2vh, 20px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: none;
        }

        .hero-scroll-text {
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          color: #2d3748;
          text-transform: uppercase;
          font-family: JetBrains Mono, monospace;
        }

        .hero-scroll-line {
          width: 1px;
          height: 28px;
          background: linear-gradient(180deg, rgba(124,58,237,0.6), transparent);
        }

        /* ── Short viewport (< 700px tall) ── */
        @media (max-height: 700px) {
          .hero-name {
            font-size: clamp(2rem, 4.5vw, 3.5rem);
          }
          .hero-tagline {
            display: none;
          }
          .hero-scroll {
            display: none;
          }
          .hero-buttons {
            margin-bottom: min(1.5vh, 12px);
          }
          .hero-badge {
            margin-bottom: 6px;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .hero-3d {
            display: none;
          }
          .hero-name {
            font-size: clamp(2.4rem, 10vw, 3.8rem);
          }
          .hero-scroll {
            bottom: 16px;
          }
        }
      `}</style>
    </section>
  );
}
