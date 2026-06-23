import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import ThreeSphere from './ThreeSphere';

const roles = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver', 'Tech Explorer'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    if (typing) {
      if (displayed.length < currentRole.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, typing, roleIndex]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px 60px',
      }}
    >
      {/* Grid background */}
      <div className="grid-bg" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

      {/* Light ray */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '2px',
        height: '60%',
        background: 'linear-gradient(180deg, rgba(139,92,246,0.4) 0%, transparent 100%)',
        filter: 'blur(1px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}
      className="flex-col-mobile"
      >
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ zIndex: 1 }}
        >
          {/* Hello badge */}
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '100px',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              color: '#A855F7',
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#A855F7',
                boxShadow: '0 0 8px rgba(168,85,247,0.8)',
                animation: 'glow-pulse 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
              Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2d9f3 40%, #8B5CF6 70%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              fontFamily: 'Outfit, Inter, sans-serif',
            }}
          >
            AASHIKA<br />JAIN
          </motion.h1>

          {/* Typing animation */}
          <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem', height: '40px' }}>
            <span style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: '#8B5CF6',
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}>
              {displayed}
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '1.2em',
                background: '#A855F7',
                marginLeft: '2px',
                verticalAlign: 'text-bottom',
                animation: 'glow-pulse 1s ease-in-out infinite',
                boxShadow: '0 0 8px rgba(168,85,247,0.8)',
              }} />
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p variants={itemVariants} style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            color: '#94A3B8',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '480px',
          }}>
            Building Intelligent Solutions and Modern Digital Experiences.
            Turning coffee into clean code and ideas into reality.
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('#projects')}
              className="btn-glow"
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'none',
              }}
            >
              View Projects <ArrowRight size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="btn-outline-glow"
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'none',
              }}
            >
              <Download size={16} /> Resume
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('#contact')}
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                color: '#94A3B8',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'none',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.color = '#94A3B8';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <Mail size={16} /> Contact Me
            </motion.button>
          </motion.div>

          {/* Stats inline */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {[
              { value: '10+', label: 'Projects' },
              { value: '5+', label: 'Hackathons' },
              { value: '3', label: 'Internships' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{ position: 'relative', aspectRatio: '1/1', minHeight: '400px' }}
        >
          <ThreeSphere className="w-full h-full" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => scrollTo('#about')}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#4B5563', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} color="#6D28D9" />
        </motion.div>
      </motion.div>
    </section>
  );
}
