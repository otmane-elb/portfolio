'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleResize();
    handleScroll();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const links = [
    { name: 'Work', href: '/projects' },
    { name: 'Experience', href: '/experience' },
  ];

  let username = 'otmane elbaghazaoui';
  let typingClass = 'animate-typing-desktop';
  if (mounted && isMobile) {
    username = 'otmane';
    typingClass = 'animate-typing-mobile';
  }

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-3.5 rounded-2xl transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(7, 6, 15, 0.85)'
              : 'rgba(13, 11, 26, 0.6)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: scrolled
              ? '1px solid rgba(139, 92, 246, 0.2)'
              : '1px solid rgba(255,255,255,0.05)',
            boxShadow: scrolled
              ? '0 4px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.1)'
              : '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono shrink-0 w-[110px] sm:w-[270px] overflow-hidden whitespace-nowrap"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(124,58,237,0.3))',
                border: '1px solid rgba(139,92,246,0.4)',
                color: '#a78bfa',
                boxShadow: '0 0 12px rgba(139,92,246,0.2)',
              }}
            >
              &lt;/&gt;
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-tight transition-colors group-hover:text-purple-400 flex items-center whitespace-nowrap" style={{ color: '#f0ecff' }}>
              <span>~/</span><span className={typingClass} style={{ color: '#a78bfa' }}>{username}</span><span className="animate-cursor-blink" style={{ color: '#ec4899' }}>_</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover:text-white"
                  style={{
                    color: isActive ? '#a78bfa' : '#b8acd6',
                    background: isActive ? 'rgba(157,111,255,0.15)' : 'transparent',
                  }}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        border: '1px solid rgba(139,92,246,0.3)',
                        background: 'rgba(139,92,246,0.08)',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="mailto:otmane.elbaghzaoui@gmail.com"
              className="ml-3 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: '#fff',
                border: '1px solid rgba(139,92,246,0.4)',
                boxShadow: '0 0 16px rgba(139,92,246,0.25)',
              }}
            >
              Hire Me
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="sm:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors"
            style={{ color: '#a78bfa' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              className="block h-0.5 w-5 rounded-full"
              style={{ background: '#a78bfa' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block h-0.5 w-5 rounded-full"
              style={{ background: '#a78bfa' }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              className="block h-0.5 w-5 rounded-full"
              style={{ background: '#a78bfa' }}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 mt-2 rounded-2xl p-3 flex flex-col gap-1"
              style={{
                background: 'rgba(7, 6, 15, 0.95)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(139,92,246,0.2)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              }}
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-xl transition-all"
                  style={{
                    color: pathname?.startsWith(link.href) ? '#a78bfa' : '#7c6aad',
                    background: pathname?.startsWith(link.href) ? 'rgba(139,92,246,0.1)' : 'transparent',
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="mailto:otmane.elbaghzaoui@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="mt-1 px-4 py-3 text-sm font-semibold rounded-xl text-center"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: '#fff',
                }}
              >
                Hire Me
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
