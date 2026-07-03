'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = [
    { name: 'Experience', href: '/experience' },
    { name: 'Projects', href: '/projects' },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
      <div className="flex items-center justify-between rounded-2xl glass-card px-4 sm:px-6 py-4 shadow-lg backdrop-blur-md">
        <Link href="/" className="group flex items-center gap-1.5 sm:gap-2 font-mono shrink-0 w-[110px] sm:w-[260px] overflow-hidden whitespace-nowrap">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-blue-600/10 border border-blue-600/25 text-[#1d4ed8] font-bold text-xs sm:text-sm shrink-0">
            &lt;/&gt;
          </div>
          <span className="text-xs sm:text-base font-bold tracking-tight text-neutral-100 transition-colors group-hover:text-blue-600 flex items-center whitespace-nowrap">
            ~/
            {!mounted ? (
              <span className="animate-typing-desktop">otmane elbaghazaoui</span>
            ) : isMobile ? (
              <span className="animate-typing-mobile">otmane</span>
            ) : (
              <span className="animate-typing-desktop">otmane elbaghazaoui</span>
            )}
            <span className="text-[#dc143c] animate-cursor-blink">_</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {links.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#1d4ed8]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
