'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Card from './components/Card';
import Badge from './components/Badge';
import { useEffect, useRef, useState } from 'react';

/* ======================================================
   ANIMATED BACKGROUND CANVAS
   Draws drifting violet aurora blobs + particle field
   ====================================================== */
function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: ((i * 37) % 100) / 100,
      y: ((i * 61) % 100) / 100,
      r: (((i * 13) % 10) / 10) * 1.5 + 0.4,
      vx: ((((i * 7) % 10) - 5) / 10) * 0.0002,
      vy: ((((i * 11) % 10) - 5) / 10) * 0.0002,
      alpha: (((i * 17) % 10) / 20) + 0.2,
    }));

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Aurora blobs
      const blobs = [
        { cx: 0.25 + Math.sin(t * 0.0008) * 0.12, cy: 0.25 + Math.cos(t * 0.0006) * 0.1, r: 0.55, c0: 'rgba(157,111,255,0.28)', c1: 'rgba(157,111,255,0)' },
        { cx: 0.75 + Math.cos(t * 0.0007) * 0.1, cy: 0.6 + Math.sin(t * 0.0009) * 0.1, r: 0.45, c0: 'rgba(124,58,237,0.22)', c1: 'rgba(124,58,237,0)' },
        { cx: 0.5 + Math.sin(t * 0.0005) * 0.08, cy: 0.8 + Math.cos(t * 0.0007) * 0.06, r: 0.35, c0: 'rgba(244,114,182,0.18)', c1: 'rgba(244,114,182,0)' },
        { cx: 0.85 + Math.cos(t * 0.001) * 0.06, cy: 0.15 + Math.sin(t * 0.0008) * 0.08, r: 0.3, c0: 'rgba(196,181,253,0.2)', c1: 'rgba(196,181,253,0)' },
      ];

      for (const b of blobs) {
        const bx = b.cx * w;
        const by = b.cy * h;
        const br = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        g.addColorStop(0, b.c0);
        g.addColorStop(1, b.c1);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }

      // Particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,181,253,${p.alpha * (0.9 + 0.1 * Math.sin(t * 0.002 + p.x * 10))})`;
        ctx.fill();
      }

      t++;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />;
}

/* ======================================================
   SCROLL PROGRESS BAR
   ====================================================== */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #9d6fff, #c4b5fd, #f472b6)',
        transformOrigin: '0%',
        zIndex: 9999,
        boxShadow: '0 0 10px rgba(157,111,255,0.8)',
      }}
    />
  );
}

/* ======================================================
   SCROLL REVEAL WRAPPER — whileInView scale + fade
   ====================================================== */
