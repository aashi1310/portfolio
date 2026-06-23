import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Link, Mail, Send, CheckCircle } from 'lucide-react';
const Github = Code;
const Linkedin = Link;

const socials = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/aashikajain',
    color: '#ffffff',
    description: 'Check out my code',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aashikajain',
    color: '#0A66C2',
    description: 'Connect professionally',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:aashikajain@email.com',
    color: '#A855F7',
    description: 'Send me a message',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    fontFamily: 'inherit',
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center bottom, rgba(139,92,246,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
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
          }}>Get In Touch</span>
          <h2 className="section-title gradient-text">Let's Connect</h2>
          <div className="neon-line" style={{ width: '80px', margin: '16px auto 0' }} />
          <p style={{ color: '#94A3B8', marginTop: '1rem', fontSize: '0.95rem', maxWidth: '500px', margin: '1rem auto 0' }}>
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass-strong" style={{
              borderRadius: '24px',
              padding: '36px',
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '24px',
              }}>Send a Message</h3>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', marginBottom: '8px', letterSpacing: '0.05em' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Aashika Jain"
                    required
                    style={inputStyle}
                    onFocus={e => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(139,92,246,0.5)';
                      (e.target as HTMLInputElement).style.boxShadow = '0 0 20px rgba(139,92,246,0.15)';
                    }}
                    onBlur={e => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.target as HTMLInputElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', marginBottom: '8px', letterSpacing: '0.05em' }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="hello@example.com"
                    required
                    style={inputStyle}
                    onFocus={e => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(139,92,246,0.5)';
                      (e.target as HTMLInputElement).style.boxShadow = '0 0 20px rgba(139,92,246,0.15)';
                    }}
                    onBlur={e => {
                      (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.target as HTMLInputElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.82rem', marginBottom: '8px', letterSpacing: '0.05em' }}>
                    MESSAGE
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Let's build something amazing..."
                    required
                    rows={5}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '120px',
                    }}
                    onFocus={e => {
                      (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(139,92,246,0.5)';
                      (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 20px rgba(139,92,246,0.15)';
                    }}
                    onBlur={e => {
                      (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)';
                      (e.target as HTMLTextAreaElement).style.boxShadow = 'none';
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sending || sent}
                  className="btn-glow"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    border: 'none',
                    cursor: 'none',
                    opacity: sending ? 0.7 : 1,
                  }}
                >
                  {sent ? (
                    <><CheckCircle size={18} /> Message Sent!</>
                  ) : sending ? (
                    <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚡</span> Sending...</>
                  ) : (
                    <><Send size={18} /> Let's Build Something Amazing</>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '8px',
              }}>Find me online</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6 }}>
                I'm always open to interesting conversations, collaborations, and new opportunities.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    cursor: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = `${social.color}40`;
                    el.style.boxShadow = `0 0 20px ${social.color}15`;
                    el.style.background = `${social.color}08`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.borderColor = 'rgba(255,255,255,0.06)';
                    el.style.boxShadow = 'none';
                    el.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: `${social.color}15`,
                    border: `1px solid ${social.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <social.icon size={24} color={social.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{social.label}</div>
                    <div style={{ color: '#94A3B8', fontSize: '0.82rem' }}>{social.description}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Fun fact */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6 }}
              className="glass"
              style={{
                marginTop: '2rem',
                borderRadius: '16px',
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>☕</div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                Usually available during <span style={{ color: '#A855F7' }}>IST business hours</span>.<br />
                I respond within 24 hours.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
