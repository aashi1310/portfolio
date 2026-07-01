import { useRef } from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'Xebia',
    shortName: 'XEBIA',
    role: 'Software Development Intern',
    period: 'Jun 2024 — Sep 2024',
    location: 'Remote',
    description: 'Built full-stack applications and integrated Azure cloud services in an Agile environment.',
    highlights: [
      'Developed full-stack projects with React and Node.js',
      'Leveraged Azure cloud concepts and services',
      'Built responsive UIs with React + Tailwind CSS',
      'Collaborated in Agile sprints and code reviews',
    ],
    tech: ['React', 'Node.js', 'Azure', 'Tailwind', 'Agile'],
    color: '#7c3aed',
    index: 0,
  },
  {
    company: 'Codexintern',
    shortName: 'CODEX',
    role: 'Frontend Developer Intern',
    period: 'Jan 2024 — May 2024',
    location: 'Remote',
    description: 'Crafted responsive interfaces and integrated third-party APIs to power dynamic content.',
    highlights: [
      'Built fully responsive websites across devices',
      'Integrated third-party APIs for dynamic content',
      'Created reusable and scalable UI components',
      'Optimized performance and load times',
    ],
    tech: ['React', 'JavaScript', 'CSS', 'REST APIs'],
    color: '#a78bfa',
    index: 1,
  },
  {
    company: 'Imarticus Learning',
    shortName: 'IMART',
    role: 'Data Analyst Intern',
    period: 'Jun 2023 — Nov 2023',
    location: 'Remote',
    description: 'Applied SQL, Python and Power BI to extract insights and build interactive dashboards.',
    highlights: [
      'Performed data analysis using SQL and Python',
      'Created interactive Power BI dashboards',
      'Conducted data visualization and reporting',
      'Applied statistical techniques to business data',
    ],
    tech: ['SQL', 'Python', 'Power BI', 'Excel', 'Statistics'],
    color: '#c084fc',
    index: 2,
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
      }}
    >
      {/* Section BG accent */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.04) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}
        >
          <div className="section-label">Career Path</div>
          <h2 className="section-title gradient-text">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: '24px',
              bottom: '24px',
              width: '1px',
              background: 'linear-gradient(180deg, rgba(124,58,237,0.6) 0%, rgba(124,58,237,0.15) 100%)',
              display: 'none', // hidden on mobile; shown via CSS below
            }}
            className="timeline-center-line"
          />

          {/* Left vertical line (mobile) */}
          <div
            style={{
              position: 'absolute',
              left: '11px',
              top: '24px',
              bottom: '24px',
              width: '1px',
              background: 'linear-gradient(180deg, rgba(124,58,237,0.6) 0%, rgba(124,58,237,0.1) 100%)',
            }}
            className="timeline-left-line"
          />

          {experiences.map((exp, i) => {
            const isRight = i % 2 === 0;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: isRight ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  paddingLeft: '40px',
                  paddingBottom: i < experiences.length - 1 ? 'clamp(32px, 5vw, 56px)' : 0,
                  position: 'relative',
                }}
                className="exp-row"
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '5px',
                    top: '28px',
                  }}
                  className="exp-dot-container"
                >
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: exp.color,
                      boxShadow: `0 0 16px ${exp.color}80, 0 0 32px ${exp.color}30`,
                    }}
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    flex: '0 0 100%',
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderRadius: '20px',
                    padding: 'clamp(20px, 3vw, 36px)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${exp.color}30`;
                    e.currentTarget.style.boxShadow = `0 8px 40px ${exp.color}10`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Background watermark */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                      fontWeight: 900,
                      color: exp.color,
                      opacity: 0.03,
                      letterSpacing: '-0.06em',
                      userSelect: 'none',
                      pointerEvents: 'none',
                    }}
                  >
                    {exp.shortName}
                  </div>

                  {/* Number */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 'clamp(16px, 3vw, 24px)',
                      right: 'clamp(16px, 3vw, 28px)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem',
                      color: exp.color,
                      opacity: 0.6,
                      letterSpacing: '0.1em',
                    }}
                  >
                    0{i + 1}
                  </div>

                  {/* Company + Role */}
                  <div style={{ marginBottom: '16px' }}>
                    <div
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                        fontWeight: 800,
                        background: `linear-gradient(135deg, #ffffff, ${exp.color})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-0.02em',
                        marginBottom: '4px',
                      }}
                    >
                      {exp.company}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      {exp.role}
                    </div>
                  </div>

                  {/* Period + Location */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      flexWrap: 'wrap',
                      marginBottom: '16px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: exp.color,
                        fontFamily: 'JetBrains Mono, monospace',
                        fontWeight: 600,
                      }}
                    >
                      {exp.period}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#4a5568', fontFamily: 'JetBrains Mono, monospace' }}>
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '20px' }}>
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          color: '#94a3b8',
                          fontSize: '0.84rem',
                          lineHeight: 1.6,
                          marginBottom: '8px',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: exp.color,
                            marginTop: '7px',
                            flexShrink: 0,
                            boxShadow: `0 0 8px ${exp.color}60`,
                          }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {exp.tech.map(t => (
                      <span
                        key={t}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '100px',
                          background: `${exp.color}10`,
                          border: `1px solid ${exp.color}25`,
                          color: exp.color,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .timeline-center-line { display: block !important; }
          .timeline-left-line   { display: none !important; }

          .exp-row {
            width: 50% !important;
            flex: none !important;
            padding-left: 0 !important;
          }

          .exp-row:nth-child(odd) {
            padding-right: clamp(24px, 4vw, 48px) !important;
            padding-left: 0 !important;
            justify-content: flex-end !important;
          }

          .exp-row:nth-child(even) {
            margin-left: 50% !important;
            padding-left: clamp(24px, 4vw, 48px) !important;
            justify-content: flex-start !important;
          }

          .exp-dot-container {
            left: auto !important;
          }

          .exp-row:nth-child(odd) .exp-dot-container {
            right: -7px !important;
            left: auto !important;
          }

          .exp-row:nth-child(even) .exp-dot-container {
            left: -7px !important;
          }
        }
      `}</style>
    </section>
  );
}
