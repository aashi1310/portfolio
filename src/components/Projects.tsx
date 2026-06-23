import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
const Github = Code;

type Filter = 'ALL' | 'AI' | 'FULL STACK' | 'WEB APPS';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  category: Filter[];
  github: string;
  demo: string;
  gradient: string;
  icon: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'EcoPackAI',
    description: 'AI-powered plastic packaging impact analyzer that uses Gemini Vision API to assess environmental footprint and provide sustainable alternatives with actionable eco-recommendations.',
    tech: ['React', 'Node.js', 'MongoDB', 'Gemini Vision API'],
    features: ['Sustainability Score', 'AI Analysis', 'Eco Recommendations'],
    category: ['ALL', 'AI', 'FULL STACK'],
    github: 'https://github.com/aashikajain',
    demo: '#',
    gradient: 'linear-gradient(135deg, #22c55e20, #16a34a10)',
    icon: '🌿',
  },
  {
    id: 2,
    title: 'Student Management System',
    description: 'Full-featured student management platform with authentication, CRUD operations, attendance tracking, and a comprehensive administrative dashboard.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
    features: ['Authentication', 'CRUD', 'Attendance', 'Dashboard'],
    category: ['ALL', 'FULL STACK', 'WEB APPS'],
    github: 'https://github.com/aashikajain/student-management-system',
    demo: '#',
    gradient: 'linear-gradient(135deg, #8B5CF620, #6D28D910)',
    icon: '🎓',
  },
  {
    id: 3,
    title: 'FreshTrackAI',
    description: 'Smart expiry tracking app powered by Gemini AI and OCR technology. Scan product labels, get expiry alerts, and receive personalized recipe recommendations to reduce food waste.',
    tech: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'OCR'],
    features: ['Expiry Tracking', 'OCR Scanning', 'Recipe Recommendation'],
    category: ['ALL', 'AI', 'FULL STACK'],
    github: 'https://github.com/aashikajain',
    demo: '#',
    gradient: 'linear-gradient(135deg, #f97316 20, #ea580c10)',
    icon: '🥦',
  },
];

const filters: Filter[] = ['ALL', 'AI', 'FULL STACK', 'WEB APPS'];

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-8px) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.3s ease',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL');

  const filtered = projects.filter(p => p.category.includes(activeFilter));

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            color: '#8B5CF6',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}>What I've Built</span>
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <div className="neon-line" style={{ width: '80px', margin: '16px auto 0' }} />
          <p style={{ color: '#94A3B8', marginTop: '1rem', fontSize: '0.95rem' }}>
            Real-world solutions built with passion and precision
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                border: activeFilter === filter ? '1px solid rgba(139,92,246,0.6)' : '1px solid rgba(255,255,255,0.08)',
                background: activeFilter === filter ? 'rgba(139,92,246,0.2)' : 'transparent',
                color: activeFilter === filter ? '#A855F7' : '#94A3B8',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'none',
                transition: 'all 0.3s ease',
                letterSpacing: '0.05em',
                boxShadow: activeFilter === filter ? '0 0 20px rgba(139,92,246,0.3)' : 'none',
              }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -30 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard>
                  <div style={{
                    background: 'rgba(17, 24, 39, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(139, 92, 246, 0.15)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    height: '100%',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,92,246,0.5)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 40px rgba(139,92,246,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,92,246,0.15)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  }}
                  >
                    {/* Project Image Area */}
                    <div style={{
                      height: '200px',
                      background: project.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      {/* Grid pattern */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'linear-gradient(rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.08) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }} />
                      <div style={{ position: 'relative', textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '8px' }}>{project.icon}</div>
                        <div style={{
                          fontSize: '0.7rem',
                          letterSpacing: '0.2em',
                          color: '#8B5CF6',
                          textTransform: 'uppercase',
                        }}>PROJECT</div>
                      </div>
                      {/* Glow overlay on hover */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, rgba(139,92,246,0.15) 0%, transparent 70%)',
                      }} />
                    </div>

                    {/* Content */}
                    <div style={{ padding: '24px' }}>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #ffffff, #A855F7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '10px',
                      }}>{project.title}</h3>

                      <p style={{
                        color: '#94A3B8',
                        fontSize: '0.875rem',
                        lineHeight: 1.7,
                        marginBottom: '16px',
                      }}>{project.description}</p>

                      {/* Features */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '16px',
                      }}>
                        {project.features.map(f => (
                          <span key={f} style={{
                            padding: '3px 10px',
                            borderRadius: '100px',
                            background: 'rgba(139,92,246,0.1)',
                            color: '#A855F7',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                          }}>✦ {f}</span>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '20px',
                      }}>
                        {project.tech.map(t => (
                          <span key={t} style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#94A3B8',
                            fontSize: '0.72rem',
                            fontFamily: 'monospace',
                          }}>{t}</span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '10px',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#94A3B8',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            cursor: 'none',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8';
                            (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                          }}
                        >
                          <Github size={14} /> GitHub
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-glow"
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            padding: '10px',
                            borderRadius: '10px',
                            color: '#fff',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            cursor: 'none',
                          }}
                        >
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
