'use client';
import { motion } from 'framer-motion';

export default function Footer() {
  const socials = [
    { href: 'https://github.com/otmane-elb', icon: 'fa-brands fa-github', label: 'GitHub' },
    { href: 'https://x.com/elbaghazaoui', icon: 'fa-brands fa-x-twitter', label: 'X (Twitter)' },
    { href: 'https://www.linkedin.com/in/otmane-el-baghazaoui/', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
    { href: 'mailto:otmane.elbaghazaoui@gmail.com', icon: 'fa-solid fa-envelope', label: 'Email' },
  ];

  return (
    <footer className="mt-24 relative">
      {/* Top separator glow */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 30%, rgba(236,72,153,0.3) 70%, transparent 100%)',
          marginBottom: '0',
        }}
      />

      <div
        className="relative py-16 px-4"
        style={{ background: 'rgba(7,6,15,0.6)' }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '200px',
            background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="relative max-w-7xl mx-auto space-y-12">

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div>
              <span className="section-label" style={{ color: '#c4b5fd' }}>Get in touch</span>
              <h3
                className="mt-3 text-3xl sm:text-4xl font-bold"
                style={{ fontFamily: 'Space Grotesk', color: '#f0ecff' }}
              >
                Let&apos;s Build Something{' '}
                <span className="text-gradient">Amazing</span>
              </h3>
              <p className="mt-3 text-sm max-w-md mx-auto leading-relaxed" style={{ color: '#b8acd6' }}>
                Whether you want to collaborate on a government or enterprise mobile project, or just say hi — I&apos;m always open to new engineering challenges.
              </p>
            </div>

            <a
              href="mailto:otmane.elbaghzaoui@gmail.com"
              id="footer-contact-btn"
              className="btn-glow inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-sm font-bold"
            >
              <i className="fa-solid fa-paper-plane" />
              <span>otmane.elbaghzaoui@gmail.com</span>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                id={`footer-social-${s.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
                className="group flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: 'rgba(157,111,255,0.08)',
                  border: '1px solid rgba(157,111,255,0.22)',
                  color: '#c4b5fd',
                }}
              >
                <i
                  className={`${s.icon} text-lg transition-all duration-300 group-hover:text-white`}
                  style={{ color: 'inherit' }}
                />
              </a>
            ))}
          </motion.div>

          {/* CV downloads */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="section-label" style={{ color: '#c4b5fd' }}>Download my CV</p>
            <div className="flex items-center gap-4">
              {[
                { href: '/files/cv-en.pdf', label: 'CV — English' },
                { href: '/files/cv-fr.pdf', label: 'CV — Français' },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  download
                  id={`footer-cv-${label.toLowerCase().includes('english') ? 'en' : 'fr'}`}
                  className="group inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(157,111,255,0.1)',
                    border: '1px solid rgba(157,111,255,0.3)',
                    color: '#c4b5fd',
                  }}
                >
                  <i className="fa-solid fa-download group-hover:animate-bounce" />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs"
            style={{
              borderTop: '1px solid rgba(157,111,255,0.15)',
              color: '#8b7fb8',
            }}
          >
            <p>© {new Date().getFullYear()} Otmane El Baghazaoui. All rights reserved.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              id="footer-scroll-top"
              className="flex items-center gap-2 transition-colors duration-300 group hover:text-purple-300"
              style={{ color: '#8b7fb8' }}
            >
              Back to top
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↑
              </motion.span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
