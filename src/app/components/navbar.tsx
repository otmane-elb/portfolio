'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { EMAIL } from '../lib/data';

const LINKS = [
  { name: 'Work', href: '/projects' },
  { name: 'Experience', href: '/experience' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  if (pathname?.startsWith('/rightframe')) return null;

  return (
    <header className="sticky top-0 z-50">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          scrolled || menuOpen ? 'bg-bg/80 backdrop-blur-xl border-line' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" aria-label="Home">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong font-mono text-[11px] text-fg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-fg">
              OE
            </span>
            <span className="hidden sm:block text-sm font-medium text-fg">
              Otmane El Baghazaoui
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            {LINKS.map((link) => {
              const active = pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm transition-colors ${active ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-1/2 -bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}
                </Link>
              );
            })}
            <a href={`mailto:${EMAIL}`} className="btn btn-primary ml-3 !py-2 !px-4 text-sm">
              Hire me
            </a>
          </nav>

          <button
            className="sm:hidden relative h-9 w-9 rounded-full border border-line-strong"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 0 : -3 }}
              className="absolute left-1/2 top-1/2 -ml-2 h-px w-4 bg-fg"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 0 : 3 }}
              className="absolute left-1/2 top-1/2 -ml-2 h-px w-4 bg-fg"
            />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="sm:hidden overflow-hidden"
            >
              <div className="container-page flex flex-col pb-6 pt-2">
                {[{ name: 'Home', href: '/' }, ...LINKS].map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between border-b border-line py-4 text-2xl tracking-tight text-fg"
                    >
                      {link.name}
                      <i className="fa-solid fa-arrow-right text-sm text-fg-3" />
                    </Link>
                  </motion.div>
                ))}
                <a href={`mailto:${EMAIL}`} className="btn btn-accent mt-6 justify-center">
                  Hire me
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
