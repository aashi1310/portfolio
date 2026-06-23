import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SkillCategory = 'All' | 'Frontend' | 'Backend' | 'Programming' | 'Tools';

interface Skill {
  name: string;
  icon: string;
  category: Exclude<SkillCategory, 'All'>;
  color: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: '⚛️', category: 'Frontend', color: '#61DAFB' },
  { name: 'TypeScript', icon: '📘', category: 'Frontend', color: '#3178C6' },
  { name: 'Tailwind', icon: '🎨', category: 'Frontend', color: '#38BDF8' },
  { name: 'JavaScript', icon: '⚡', category: 'Frontend', color: '#F7DF1E' },
  { name: 'HTML5', icon: '🌐', category: 'Frontend', color: '#E34F26' },
  { name: 'CSS3', icon: '💅', category: 'Frontend', color: '#1572B6' },
  // Backend
  { name: 'Node.js', icon: '🟢', category: 'Backend', color: '#339933' },
  { name: 'Express.js', icon: '🚂', category: 'Backend', color: '#ffffff' },
  { name: 'MongoDB', icon: '🍃', category: 'Backend', color: '#47A248' },
  { name: 'REST APIs', icon: '🔌', category: 'Backend', color: '#A855F7' },
  // Programming
  { name: 'Python', icon: '🐍', category: 'Programming', color: '#3776AB' },
  { name: 'Java', icon: '☕', category: 'Programming', color: '#ED8B00' },
  { name: 'C++', icon: '⚙️', category: 'Programming', color: '#00599C' },
  // Tools
  { name: 'Git', icon: '🔀', category: 'Tools', color: '#F05032' },
  { name: 'GitHub', icon: '🐙', category: 'Tools', color: '#ffffff' },
  { name: 'Azure', icon: '☁️', category: 'Tools', color: '#0078D4' },
  { name: 'Power BI', icon: '📊', category: 'Tools', color: '#F2C811' },
  { name: 'Figma', icon: '🎭', category: 'Tools', color: '#F24E1E' },
];

const categories: SkillCategory[] = ['All', 'Frontend', 'Backend', 'Programming', 'Tools'];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('All');

  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <section
      id="skills"
      style={{
        padding: 'clamp(80px, 10vw, 140px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div className="grid-bg" style={{
        position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none',
      }} />

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
          }}>My Arsenal</span>
          <h2 className="section-title gradient-text">Skills Universe</h2>
          <div className="neon-line" style={{ width: '80px', margin: '16px auto 0' }} />
          <p style={{ color: '#94A3B8', marginTop: '1rem', fontSize: '0.95rem' }}>
            Technologies I wield to craft digital experiences
          </p>
        </motion.div>

        {/* Category Filters */}
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
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                border: activeCategory === cat ? '1px solid rgba(139,92,246,0.6)' : '1px solid rgba(255,255,255,0.08)',
                background: activeCategory === cat ? 'rgba(139,92,246,0.2)' : 'transparent',
                color: activeCategory === cat ? '#A855F7' : '#94A3B8',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'none',
                transition: 'all 0.2s ease',
                boxShadow: activeCategory === cat ? '0 0 20px rgba(139,92,246,0.3)' : 'none',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skill Orbs Grid */}
        <motion.div
          layout
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -30 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="skill-orb"
                style={{
                  width: '110px',
                  height: '110px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>{skill.icon}</span>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#94A3B8',
                  textAlign: 'center',
                  letterSpacing: '0.02em',
                }}>{skill.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
