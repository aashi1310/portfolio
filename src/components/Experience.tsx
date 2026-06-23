import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    company: 'Xebia',
    role: 'Software Development Intern',
    period: '2024',
    location: 'Remote',
    highlights: [
      'Developed full-stack projects with React and Node.js',
      'Leveraged Azure cloud concepts and services',
      'Built responsive UIs with React + Tailwind CSS',
      'Collaborated in Agile sprints and code reviews',
    ],
    tech: ['React', 'Node.js', 'Azure', 'Tailwind', 'Agile'],
    color: '#8B5CF6',
  },
  {
    company: 'Codexintern',
    role: 'Frontend Developer Intern',
    period: '2024',
    location: 'Remote',
    highlights: [
      'Built fully responsive websites across devices',
      'Integrated third-party APIs for dynamic content',
      'Created reusable and scalable UI components',
      'Optimized performance and load times',
    ],
    tech: ['React', 'JavaScript', 'CSS', 'REST APIs'],
    color: '#A855F7',
  },
  {
    company: 'Imarticus Learning',
    role: 'Data Analyst Intern',
    period: '2023',
    location: 'Remote',
    highlights: [
      'Performed data analysis using SQL and Python',
      'Created interactive Power BI dashboards',
      'Conducted data visualization and reporting',
      'Applied statistical techniques to business data',
    ],
    tech: ['SQL', 'Python', 'Power BI', 'Excel', 'Statistics'],
    color: '#C084FC',
  },
];

export default function Experience() {
  const ref = useRef(null);

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
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
          }}>Career Path</span>
          <h2 className="section-title gradient-text">Experience</h2>
          <div className="neon-line" style={{ width: '80px', margin: '16px auto 0' }} />
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(180deg, #8B5CF6, #A855F7, transparent)',
            boxShadow: '0 0 10px rgba(139,92,246,0.5)',
          }} />

          {/* Moving glow on line */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              left: '20px',
              width: '10px',
              height: '60px',
              background: 'linear-gradient(180deg, transparent, #8B5CF6, transparent)',
              filter: 'blur(4px)',
              zIndex: 1,
            }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                paddingLeft: '64px',
                paddingBottom: i < experiences.length - 1 ? '48px' : 0,
                position: 'relative',
              }}
            >
              {/* Timeline dot */}
              <div className="timeline-dot" style={{
                position: 'absolute',
                left: '16px',
                top: '20px',
              }} />

              {/* Card */}
              <div className="glass-strong glow-border-hover" style={{
                borderRadius: '20px',
                padding: '28px',
                transition: 'all 0.3s ease',
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  <div>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${exp.color}, #ffffff)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '4px',
                    }}>{exp.company}</div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#94A3B8',
                      fontSize: '0.9rem',
                    }}>
                      <Briefcase size={14} color={exp.color} />
                      {exp.role}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: exp.color,
                      fontSize: '0.8rem',
                      marginBottom: '4px',
                    }}>
                      <Calendar size={12} /> {exp.period}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#94A3B8',
                      fontSize: '0.8rem',
                    }}>
                      <MapPin size={12} /> {exp.location}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <ul style={{ marginBottom: '20px', paddingLeft: 0, listStyle: 'none' }}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      color: '#94A3B8',
                      fontSize: '0.88rem',
                      lineHeight: 1.6,
                      marginBottom: '8px',
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: exp.color,
                        marginTop: '6px',
                        flexShrink: 0,
                        boxShadow: `0 0 8px ${exp.color}80`,
                      }} />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {exp.tech.map(t => (
                    <span key={t} style={{
                      padding: '4px 12px',
                      borderRadius: '100px',
                      background: `${exp.color}15`,
                      border: `1px solid ${exp.color}30`,
                      color: exp.color,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
