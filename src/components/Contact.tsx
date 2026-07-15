import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin } from 'lucide-react';

// Inline social icons — these don't exist in this lucide version
const GithubIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/aashi1310',
    color: '#f1f0f6',
    description: 'aashi1310',
    icon: GithubIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aashikajain5/',
    color: '#0A66C2',
    description: 'Aashika Jain',
    icon: LinkedinIcon,
  },
  {
    label: 'Email',
    href: 'mailto:aashikajain1310@gmail.com',
    color: '#a78bfa',
    description: 'aashikajain1310@gmail.com',
    icon: Mail,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSend] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true);
    setTimeout(() => {
      setSend(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1400);
  };

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  return (
    <section
      id="contact"
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
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
        {/* Large editorial CTA header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}
        >
          <div className="section-label">Let's Work Together</div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <h2
              className="section-title"
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
                maxWidth: '700px',
              }}
            >
              <span className="gradient-text">Let's build</span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.15)', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                something
              </span>
              <br />
              <span className="gradient-text">remarkable.</span>
            </h2>

            <div style={{ paddingTop: '8px' }}>
              <div className="availability-badge" style={{ marginBottom: '12px' }}>
                <div className="availability-dot" />
                Open to opportunities
              </div>
              <p style={{ color: '#4a5568', fontSize: '0.82rem', lineHeight: 1.6, maxWidth: '220px' }}>
                Usually responds within 24 hours. Based in India (IST).
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="line-glow" style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }} />

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
        >
          {/* ── LEFT — info ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '2rem' }}>
              I'm always excited to discuss interesting projects, creative collaborations,
              and new opportunities. Whether you have a project in mind or just want to say hi — my inbox is open.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ x: 6 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '14px',
                    textDecoration: 'none',
                    cursor: 'none',
                    transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${s.color}35`;
                    e.currentTarget.style.background = `${s.color}06`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${s.color}10`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '40px', height: '40px',
                      borderRadius: '12px',
                      background: `${s.color}12`,
                      border: `1px solid ${s.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <s.icon size={18} color={s.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#f1f0f6', fontSize: '0.85rem' }}>{s.label}</div>
                    <div style={{ color: '#4a5568', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
                      {s.description}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                color: '#4a5568', fontSize: '0.8rem',
              }}
            >
              <MapPin size={14} color="#7c3aed" />
              <span>Bennett University, Greater Noida, India</span>
            </div>
          </motion.div>

          {/* ── RIGHT — form ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div
              className="glass-strong"
              style={{
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 40px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#4a5568',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontFamily: 'JetBrains Mono, monospace',
                      marginBottom: '8px',
                    }}
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Full name"
                    required
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#4a5568',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontFamily: 'JetBrains Mono, monospace',
                      marginBottom: '8px',
                    }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="hello@company.com"
                    required
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#4a5568',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontFamily: 'JetBrains Mono, monospace',
                      marginBottom: '8px',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    required
                    rows={5}
                    className="form-input"
                    style={{ resize: 'vertical', minHeight: '130px' }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending || sent}
                  whileHover={!sending && !sent ? { scale: 1.02 } : {}}
                  whileTap={!sending && !sent ? { scale: 0.98 } : {}}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    padding: '15px',
                    opacity: sending ? 0.75 : 1,
                  }}
                >
                  {sent ? (
                    <><CheckCircle size={16} /> Message sent!</>
                  ) : sending ? (
                    <>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '16px', height: '16px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>Send Message <Send size={14} /></>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
