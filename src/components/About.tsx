import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Counter({ target, suffix = '', delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();

      let start = 0;
      const step = target / 55;
      const timer = setInterval(() => {
        start += step;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 22);
    }, { threshold: 0.5 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const journey = [
  {
    year: '2023',
    event: 'Started B.Tech in Computer Science at Bennett University',
    type: 'education',
  },
  {
    year: '2023',
    event: 'First internship at Imarticus — data analytics & Python',
    type: 'work',
  },
  {
    year: '2024',
    event: 'Joined Codexintern as Frontend Developer — React & APIs',
    type: 'work',
  },
  {
    year: '2024',
    event: 'Software Development intern at Xebia — React, Node.js, Azure',
    type: 'work',
  },
  {
    year: '2024',
    event: 'Top 15 finalist in national hackathon, Google competitions',
    type: 'achievement',
  },
];

const typeColor = {
  education:   '#a78bfa',
  work:        '#34d399',
  achievement: '#fbbf24',
};

const stats = [
  { value: 10, suffix: '+', label: 'Projects\nShipped' },
  { value: 5,  suffix: '+', label: 'Hackathons\nEntered' },
  { value: 3,  suffix: '',  label: 'Internships\nCompleted' },
  { value: 15, suffix: '+', label: 'Technologies\nLearned' },
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
      }}
    >
      {/* Section header — asymmetric, not centered */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}
      >
        <div className="section-label">About me</div>
        <h2
          className="section-title gradient-text"
          style={{ maxWidth: '480px' }}
        >
          The person
          <br />
          behind the code
        </h2>
      </motion.div>

      {/* Main asymmetric grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.15fr',
          gap: 'clamp(2.5rem, 6vw, 7rem)',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT — monogram + journey timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Editorial monogram */}
          <div
            style={{
              position: 'relative',
              marginBottom: '3rem',
              height: '280px',
            }}
          >
            {/* Large background initials */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-10px',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(7rem, 14vw, 12rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.06em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(124,58,237,0.12)',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              AJ
            </div>

            {/* Foreground card */}
            <div
              className="glass-violet"
              style={{
                position: 'absolute',
                bottom: 0,
                left: '16px',
                right: '0',
                borderRadius: '20px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontSize: '0.68rem',
                  color: '#4a5568',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '8px',
                }}
              >
                CURRENTLY
              </div>
              <div style={{ fontWeight: 700, color: '#f1f0f6', fontSize: '0.95rem', marginBottom: '4px' }}>
                B.Tech Computer Science
              </div>
              <div style={{ color: '#7c3aed', fontSize: '0.82rem' }}>
                Bennett University · 2023 — 2027
              </div>
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="availability-dot" />
                <span style={{ color: '#34d399', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Orbital accent */}
            <div
              className="animate-spin-slow"
              style={{
                position: 'absolute',
                top: '10px',
                right: '-10px',
                width: '80px',
                height: '80px',
                border: '1px solid rgba(124,58,237,0.2)',
                borderTopColor: 'rgba(124,58,237,0.6)',
                borderRadius: '50%',
              }}
            />
            <div
              className="animate-spin-reverse"
              style={{
                position: 'absolute',
                top: '0px',
                right: '-20px',
                width: '100px',
                height: '100px',
                border: '1px dashed rgba(124,58,237,0.1)',
                borderRadius: '50%',
              }}
            />
          </div>

          {/* Journey micro-timeline */}
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                color: '#4a5568',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace',
                marginBottom: '16px',
              }}
            >
              Journey
            </div>

            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              {/* Vertical line */}
              <div
                style={{
                  position: 'absolute',
                  left: '5px',
                  top: '6px',
                  bottom: '6px',
                  width: '1px',
                  background: 'linear-gradient(180deg, rgba(124,58,237,0.5), rgba(124,58,237,0.08))',
                }}
              />

              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{
                    position: 'relative',
                    marginBottom: '16px',
                    paddingLeft: '16px',
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-16px',
                      top: '5px',
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: typeColor[item.type],
                      boxShadow: `0 0 8px ${typeColor[item.type]}80`,
                    }}
                  />
                  <div
                    style={{
                      fontSize: '0.65rem',
                      color: typeColor[item.type],
                      fontFamily: 'JetBrains Mono, monospace',
                      marginBottom: '2px',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {item.year}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                    {item.event}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT — story + stats ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {/* Editorial pull-quote style intro */}
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
              fontWeight: 700,
              lineHeight: 1.4,
              color: '#f1f0f6',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            I build things that live at the intersection of{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              engineering precision
            </span>{' '}
            and creative ambition.
          </p>

          <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '1.2rem' }}>
            I'm a passionate Full Stack Developer and CS student who loves building modern web applications
            and AI-powered solutions. I enjoy solving real-world problems through technology and creating
            experiences that are both functional and visually stunning.
          </p>

          <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.92rem', marginBottom: '2.5rem' }}>
            Currently pursuing my <span style={{ color: '#a78bfa' }}>B.Tech in Computer Science</span> at
            Bennett University (2023–2027), constantly learning and pushing boundaries —
            from building AI-powered tools to competing in national hackathons.
          </p>

          {/* Stats — different visual weights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                style={{
                  padding: i === 0 ? '28px' : '20px 24px',
                  background: i === 0
                    ? 'rgba(124,58,237,0.07)'
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${i === 0 ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: '16px',
                  gridColumn: i === 0 ? 'span 2' : 'span 1',
                  display: 'flex',
                  alignItems: i === 0 ? 'flex-end' : 'center',
                  gap: i === 0 ? '0' : '16px',
                  flexDirection: i === 0 ? 'row' : 'column',
                  justifyContent: i === 0 ? 'space-between' : 'center',
                  textAlign: i === 0 ? 'left' : 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: i === 0 ? 'clamp(2.2rem, 4vw, 3rem)' : '2rem',
                      fontWeight: 900,
                      lineHeight: 1,
                      background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    <Counter target={s.value} suffix={s.suffix} delay={i * 100} />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: '#4a5568',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: 'JetBrains Mono, monospace',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
