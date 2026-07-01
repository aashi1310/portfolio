import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Code, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'EcoPackAI',
    subtitle: 'Sustainable Packaging Intelligence',
    description:
      'AI-powered plastic packaging impact analyzer that uses Gemini Vision API to assess environmental footprint and provide actionable eco-recommendations. Scans product labels and generates sustainability scores.',
    tech: ['React', 'Node.js', 'MongoDB', 'Gemini Vision API'],
    tags: ['Sustainability Score', 'AI Analysis', 'Eco Recommendations'],
    github: 'https://github.com/aashikajain',
    demo: '#',
    color: '#22c55e',
    accentDark: 'rgba(34,197,94,0.06)',
    accentBorder: 'rgba(34,197,94,0.2)',
    visual: { emoji: '🌿', bg: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.04) 100%)' },
    metrics: [
      { value: '95%', label: 'Accuracy' },
      { value: '< 2s', label: 'Analysis time' },
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'FreshTrackAI',
    subtitle: 'Smart Expiry Management',
    description:
      'Smart expiry tracking app powered by Gemini AI and OCR technology. Scan product labels, get expiry alerts, and receive personalized recipe recommendations to reduce food waste intelligently.',
    tech: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'OCR'],
    tags: ['Expiry Tracking', 'OCR Scanning', 'Recipe Recommendation'],
    github: 'https://github.com/aashikajain',
    demo: '#',
    color: '#f97316',
    accentDark: 'rgba(249,115,22,0.06)',
    accentBorder: 'rgba(249,115,22,0.2)',
    visual: { emoji: '🥦', bg: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(234,88,12,0.04) 100%)' },
    metrics: [
      { value: '40%', label: 'Waste reduced' },
      { value: '200+', label: 'Items tracked' },
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Student Management System',
    subtitle: 'Complete Academic Platform',
    description:
      'Full-featured student management platform with authentication, CRUD operations, attendance tracking, and a comprehensive administrative dashboard for educational institutions.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    tags: ['Authentication', 'CRUD', 'Attendance', 'Dashboard'],
    github: 'https://github.com/aashikajain/student-management-system',
    demo: '#',
    color: '#8b5cf6',
    accentDark: 'rgba(139,92,246,0.06)',
    accentBorder: 'rgba(139,92,246,0.2)',
    visual: { emoji: '🎓', bg: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(109,40,217,0.04) 100%)' },
    metrics: [
      { value: '100%', label: 'CRUD coverage' },
      { value: 'Multi-role', label: 'Access control' },
    ],
  },
];

// Single project row — alternating layout
function ProjectRow({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const [hovering, setHovering] = useState(false);

  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(2rem, 4vw, 5rem)',
        marginBottom: 'clamp(64px, 10vw, 120px)',
        position: 'relative',
        direction: isReversed ? 'rtl' : 'ltr',
      }}
      className="project-row"
    >
      {/* Visual pane */}
      <div
        style={{ direction: 'ltr', position: 'relative' }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <motion.div
          style={{ y }}
          animate={{
            scale: hovering ? 1.02 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              aspectRatio: '4/3',
              borderRadius: '20px',
              background: project.visual.bg,
              border: `1px solid ${project.accentBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'box-shadow 0.4s ease',
              boxShadow: hovering
                ? `0 20px 60px ${project.color}20, 0 0 0 1px ${project.color}30`
                : '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            {/* Grid pattern */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                  linear-gradient(${project.accentBorder} 1px, transparent 1px),
                  linear-gradient(90deg, ${project.accentBorder} 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Center visual */}
            <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
              <div
                style={{
                  fontSize: 'clamp(4rem, 8vw, 6rem)',
                  filter: hovering ? `drop-shadow(0 0 24px ${project.color}80)` : 'none',
                  transition: 'filter 0.4s ease, transform 0.4s ease',
                  transform: hovering ? 'scale(1.1)' : 'scale(1)',
                  display: 'block',
                }}
              >
                {project.visual.emoji}
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  color: project.color,
                  letterSpacing: '0.2em',
                  marginTop: '12px',
                  opacity: 0.7,
                }}
              >
                PROJECT {project.number}
              </div>
            </div>

            {/* Hover overlay with links */}
            <motion.div
              initial={false}
              animate={{ opacity: hovering ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: `rgba(4,3,10,0.75)`,
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                borderRadius: '20px',
              }}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ textDecoration: 'none', fontSize: '0.82rem' }}
              >
                <Code size={14} /> GitHub
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: 'none', fontSize: '0.82rem' }}
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Content pane */}
      <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Number */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: project.color,
            letterSpacing: '0.2em',
            marginBottom: '12px',
            opacity: 0.7,
          }}
        >
          {project.number} — {project.subtitle}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            background: `linear-gradient(135deg, #ffffff 0%, ${project.color} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '20px' }}>
          {project.description}
        </p>

        {/* Feature tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                padding: '4px 12px',
                borderRadius: '100px',
                background: `${project.color}10`,
                border: `1px solid ${project.color}25`,
                color: project.color,
                fontSize: '0.7rem',
                fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.tech.map(t => (
            <span
              key={t}
              style={{
                padding: '3px 10px',
                borderRadius: '6px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#94a3b8',
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '28px' }}>
          {project.metrics.map(m => (
            <div key={m.label}>
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: project.color,
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {m.value}
              </div>
              <div style={{ fontSize: '0.65rem', color: '#4a5568', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA links */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            style={{ textDecoration: 'none', fontSize: '0.82rem' }}
          >
            <Code size={14} /> Source Code
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', fontSize: '0.82rem' }}
          >
            View Live <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section accent */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-15%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 60%)',
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
          style={{ marginBottom: 'clamp(48px, 7vw, 80px)' }}
        >
          <div className="section-label">Featured Work</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3rem', flexWrap: 'wrap' }}>
            <h2 className="section-title gradient-text">Projects</h2>
            <p style={{ color: '#4a5568', fontSize: '0.88rem', marginBottom: '10px', maxWidth: '300px', lineHeight: 1.6 }}>
              Real-world solutions built with passion and precision
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="line-glow" style={{ marginBottom: 'clamp(48px, 7vw, 80px)' }} />

        {/* Projects */}
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
        }
      `}</style>
    </section>
  );
}