function ScrollReveal({
  children,
  delay = 0,
  scale = true,
}: Readonly<{
  children: React.ReactNode;
  delay?: number;
  scale?: boolean;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: scale ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ======================================================
   SKILLS / STACK ITEMS
   ====================================================== */
const STACK = [
  { icon: '📱', label: 'Flutter' },
  { icon: '🎯', label: 'Dart' },
  { icon: '🔐', label: 'Security' },
  { icon: '🏛️', label: 'Gov APIs' },
  { icon: '⚡', label: 'Riverpod' },
  { icon: '🗺️', label: 'Google Maps' },
  { icon: '🧪', label: 'Testing' },
  { icon: '🚀', label: 'CI/CD' },
];

/* ======================================================
   PROJECTS DATA
   ====================================================== */
const PROJECTS_DATA = [
  {
    id: 'passeport',
    title: 'Passeport Maroc',
    href: '/projects/passeport',
    description: 'Official government app for passport requests — NFC identity scanning, CMI payments, and banking-grade security.',
    image: '/images/passeport01.jpg',
    screenshots: 15,
    badges: ['Flutter', 'NFC Scanner', 'CMI Payments'],
    color: '#8b5cf6',
  },
  {
    id: 'eparapheur',
    title: 'Eparapheur',
    href: '/projects/eparapheur',
    description: 'Mobile companion enabling complete digitalization of mail processing and validation within public administrations.',
    image: '/images/eparapheur01.jpg',
    screenshots: 6,
    badges: ['Flutter', 'Mail Signing', 'Government APIs'],
    color: '#7c3aed',
  },
  {
    id: 'rendezvous',
    title: 'Rendez-vous',
    href: '/projects/rendezvous',
    description: 'Government appointments scheduling application featuring advanced calendar management and synchronization.',
    image: '/images/rendezvous01.jpg',
    screenshots: 7,
    badges: ['Flutter', 'Calendar', 'Conflict Check'],
    color: '#a78bfa',
  },
  {
    id: 'chikaya',
    title: 'Chikaya',
    href: '/projects/chikaya',
    description: 'National complaints application for submitting and routing complaints directed toward Moroccan public administrations.',
    image: '/images/chikaya01.jpg',
    screenshots: 8,
    badges: ['Flutter', 'Routing', 'Form Validation'],
    color: '#ec4899',
  },
  {
    id: 'bod',
    title: "Bureau d'Ordre",
    href: '/projects/bod',
    description: 'Digital correspondence tracking and mail registration system for public administrations with secure audit trails.',
    image: '/images/bod01.jpg',
    screenshots: 9,
    badges: ['Flutter', 'Document Tracking', 'Audit'],
    color: '#8b5cf6',
  },
  {
    id: 'eliteconect',
    title: 'EliteConect',
    href: '/projects/eliteconect',
    description: 'Enterprise sports recruitment and network connection platform matching athletes, agents, and clubs globally.',
    image: '/images/ec01.jpg',
    screenshots: 17,
    badges: ['Flutter', 'Social Network', 'Profile Matcher'],
    color: '#7c3aed',
  },
  {
    id: 'topela',
    title: 'Topela',
    href: '/projects/topela',
    description: 'Premium cross-platform mobile architecture with customized security models and multi-device synchronization.',
    image: '/images/topela01.webp',
    screenshots: 21,
    badges: ['Flutter', 'Sync Engine', 'Custom UI'],
    color: '#a78bfa',
  },
];

/* ======================================================
   STAT COUNTER COMPONENT
   ====================================================== */
function StatCounter({ value, suffix = '', label }: Readonly<{ value: number; suffix?: string; label: string }>) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold" style={{ color: '#c4b5fd', fontFamily: 'Space Grotesk' }}>
        {count}{suffix}
      </div>
      <div className="text-xs mt-1 font-medium tracking-wider uppercase" style={{ color: '#8b7fb8' }}>{label}</div>
    </div>
  );
}

/* ======================================================
   COVERFLOW CARD COMPONENT
   ====================================================== */
interface CoverflowCardProps {
  readonly project: (typeof PROJECTS_DATA)[number];
  readonly d: number;
  readonly isMobile: boolean;
  readonly onSelect: () => void;
}

