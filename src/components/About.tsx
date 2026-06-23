import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Brain, Sparkles } from 'lucide-react';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <motion.div
      ref={ref}
      onViewportEnter={() => setStarted(true)}
      style={{
        fontSize: '2.5rem',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {count}{suffix}
    </motion.div>
  );
}

const stats = [
  { target: 10, suffix: '+', label: 'Projects Built', icon: Code2 },
  { target: 5, suffix: '+', label: 'Hackathons', icon: Sparkles },
  { target: 3, suffix: '', label: 'Internships', icon: Brain },
  { target: 15, suffix: '+', label: 'Technologies', icon: GraduationCap },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: 'clamp(80px, 10vw, 140px) 24px',
        position: 'relative',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <span style={{
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: '#8B5CF6',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '12px',
        }}>Get To Know Me</span>
        <h2 className="section-title gradient-text">About Me</h2>
        <div className="neon-line" style={{ width: '80px', margin: '16px auto 0' }} />
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
        gap: 'clamp(2rem, 5vw, 5rem)',
        alignItems: 'start',
      }}>
        {/* Left - Profile Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ position: 'relative', width: '280px', height: '280px' }}>
            {/* Outer rotating ring */}
            <div className="animate-spin-slow" style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.3)',
              borderTopColor: '#8B5CF6',
              borderRightColor: 'transparent',
            }} />
            {/* Second ring */}
            <div className="animate-spin-reverse" style={{
              position: 'absolute',
              inset: '-36px',
              borderRadius: '50%',
              border: '1px dashed rgba(139,92,246,0.15)',
            }} />
            {/* Glow aura */}
            <div className="animate-glow-pulse" style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
            }} />
            {/* Profile circle */}
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(17,24,39,0.9) 100%)',
              border: '2px solid rgba(139,92,246,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxShadow: '0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.1)',
              position: 'relative',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '5rem',
                  background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 900,
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>AJ</div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', letterSpacing: '0.1em' }}>FULL STACK DEV</div>
              </div>
            </div>

            {/* Floating dots */}
            {[45, 135, 225, 315].map((deg, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                  boxShadow: '0 0 15px rgba(139,92,246,0.8)',
                  top: `${50 - 55 * Math.sin((deg * Math.PI) / 180)}%`,
                  left: `${50 + 55 * Math.cos((deg * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  animation: `float ${4 + i}s ease-in-out infinite ${i * 0.5}s`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
            fontWeight: 700,
            marginBottom: '1.2rem',
            background: 'linear-gradient(135deg, #ffffff, #94A3B8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Passionate Developer &amp; Problem Solver
          </h3>

          <p style={{
            color: '#94A3B8',
            lineHeight: 1.85,
            fontSize: '0.98rem',
            marginBottom: '1.2rem',
          }}>
            I'm a passionate <span style={{ color: '#A855F7', fontWeight: 600 }}>Full Stack Developer</span> and Computer Science student who loves building modern web applications and AI-powered solutions. I enjoy solving real-world problems through technology and creating experiences that are both functional and visually stunning.
          </p>
          <p style={{
            color: '#94A3B8',
            lineHeight: 1.85,
            fontSize: '0.98rem',
            marginBottom: '2rem',
          }}>
            Currently pursuing my <span style={{ color: '#A855F7', fontWeight: 600 }}>B.Tech in Computer Science</span> at Bennett University (2023–2027), I'm constantly learning and pushing boundaries — from building AI-powered tools to competing in national hackathons.
          </p>

          {/* Education card */}
          <div className="glass-strong" style={{
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '2.5rem',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(139,92,246,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <GraduationCap size={24} color="#A855F7" />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>B.Tech in Computer Science</div>
              <div style={{ color: '#8B5CF6', fontSize: '0.85rem', marginTop: '2px' }}>Bennett University • 2023 – 2027</div>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass glow-border-hover"
                style={{
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <stat.icon size={20} color="#8B5CF6" style={{ margin: '0 auto 8px' }} />
                <CountUp target={stat.target} suffix={stat.suffix} />
                <div style={{ color: '#94A3B8', fontSize: '0.78rem', marginTop: '4px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
