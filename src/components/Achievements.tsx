import { useRef } from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    icon: '🏆',
    title: 'Top 15 National Hackathon Finalist',
    description: 'Competed against hundreds of teams nationwide and secured a position among the Top 15 finalists, showcasing innovative solutions under pressure.',
    tag: 'Hackathon',
    color: '#F59E0B',
  },
  {
    icon: '🚀',
    title: 'Google Girl Hackathon',
    description: 'Selected participant in Google\'s prestigious hackathon celebrating women in tech, collaborating on cutting-edge technology solutions.',
    tag: 'Google',
    color: '#8B5CF6',
  },
  {
    icon: '💡',
    title: 'Google Solution Challenge',
    description: 'Participated in the Google Solution Challenge, developing impactful solutions aligned with UN Sustainable Development Goals.',
    tag: 'Innovation',
    color: '#3B82F6',
  },
  {
    icon: '🎯',
    title: 'Deloitte Technology Job Simulation',
    description: 'Completed Deloitte\'s immersive Technology Consulting simulation, gaining hands-on experience with enterprise-level technical challenges.',
    tag: 'Professional',
    color: '#10B981',
  },
];

export default function Achievements() {
  const ref = useRef(null);

  return (
    <section
      id="achievements"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
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
          }}>Recognition</span>
          <h2 className="section-title gradient-text">Achievements</h2>
          <div className="neon-line" style={{ width: '80px', margin: '16px auto 0' }} />
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                background: 'rgba(17, 24, 39, 0.7)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${achievement.color}20`,
                borderRadius: '24px',
                padding: '32px',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = `0 0 40px ${achievement.color}25, 0 20px 60px rgba(0,0,0,0.3)`;
                el.style.borderColor = `${achievement.color}50`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = 'none';
                el.style.borderColor = `${achievement.color}20`;
              }}
            >
              {/* Corner glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '80px',
                height: '80px',
                background: `radial-gradient(circle at top right, ${achievement.color}15, transparent)`,
                borderRadius: '0 24px 0 80px',
              }} />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: `${achievement.color}12`,
                  border: `1px solid ${achievement.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '20px',
                  boxShadow: `0 0 20px ${achievement.color}20`,
                }}
              >
                {achievement.icon}
              </motion.div>

              {/* Tag */}
              <span style={{
                display: 'inline-block',
                padding: '3px 10px',
                borderRadius: '100px',
                background: `${achievement.color}15`,
                border: `1px solid ${achievement.color}30`,
                color: achievement.color,
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}>{achievement.tag}</span>

              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.4,
                marginBottom: '12px',
              }}>{achievement.title}</h3>

              <p style={{
                color: '#94A3B8',
                fontSize: '0.85rem',
                lineHeight: 1.65,
              }}>{achievement.description}</p>

              {/* Bottom animated border */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${achievement.color}, transparent)`,
                  transformOrigin: 'left',
                  boxShadow: `0 0 10px ${achievement.color}80`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
