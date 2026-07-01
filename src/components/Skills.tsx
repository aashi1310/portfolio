import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Skill clusters — grouped with positioning data for constellation layout
const clusters = {
  Frontend: {
    color: '#61DAFB',
    label: 'Frontend',
    skills: [
      { name: 'React',       icon: '⚛️', size: 90 },
      { name: 'JavaScript',  icon: '⚡', size: 82 },
      { name: 'TypeScript',  icon: '📘', size: 75 },
      { name: 'Tailwind',    icon: '🎨', size: 72 },
      { name: 'HTML5',       icon: '🌐', size: 68 },
      { name: 'CSS3',        icon: '💅', size: 65 },
    ],
  },
  Backend: {
    color: '#339933',
    label: 'Backend',
    skills: [
      { name: 'Node.js',    icon: '🟢', size: 85 },
      { name: 'Express.js', icon: '🚂', size: 75 },
      { name: 'MongoDB',    icon: '🍃', size: 72 },
      { name: 'REST APIs',  icon: '🔌', size: 68 },
    ],
  },
  Languages: {
    color: '#3776AB',
    label: 'Languages',
    skills: [
      { name: 'Python', icon: '🐍', size: 82 },
      { name: 'Java',   icon: '☕', size: 72 },
      { name: 'C++',    icon: '⚙️', size: 68 },
    ],
  },
  Tools: {
    color: '#F05032',
    label: 'Tools & Cloud',
    skills: [
      { name: 'Git',     icon: '🔀', size: 80 },
      { name: 'GitHub',  icon: '🐙', size: 75 },
      { name: 'Azure',   icon: '☁️', size: 72 },
      { name: 'Power BI',icon: '📊', size: 68 },
      { name: 'Figma',   icon: '🎭', size: 65 },
    ],
  },
};

// Calculate positions for a cluster — offset grid pattern
function getPositions(count, cx, cy, spread) {
  const positions = [];
  const cols = Math.ceil(Math.sqrt(count * 1.4));
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const offset = row % 2 === 0 ? 0 : spread * 0.55;
    positions.push({
      x: cx + (col - cols / 2) * spread + offset,
      y: cy + (row - Math.floor(count / cols) / 2) * spread * 0.85,
    });
  }
  return positions;
}

// Cluster centers
const CENTERS = {
  Frontend:  { cx: 260, cy: 210, spread: 110 },
  Backend:   { cx: 680, cy: 160, spread: 115 },
  Languages: { cx: 820, cy: 380, spread: 110 },
  Tools:     { cx: 440, cy: 440, spread: 110 },
};