function ActiveCard({ project, isMobile }: { readonly project: (typeof PROJECTS_DATA)[number]; readonly isMobile: boolean }) {
  const cardPadding = isMobile ? '20px' : '28px';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="absolute"
      style={{
        transform: 'translateX(0px) scale(1)',
        zIndex: 30,
        opacity: 1,
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-in-out',
        cursor: 'default',
        width: 'min(92%, 680px)',
      }}
    >
      <div
        className="flex gap-5 items-center flex-col md:flex-row relative overflow-hidden"
        style={{
          background: 'rgba(19,17,36,0.95)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(157,111,255,0.4)',
          borderRadius: '24px',
          padding: cardPadding,
          boxShadow: '0 25px 60px rgba(0,0,0,0.65), 0 0 35px rgba(157,111,255,0.22), inset 0 1px 0 rgba(157,111,255,0.25)',
          height: 'auto',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)`,
          }}
        />

        <div className="flex-1 text-left space-y-4">
          <h3
            className="font-bold leading-tight text-xl lg:text-2xl"
            style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}
          >
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed line-clamp-3" style={{ color: '#b8acd6' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.badges.map((b) => (
              <span
                key={b}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-md"
                style={{
                  background: 'rgba(157,111,255,0.18)',
                  color: '#e2d9fc',
                  border: '1px solid rgba(157,111,255,0.35)',
                }}
              >
                {b}
              </span>
            ))}
          </div>
          <Link
            href={project.href}
            id={`project-link-${project.id}`}
            className="btn-glow inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
          >
            <span>Case Study</span>
            <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>

        <div
          className="aspect-[9/19] rounded-2xl overflow-hidden relative shadow-xl shrink-0 w-[130px] sm:w-[160px]"
          style={{
            border: '4px solid #0d0b1a',
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${project.color}30`,
            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-[#0d0b1a] rounded-full z-20 flex items-center justify-center">
            <div className="w-1.5 h-1 rounded-full bg-[#1a1730]" />
          </div>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover rounded-[10px] select-none"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, ${project.color}10, transparent 40%)`,
              borderRadius: '10px',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function InactiveCard({
  project,
  d,
  onSelect,
}: {
  readonly project: (typeof PROJECTS_DATA)[number];
  readonly d: number;
  readonly onSelect: () => void;
}) {
  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ scale: 0.82, opacity: 0.7 }}
      className="absolute"
      style={{
        transform: `translateX(${d * 290}px) scale(0.74)`,
        zIndex: 30 - Math.abs(d),
        opacity: 0.35 - Math.abs(d) * 0.06,
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-in-out',
        cursor: 'pointer',
        width: '220px',
      }}
    >
      <div
        className="flex gap-5 items-center flex-col justify-between relative overflow-hidden"
        style={{
          background: 'rgba(15,13,28,0.75)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          height: '320px',
        }}
      >
        <div className="flex-1 text-left space-y-2 w-full mt-auto">
          <h3
            className="font-bold leading-tight text-xs text-center"
            style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}
          >
            {project.title}
          </h3>
        </div>

        <div
          className="aspect-[9/19] rounded-2xl overflow-hidden relative shadow-xl shrink-0 w-[100px] mx-auto"
          style={{
            border: '4px solid #0d0b1a',
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${project.color}30`,
            transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-[#0d0b1a] rounded-full z-20 flex items-center justify-center">
            <div className="w-1.5 h-1 rounded-full bg-[#1a1730]" />
          </div>
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover rounded-[10px] select-none"
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, ${project.color}10, transparent 40%)`,
              borderRadius: '10px',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function CoverflowCard({ project, d, isMobile, onSelect }: CoverflowCardProps) {
  if (Math.abs(d) > 2) return null;
  if (d === 0) return <ActiveCard project={project} isMobile={isMobile} />;
  if (isMobile) return null;
  return <InactiveCard project={project} d={d} onSelect={onSelect} />;
}

/* ======================================================
   MAIN PAGE
   ====================================================== */
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.96]);
  const heroAvatarY = useTransform(heroScroll, [0, 1], [0, 40]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoplay]);

  const handleManualChange = (idx: number) => {
    setActiveIndex(idx);
    setAutoplay(false);
    const timeout = setTimeout(() => setAutoplay(true), 12000);
    return () => clearTimeout(timeout);
  };

  const getRelativeIndex = (idx: number) => {
    let d = idx - activeIndex;
    if (d < -PROJECTS_DATA.length / 2) d += PROJECTS_DATA.length;
    if (d > PROJECTS_DATA.length / 2) d -= PROJECTS_DATA.length;
    return d;
  };

  const FADE_UP = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const STAGGER = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <>
      <ScrollProgressBar />
      <motion.div initial="hidden" animate="show" variants={STAGGER} className="space-y-32 pb-8">

        {/* ===================== HERO SECTION ===================== */}
        <motion.section
          ref={heroRef}
          variants={FADE_UP}
          className="relative min-h-[600px] flex items-center rounded-3xl overflow-hidden"
          style={{
            scale: heroScale,
            border: '1px solid rgba(157,111,255,0.25)',
            boxShadow: '0 0 100px rgba(157,111,255,0.15), inset 0 0 80px rgba(157,111,255,0.06)',
          }}
        >
          {/* Aurora background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(13,11,26,0.95) 0%, rgba(20,15,40,0.9) 100%)',
            }}
          >
            <AuroraCanvas />
            {/* Subtle grid lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
          </div>

          {/* Hero content */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">

            {/* Left: Text */}
            <div className="space-y-8 p-8 sm:p-12 lg:p-16">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <span className="accent-dot animate-pulse-glow" />
                <span
                  className="section-label"
                  style={{ color: '#c4b5fd', fontWeight: 700 }}
                >🇲🇦 Flutter Developer — Based in Morocco, Available Worldwide</span>
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]" style={{ fontFamily: 'Space Grotesk' }}>
                  Hi, I&apos;m{' '}
                  <span className="text-gradient">Otmane</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="text-base sm:text-lg leading-relaxed max-w-lg"
                style={{ color: '#b8acd6' }}
              >
                I engineer{' '}
                <strong style={{ color: '#c4b5fd', fontWeight: 600 }}>secure, government-grade</strong>{' '}
                mobile applications with Flutter. Specializing in high-performance architecture, pixel-perfect UI, and banking-level security.
              </motion.p>

              {/* Stack pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="flex flex-wrap gap-2"
              >
                {STACK.map((item, i) => (
                  <motion.span
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{
                      background: 'rgba(157,111,255,0.12)',
                      border: '1px solid rgba(157,111,255,0.25)',
                      color: '#c4b5fd',
                    }}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  href="mailto:otmane.elbaghzaoui@gmail.com"
                  id="hero-contact-btn"
                  className="btn-glow inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-bold"
                >
                  <i className="fa-solid fa-paper-plane text-sm" />
                  <span>Let&apos;s Talk</span>
                </Link>
                <Link
                  href="/projects"
                  id="hero-projects-btn"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group"
                  style={{ color: '#c4b5fd' }}
                >
                  View Projects
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Right: Avatar — fully integrated, clips within its column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
              style={{
                position: 'relative',
                minHeight: '580px',
                y: heroAvatarY,
              }}
            >
              {/* Deep violet radial glow — behind the figure */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse 70% 80% at 60% 40%, rgba(109,40,217,0.35) 0%, rgba(139,92,246,0.12) 45%, transparent 75%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Magenta accent glow — lower body area */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-30%)',
                  width: '280px',
                  height: '180px',
                  background: 'radial-gradient(ellipse, rgba(236,72,153,0.18) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* The photo — centered within the column */}
              <motion.img
                src="/profile-transparent.png"
                alt="Otmane El Baghazaoui"
                id="hero-avatar"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-5%',
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  height: '92%',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'bottom center',
                  zIndex: 1,
                  filter: 'drop-shadow(0 0 50px rgba(109,40,217,0.6)) drop-shadow(0 -10px 80px rgba(139,92,246,0.25)) saturate(0.88) brightness(0.93)',
                }}
              />

              {/* Bottom fade — blends figure into card seamlessly */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(13,11,26,1) 0%, rgba(13,11,26,0.85) 20%, rgba(13,11,26,0.4) 55%, transparent 100%)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />

              {/* Left edge fade — bleeds into the text column */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: '55%',
                  background: 'linear-gradient(to right, rgba(13,11,26,1) 0%, rgba(13,11,26,0.7) 35%, transparent 100%)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />

              {/* Top fade */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '20%',
                  background: 'linear-gradient(to bottom, rgba(13,11,26,0.7) 0%, transparent 100%)',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />

              {/* Floating badge — bottom right (above fade overlays) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '60px',
                  right: '0px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  background: 'rgba(7,6,15,0.85)',
                  border: '1px solid rgba(139,92,246,0.4)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 16px rgba(139,92,246,0.25)',
                }}
              >
                <span style={{ color: '#a78bfa', fontSize: 18 }}>📱</span>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#f0ecff' }}>Flutter Dev</div>
                  <div style={{ fontSize: '10px', color: '#5a4d7a' }}>4+ years</div>
                </div>
              </motion.div>

              {/* Top floating badge — Gov Security */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  position: 'absolute',
                  top: '60px',
                  right: '20px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  background: 'rgba(7,6,15,0.85)',
                  border: '1px solid rgba(236,72,153,0.35)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 16px rgba(236,72,153,0.2)',
                }}
              >
                <span style={{ color: '#ec4899', fontSize: 16 }}>🔐</span>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#c4b5fd' }}>Gov-Grade Security</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ===================== STATS ROW ===================== */}
        <ScrollReveal>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ background: 'rgba(157,111,255,0.12)', border: '1px solid rgba(157,111,255,0.18)' }}
          >
            {[
              { value: 7, suffix: '+', label: 'Apps Shipped' },
              { value: 3, suffix: '+', label: 'Years Experience' },
              { value: 2, suffix: 'M+', label: 'Moroccan Users' },
              { value: 5, suffix: '', label: 'Gov Ministries' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="py-10 px-6"
                style={{ background: 'rgba(12,11,24,0.92)' }}
              >
                <StatCounter {...stat} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ===================== PROJECTS CAROUSEL ===================== */}
        <ScrollReveal scale={false}>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="section-label" style={{ color: '#c4b5fd' }}>Portfolio</span>
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                  Featured{' '}
                  <span className="text-gradient">Projects</span>
                </h2>
                <p className="text-sm" style={{ color: '#8b7fb8' }}>
                  Click side cards to focus · auto-rotating every 4.5s
                </p>
              </div>
              <Link
                href="/projects"
                id="all-projects-link"
                className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap self-start sm:self-auto"
              >
                <span>All Projects</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
            </div>

            {/* 3D Coverflow */}
            <div className="relative flex flex-col items-center w-full select-none py-4">
              <div className="flex items-center justify-center w-full overflow-visible min-h-[530px] md:min-h-[440px] relative px-4">

                {/* Left arrow button */}
                <button
                  onClick={() => handleManualChange((activeIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)}
                  aria-label="Previous project"
                  id="project-prev-btn"
                  className="hidden sm:flex absolute left-0 lg:-left-6 z-40 w-11 h-11 rounded-full items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
                  style={{
                    background: 'rgba(19,17,36,0.85)',
                    border: '1px solid rgba(157,111,255,0.3)',
                    backdropFilter: 'blur(16px)',
                    color: '#c4b5fd',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <i className="fa-solid fa-chevron-left text-sm transition-transform group-hover:-translate-x-0.5" />
                </button>

                {/* Right arrow button */}
                <button
                  onClick={() => handleManualChange((activeIndex + 1) % PROJECTS_DATA.length)}
                  aria-label="Next project"
                  id="project-next-btn"
                  className="hidden sm:flex absolute right-0 lg:-right-6 z-40 w-11 h-11 rounded-full items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
                  style={{
                    background: 'rgba(19,17,36,0.85)',
                    border: '1px solid rgba(157,111,255,0.3)',
                    backdropFilter: 'blur(16px)',
                    color: '#c4b5fd',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                >
                  <i className="fa-solid fa-chevron-right text-sm transition-transform group-hover:translate-x-0.5" />
                </button>

                <div className="relative w-full max-w-5xl h-[490px] md:h-[400px] flex items-center justify-center overflow-visible">

                  {PROJECTS_DATA.map((project, idx) => (
                    <CoverflowCard
                      key={project.id}
                      project={project}
                      d={getRelativeIndex(idx)}
                      isMobile={isMobile}
                      onSelect={() => handleManualChange(idx)}
                    />
                  ))}
                </div>
              </div>

              {/* Slide Counter and Indicator */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-xs font-mono font-bold tracking-wider" style={{ color: '#c4b5fd' }}>
                  0{activeIndex + 1} <span style={{ color: '#8b7fb8' }}>/ 0{PROJECTS_DATA.length}</span>
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(157,111,255,0.15)',
                    color: '#e2d9fc',
                    border: '1px solid rgba(157,111,255,0.25)',
                  }}
                >
                  {PROJECTS_DATA[activeIndex].title}
                </span>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-4">
                {PROJECTS_DATA.map((project, idx) => (
                  <button
                    key={`dot-${project.id}`}
                    onClick={() => handleManualChange(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    style={{
                      height: '8px',
                      width: idx === activeIndex ? '28px' : '8px',
                      borderRadius: '4px',
                      background: idx === activeIndex ? '#9d6fff' : 'rgba(157,111,255,0.25)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: idx === activeIndex ? '0 0 12px rgba(157,111,255,0.7)' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ===================== MOROCCO MARKET SECTION ===================== */}
        <ScrollReveal>
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <span className="section-label" style={{ color: '#f472b6' }}>🇲🇦 Why Morocco</span>
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                Built for the{' '}
                <span className="text-gradient">Moroccan Market</span>
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: '#b8acd6' }}>
                Deep experience in government digitization, Arabic/French bilingual UIs,
                and local payment gateways — from Casablanca to Rabat.
              </p>

              {/* Moroccan cities and availability chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {['Casablanca', 'Rabat', 'Marrakech', 'Tangier'].map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: 'rgba(157,111,255,0.12)',
                      border: '1px solid rgba(157,111,255,0.25)',
                      color: '#c4b5fd',
                    }}
                  >
                    📍 {city}
                  </span>
                ))}
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(34,197,94,0.12)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#4ade80',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>Available for Hybrid & Remote Contracts</span>
                </span>
              </div>
            </div>

            {/* 4 Morocco Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: '🏛️',
                  title: 'Gov Administration Apps',
                  desc: 'Ministries, DGSN, public hospitals — I know the APIs, security standards, and paperwork trail.',
                  accent: '#9d6fff',
                },
                {
                  icon: '🌍',
                  title: 'Arabic & French UX',
                  desc: 'RTL-ready layouts, bilingual copy, and locale-aware date/number formatting built-in from day one.',
                  accent: '#f472b6',
                },
                {
                  icon: '💳',
                  title: 'CMI & TGR Payments',
                  desc: 'CMI & TGR payment gateway integration — proven experience with Moroccan national payment infrastructure, electronic stamps, and treasury workflows.',
                  accent: '#c4b5fd',
                },
                {
                  icon: '🚀',
                  title: 'Startup to Enterprise',
                  desc: 'Whether you are a Casablanca startup or a Rabat ministry, I deliver production-ready Flutter apps on time.',
                  accent: '#f472b6',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    background: 'rgba(19,17,36,0.85)',
                    border: `1px solid ${item.accent}50`,
                    borderRadius: '20px',
                    padding: '28px',
                    backdropFilter: 'blur(20px)',
                    boxShadow: `0 6px 30px rgba(0,0,0,0.35), 0 0 24px ${item.accent}18, inset 0 1px 0 ${item.accent}30`,
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: item.accent, fontFamily: 'Space Grotesk', marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: '#b8acd6' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Morocco Direct Contact Banner */}
            <div
              className="p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(20,16,42,0.95) 0%, rgba(30,20,60,0.9) 100%)',
                border: '1px solid rgba(157,111,255,0.35)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.4), 0 0 30px rgba(157,111,255,0.15)',
              }}
            >
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: '#f472b6' }}>
                  <span>🇲🇦 Moroccan & Global Market</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold" style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}>
                  Launching a Mobile App in Morocco?
                </h3>
                <p className="text-sm max-w-lg" style={{ color: '#b8acd6' }}>
                  DGSN biometric security, CMI & TGR payment integrations, bilingual Arabic/French UI, and high-performance Flutter architecture.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <a
                  href="https://wa.me/?text=Hello%20Otmane,%20I%20saw%20your%20Flutter%20portfolio%20and%20would%20like%20to%20discuss%20a%20mobile%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  id="morocco-whatsapp-btn"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all duration-300 hover:scale-105"
                  style={{
                    background: '#25D366',
                    color: '#0c0b18',
                    boxShadow: '0 0 20px rgba(37,211,102,0.3)',
                  }}
                >
                  <i className="fa-brands fa-whatsapp text-sm" />
                  <span>WhatsApp Direct</span>
                </a>
                <Link
                  href="mailto:otmane.elbaghzaoui@gmail.com?subject=Flutter%20Mobile%20Project%20Inquiry"
                  id="morocco-email-btn"
                  className="btn-glow inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold"
                >
                  <i className="fa-solid fa-envelope text-xs" />
                  <span>Email Brief</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ===================== EXPERIENCE PREVIEW ===================== */}
        <ScrollReveal scale={false}>
          <div className="space-y-8">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="section-label" style={{ color: '#c4b5fd' }}>Career</span>
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                  Selected{' '}
                  <span className="text-gradient">Experience</span>
                </h2>
              </div>
              <Link
                href="/experience"
                id="experience-full-link"
                className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap self-start sm:self-auto"
              >
                <span>Full Résumé</span>
                <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
            </div>

            <div className="grid gap-4">
              {[
                {
                  role: 'Flutter Developer Freelance',
                  company: 'Netopia',
                  period: '10/2025 — Present',
                  location: 'Hybrid',
                  description: 'Engineered the secure "Passeport Maroc" government mobile application for the Moroccan Ministry of Interior. Integrated DGSN SDK for protected facial/ID scanning and implemented banking-grade security.',
                  skills: ['Flutter', 'Security', 'Government API', 'DGSN SDK'],
                  accent: '#8b5cf6',
                  current: true,
                },
                {
                  role: 'Flutter Developer Freelance',
                  company: 'Intelcia IT Solutions',
                  period: '11/2024 — 05/2025',
                  location: 'Hybrid',
                  description: 'Developed a comprehensive suite of 4 robust government mobile applications for Moroccan public administrations — e-Parapheur, Chikaya, Bureau d\'Ordre, and Rendez-vous.',
                  skills: ['Flutter', 'Architecture', 'Enterprise Data'],
                  accent: '#7c3aed',
                  current: false,
                },
              ].map((exp) => (
                <Card key={`${exp.company}-${exp.period}`} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-3 max-w-2xl flex-1">
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-1 shrink-0 w-2.5 h-2.5 rounded-full relative"
                          style={{
                            background: exp.accent,
                            boxShadow: `0 0 10px ${exp.accent}`,
                          }}
                        >
                          {exp.current && (
                            <span
                              className="absolute -inset-1 rounded-full animate-ping opacity-60"
                              style={{ background: exp.accent }}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-base font-bold" style={{ color: '#f0ecff' }}>
                            {exp.role}
                            {exp.current && (
                              <span
                                className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                                style={{ background: 'rgba(157,111,255,0.18)', color: '#c4b5fd', border: '1px solid rgba(157,111,255,0.35)' }}
                              >
                                CURRENT
                              </span>
                            )}
                          </h3>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: exp.accent }}>
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed pl-5" style={{ color: '#b8acd6' }}>
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pl-5">
                        {exp.skills.map((s) => <Badge key={s}>{s}</Badge>)}
                      </div>
                    </div>
                    <div className="shrink-0 text-xs font-semibold sm:text-right pl-5 sm:pl-0" style={{ color: '#8b7fb8' }}>
                      {exp.period}<br />
                      <span style={{ color: '#c4b5fd' }}>{exp.location}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </motion.div>
    </>
  );
}
