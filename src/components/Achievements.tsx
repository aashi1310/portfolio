import { motion } from 'framer-motion';

const achievements = [
  {
    icon: '🏆',
    title: 'Top 15 National Hackathon Finalist',
    description:
      'Competed against hundreds of teams nationwide and secured a position among the Top 15 finalists, showcasing innovative solutions under pressure.',
    tag: 'Hackathon',
    color: '#f59e0b',
    size: 'large',   // spans full width — hero card
  },
  {
    icon: '🚀',
    title: 'Google Girl Hackathon',
    description:
      'Selected participant in Google\'s prestigious hackathon celebrating women in tech, collaborating on cutting-edge technology solutions.',
    tag: 'Google',
    color: '#8b5cf6',
    size: 'medium',
  },
  {
    icon: '💡',
    title: 'Google Solution Challenge',
    description:
      'Participated in the Google Solution Challenge, developing impactful solutions aligned with UN Sustainable Development Goals.',
    tag: 'Innovation',
    color: '#3b82f6',
    size: 'medium',
  },
  {
    icon: '🎯',
    title: 'Deloitte Technology Job Simulation',
    description:
      'Completed Deloitte\'s immersive Technology Consulting simulation, gaining hands-on experience with enterprise-level technical challenges.',
    tag: 'Professional',
    color: '#10b981',
    size: 'wide',   // spans 2 columns at bottom
  },
];

export default function Achievements() {
  const [hero, ...rest]     = achievements;
  const mediums             = rest.filter(a => a.size === 'medium');
  const wide                = rest.find(a => a.size === 'wide');

  return (
    <section
      id="achievements"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 60%)',
          filter: 'blur(40px)',
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
          style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <div className="section-label">Recognition</div>
          <h2 className="section-title gradient-text">Achievements</h2>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          {/* HERO card — full width, large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            style={{
              gridColumn: '1 / -1',
              background: `linear-gradient(135deg, ${hero.color}08 0%, rgba(4,3,10,0) 60%)`,
              border: `1px solid ${hero.color}25`,
              borderRadius: '24px',
              padding: 'clamp(28px, 4vw, 48px)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(24px, 4vw, 56px)',
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = `0 20px 60px ${hero.color}15`;
              e.currentTarget.style.borderColor = `${hero.color}45`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = `${hero.color}25`;
            }}
          >
            {/* Background number */}
            <div
              style={{
                position: 'absolute',
                right: '-10px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(5rem, 12vw, 9rem)',
                fontWeight: 900,
                color: hero.color,
                opacity: 0.04,
                userSelect: 'none',
                pointerEvents: 'none',
                lineHeight: 1,
              }}
            >
              01
            </div>

            {/* Icon */}
            <div
              style={{
                width: 'clamp(64px, 10vw, 100px)',
                height: 'clamp(64px, 10vw, 100px)',
                borderRadius: '24px',
                background: `${hero.color}12`,
                border: `1px solid ${hero.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                flexShrink: 0,
                boxShadow: `0 0 30px ${hero.color}20`,
              }}
            >
              {hero.icon}
            </div>

            <div style={{ flex: 1 }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 12px',
                  borderRadius: '100px',
                  background: `${hero.color}12`,
                  border: `1px solid ${hero.color}25`,
                  color: hero.color,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '12px',
                }}
              >
                {hero.tag}
              </span>

              <h3
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                  fontWeight: 800,
                  color: '#f1f0f6',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}
              >
                {hero.title}
              </h3>

              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7 }}>
                {hero.description}
              </p>
            </div>
          </motion.div>

          {/* MEDIUM cards — side by side */}
          {mediums.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              style={{
                background: `linear-gradient(145deg, ${a.color}06 0%, rgba(4,3,10,0) 70%)`,
                border: `1px solid ${a.color}20`,
                borderRadius: '20px',
                padding: 'clamp(20px, 3vw, 32px)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 16px 48px ${a.color}12`;
                e.currentTarget.style.borderColor = `${a.color}40`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${a.color}20`;
              }}
            >
              {/* Corner accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, right: 0,
                  width: '80px', height: '80px',
                  background: `radial-gradient(circle at top right, ${a.color}10, transparent)`,
                  borderRadius: '0 20px 0 80px',
                }}
              />

              {/* Bottom hover border */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.35 }}
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${a.color}, transparent)`,
                  transformOrigin: 'left',
                  boxShadow: `0 0 10px ${a.color}80`,
                }}
              />

              <div
                style={{
                  width: '52px', height: '52px',
                  borderRadius: '14px',
                  background: `${a.color}10`,
                  border: `1px solid ${a.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '16px',
                  boxShadow: `0 0 16px ${a.color}15`,
                }}
              >
                {a.icon}
              </div>

              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: '100px',
                  background: `${a.color}10`,
                  border: `1px solid ${a.color}25`,
                  color: a.color,
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '10px',
                }}
              >
                {a.tag}
              </span>

              <h3
                style={{
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  color: '#f1f0f6',
                  lineHeight: 1.35,
                  marginBottom: '10px',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {a.title}
              </h3>

              <p style={{ color: '#4a5568', fontSize: '0.82rem', lineHeight: 1.65 }}>
                {a.description}
              </p>
            </motion.div>
          ))}

          {/* WIDE card — full width, horizontal */}
          {wide && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              style={{
                gridColumn: '1 / -1',
                background: `linear-gradient(90deg, ${wide.color}08 0%, rgba(4,3,10,0) 50%)`,
                border: `1px solid ${wide.color}20`,
                borderRadius: '20px',
                padding: 'clamp(20px, 3vw, 32px)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(16px, 3vw, 32px)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 12px 40px ${wide.color}12`;
                e.currentTarget.style.borderColor = `${wide.color}40`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = `${wide.color}20`;
              }}
            >
              <div
                style={{
                  width: '56px', height: '56px',
                  borderRadius: '16px',
                  background: `${wide.color}10`,
                  border: `1px solid ${wide.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem',
                  flexShrink: 0,
                }}
              >
                {wide.icon}
              </div>

              <div style={{ flex: 1 }}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: '100px',
                    background: `${wide.color}10`,
                    border: `1px solid ${wide.color}25`,
                    color: wide.color,
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: 'JetBrains Mono, monospace',
                    marginBottom: '8px',
                  }}
                >
                  {wide.tag}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                    fontWeight: 700,
                    color: '#f1f0f6',
                    marginBottom: '6px',
                  }}
                >
                  {wide.title}
                </h3>
                <p style={{ color: '#4a5568', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  {wide.description}
                </p>
              </div>

              {/* Accent line right */}
              <div
                style={{
                  width: '3px',
                  height: '60%',
                  background: `linear-gradient(180deg, ${wide.color}, transparent)`,
                  borderRadius: '4px',
                  flexShrink: 0,
                  alignSelf: 'center',
                  opacity: 0.5,
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