export default function Skills() {
  const [active, setActive]   = useState(null);
  const [hovered, setHovered] = useState(null);
  const svgRef = useRef(null);
  const viewBox = '0 0 1000 600';

  const categories = Object.keys(clusters);

  // Build flat node list with positions
  const nodes = [];
  categories.forEach(cat => {
    const { cx, cy, spread } = CENTERS[cat];
    const skillList = clusters[cat].skills;
    const positions = getPositions(skillList.length, cx, cy, spread);
    skillList.forEach((skill, i) => {
      nodes.push({
        ...skill,
        category: cat,
        color: clusters[cat].color,
        x: positions[i].x,
        y: positions[i].y,
      });
    });
  });

  // Build connections within cluster
  const connections = [];
  categories.forEach(cat => {
    const catNodes = nodes.filter(n => n.category === cat);
    const { cx, cy } = CENTERS[cat];
    catNodes.forEach(n => {
      connections.push({ x1: cx, y1: cy, x2: n.x, y2: n.y, cat });
    });
  });

  const isVisible = (node) => {
    if (!active) return true;
    return node.category === active;
  };

  return (
    <section
      id="skills"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle section accent */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Header — left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}
        >
          <div className="section-label">My Arsenal</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <h2 className="section-title gradient-text">Tech Constellation</h2>
            <p style={{ color: '#4a5568', fontSize: '0.88rem', marginBottom: '8px', maxWidth: '280px', lineHeight: 1.6 }}>
              Technologies I wield to craft digital experiences
            </p>
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          {['All', ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat === 'All' ? null : cat)}
              style={{
                padding: '7px 18px',
                borderRadius: '100px',
                border: `1px solid ${
                  (cat === 'All' && !active) || active === cat
                    ? 'rgba(124,58,237,0.5)'
                    : 'rgba(255,255,255,0.06)'
                }`,
                background: (cat === 'All' && !active) || active === cat
                  ? 'rgba(124,58,237,0.12)'
                  : 'transparent',
                color: (cat === 'All' && !active) || active === cat
                  ? '#a78bfa'
                  : '#4a5568',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'none',
                transition: 'all 0.2s ease',
                letterSpacing: '0.04em',
              }}
            >
              {cat === 'All' ? 'All' : clusters[cat].label}
            </button>
          ))}
        </motion.div>

        {/* Constellation SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <svg
            ref={svgRef}
            viewBox={viewBox}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            aria-label="Technology constellation"
          >
            {/* Cluster center labels */}
            {categories.map(cat => {
              const { cx, cy } = CENTERS[cat];
              const vis = !active || active === cat;
              return (
                <g key={cat} style={{ opacity: vis ? 1 : 0.12, transition: 'opacity 0.4s ease' }}>
                  {/* Cluster glow */}
                  <circle
                    cx={cx} cy={cy} r={24}
                    fill={clusters[cat].color}
                    fillOpacity={vis ? 0.06 : 0}
                  />
                  <circle
                    cx={cx} cy={cy} r={12}
                    fill={clusters[cat].color}
                    fillOpacity={0.18}
                  />
                  <circle
                    cx={cx} cy={cy} r={5}
                    fill={clusters[cat].color}
                    fillOpacity={0.9}
                  />
                  <text
                    x={cx} y={cy - 22}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    fill={clusters[cat].color}
                    fillOpacity={0.7}
                    fontWeight="600"
                    letterSpacing="0.1em"
                  >
                    {clusters[cat].label.toUpperCase()}
                  </text>
                </g>
              );
            })}

            {/* Connection lines */}
            {connections.map((c, i) => {
              const vis = !active || active === c.cat;
              return (
                <line
                  key={i}
                  x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                  stroke={clusters[c.cat].color}
                  strokeOpacity={vis ? 0.12 : 0.02}
                  strokeWidth="1"
                  style={{ transition: 'stroke-opacity 0.4s ease' }}
                />
              );
            })}

            {/* Skill nodes — rendered as foreignObject for emoji + text */}
            {nodes.map((node, i) => {
              const vis = isVisible(node);
              const isHov = hovered === `${node.category}-${node.name}`;
              const r = node.size / 2;

              return (
                <g
                  key={`${node.category}-${node.name}`}
                  transform={`translate(${node.x}, ${node.y})`}
                  style={{
                    opacity: vis ? 1 : 0.1,
                    transition: 'opacity 0.4s ease',
                    cursor: 'none',
                  }}
                  onMouseEnter={() => setHovered(`${node.category}-${node.name}`)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Hover glow ring */}
                  {isHov && (
                    <circle
                      r={r + 10}
                      fill={node.color}
                      fillOpacity={0.08}
                      stroke={node.color}
                      strokeOpacity={0.3}
                      strokeWidth="1"
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    r={r}
                    fill={`${node.color}10`}
                    stroke={node.color}
                    strokeOpacity={isHov ? 0.6 : 0.2}
                    strokeWidth={isHov ? 1.5 : 1}
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Icon */}
                  <text
                    y={-4}
                    textAnchor="middle"
                    fontSize={node.size * 0.32}
                    dominantBaseline="middle"
                  >
                    {node.icon}
                  </text>

                  {/* Label */}
                  <text
                    y={r * 0.45}
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="Inter, sans-serif"
                    fill="#94a3b8"
                    fontWeight={isHov ? '700' : '500'}
                    style={{ transition: 'all 0.2s ease' }}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Hovered skill info bar */}
        <div style={{ height: '40px', display: 'flex', alignItems: 'center', paddingLeft: '8px', marginTop: '12px' }}>
          <AnimatePresence>
            {hovered && (() => {
              const n = nodes.find(n => `${n.category}-${n.name}` === hovered);
              return n ? (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{n.icon}</span>
                  <span style={{ color: '#f1f0f6', fontWeight: 600, fontSize: '0.88rem' }}>{n.name}</span>
                  <span style={{ color: '#4a5568', fontSize: '0.75rem' }}>·</span>
                  <span style={{ color: n.color, fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {clusters[n.category].label}
                  </span>
                </motion.div>
              ) : null;
            })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
