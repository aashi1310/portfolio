import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const GithubIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Contact', id: 'contact' },
];

const socials = [
  { icon: GithubIcon, href: 'https://github.com/aashi1310', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/aashikajain5/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:aashikajain1310@gmail.com', label: 'Email' },
];

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: 'clamp(40px, 6vw, 64px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* Subtle top glow */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(167,139,250,0.4), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '2rem',
            alignItems: 'start',
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 900,
                fontSize: '1.5rem',
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #ffffff, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px',
              }}
            >
              AJ<span style={{ color: '#7c3aed', WebkitTextFillColor: '#7c3aed' }}>.</span>
            </div>
            <p style={{ color: '#2d3748', fontSize: '0.8rem', lineHeight: 1.6, maxWidth: '200px' }}>
              Full Stack Developer & AI Enthusiast crafting digital experiences.
            </p>
          </div>

          {/* Nav */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none', border: 'none', cursor: 'none',
                  fontSize: '0.8rem',
                  color: '#2d3748',
                  transition: 'color 0.2s ease',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#94a3b8'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#2d3748'; }}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '40px', height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'none', textDecoration: 'none',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(124,58,237,0.35)';
                  e.currentTarget.style.background = 'rgba(124,58,237,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
                aria-label={label}
              >
                <Icon size={16} color="#64748b" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="line-violet" />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '20px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ color: '#2d3748', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>
            © {new Date().getFullYear()} Aashika Jain. All rights reserved.
          </span>

          <span style={{ color: '#1a2030', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace' }}>

          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer > div > div:first-child > nav {
            align-items: flex-start !important;
          }
          footer > div > div:first-child > div:last-child {
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
