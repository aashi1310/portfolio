import { motion } from 'framer-motion';
import { ArrowUp, Heart, Coffee } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative',
      padding: '60px 24px 40px',
      overflow: 'hidden',
    }}>
      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              borderRadius: '50%',
              background: '#8B5CF6',
              opacity: Math.random() * 0.4 + 0.1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 6}s ease-in-out infinite ${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing divider */}
      <div className="neon-line" style={{ marginBottom: '40px' }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
      }}>
        {/* Left - Brand */}
        <div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '6px',
            letterSpacing: '-0.02em',
          }}>AASHIKA JAIN</div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#4B5563',
            fontSize: '0.82rem',
          }}>
            Made with
            <Heart size={12} color="#A855F7" style={{ fill: '#A855F7' }} />
            and
            <Coffee size={12} color="#A855F7" />
            lots of coffee
          </div>
        </div>

        {/* Center - Copyright */}
        <div style={{
          color: '#4B5563',
          fontSize: '0.8rem',
          textAlign: 'center',
        }}>
          © {new Date().getFullYear()} Aashika Jain. All rights reserved.
        </div>

        {/* Right - Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.3)',
            color: '#A855F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'none',
            boxShadow: '0 0 20px rgba(139,92,246,0.2)',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(139,92,246,0.5)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(139,92,246,0.2)';
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      </div>
    </footer>
  );
}
