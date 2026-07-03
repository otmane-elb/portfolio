'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from './components/Card';
import Badge from './components/Badge';
import { useEffect, useRef, useState } from 'react';

function OceanSkyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Dynamic wave definitions
    const waves = [
      {
        y: height * 0.52,
        length: 0.0025,
        amplitude: 38,
        frequency: 0.012,
        color: 'rgba(10, 30, 70, 0.65)' // Deep Navy Blue Wave
      },
      {
        y: height * 0.58,
        length: 0.0018,
        amplitude: 28,
        frequency: 0.008,
        color: 'rgba(20, 50, 120, 0.55)' // Royal Navy Wave
      },
      {
        y: height * 0.49,
        length: 0.0035,
        amplitude: 20,
        frequency: 0.016,
        color: 'rgba(29, 78, 216, 0.45)' // Vibrant Royal Blue Wave
      }
    ];

    let increment = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      waves[0].y = height * 0.52;
      waves[1].y = height * 0.58;
      waves[2].y = height * 0.49;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render 2 large, soft drifting navy/royal blue glow blobs (plexus ambient light)
      // Blob 1: Navy Blue
      const blob1X = width * 0.7 + Math.sin(increment * 0.003) * 80;
      const blob1Y = height * 0.3 + Math.cos(increment * 0.002) * 40;
      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 10, blob1X, blob1Y, 280);
      grad1.addColorStop(0, 'rgba(10, 30, 70, 0.22)');
      grad1.addColorStop(1, 'rgba(10, 30, 70, 0)');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(blob1X, blob1Y, 280, 0, Math.PI * 2);
      ctx.fill();

      // Blob 2: Royal Blue
      const blob2X = width * 0.85 + Math.cos(increment * 0.0025) * 60;
      const blob2Y = height * 0.45 + Math.sin(increment * 0.003) * 60;
      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 10, blob2X, blob2Y, 240);
      grad2.addColorStop(0, 'rgba(29, 78, 216, 0.18)');
      grad2.addColorStop(1, 'rgba(29, 78, 216, 0)');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(blob2X, blob2Y, 240, 0, Math.PI * 2);
      ctx.fill();

      // Render overlaying waves
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, wave.y);

        for (let x = 0; x < width; x++) {
          ctx.lineTo(
            x,
            wave.y + Math.sin(x * wave.length + increment * wave.frequency) * wave.amplitude
          );
        }

        ctx.lineTo(width, height);
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      increment += 0.5;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none opacity-100" />;
}

const PROJECTS_DATA = [
  {
    id: 'passeport',
    title: 'Passeport Maroc',
    href: '/projects/passeport',
    description: 'Official government app for passport requests — NFC identity scanning, CMI payments, and banking-grade security.',
    image: '/images/passeport01.jpg',
    screenshots: 15,
    badges: ['Flutter', 'NFC Scanner', 'CMI Payments']
  },
  {
    id: 'eparapheur',
    title: 'Eparapheur',
    href: '/projects/eparapheur',
    description: 'Mobile companion enabling complete digitalization of mail processing and validation within public administrations.',
    image: '/images/eparapheur01.jpg',
    screenshots: 6,
    badges: ['Flutter', 'Mail Signing', 'Government APIs']
  },
  {
    id: 'rendezvous',
    title: 'Rendez-vous',
    href: '/projects/rendezvous',
    description: 'Government appointments scheduling application featuring advanced calendar management and synchronization.',
    image: '/images/rendezvous01.jpg',
    screenshots: 7,
    badges: ['Flutter', 'Calendar Integration', 'Conflict Check']
  },
  {
    id: 'chikaya',
    title: 'Chikaya',
    href: '/projects/chikaya',
    description: 'National complaints application for submitting and routing complaints directed toward Moroccan public administrations.',
    image: '/images/chikaya01.jpg',
    screenshots: 8,
    badges: ['Flutter', 'Complaints Tracking', 'Form Validation']
  },
  {
    id: 'bod',
    title: 'Bureau d’Ordre',
    href: '/projects/bod',
    description: 'Digital correspondence tracking and mail registration system for public administrations with secure audit trails.',
    image: '/images/bod01.jpg',
    screenshots: 9,
    badges: ['Flutter', 'Document Tracking', 'Audit System']
  },
  {
    id: 'eliteconect',
    title: 'EliteConect',
    href: '/projects/eliteconect',
    description: 'Enterprise sports recruitment and network connection platform matching athletes, agents, and clubs globally.',
    image: '/images/ec01.jpg',
    screenshots: 17,
    badges: ['Flutter', 'Social Networking', 'Profile Matcher']
  },
  {
    id: 'topela',
    title: 'Topela',
    href: '/projects/topela',
    description: 'Premium cross-platform mobile architecture with customized security models and multi-device synchronization.',
    image: '/images/topela01.webp',
    screenshots: 21,
    badges: ['Flutter', 'Sync Engine', 'Custom UI Controls']
  }
];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  } as const;

  // Window resize listener to handle responsive states in canvas/3D layouts
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay intervals to cycle the carousel smoothly
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
    // Restart autoplay after 12 seconds of inactivity
    const timeout = setTimeout(() => setAutoplay(true), 12000);
    return () => clearTimeout(timeout);
  };

  const getRelativeIndex = (idx: number) => {
    let d = idx - activeIndex;
    if (d < -PROJECTS_DATA.length / 2) d += PROJECTS_DATA.length;
    if (d > PROJECTS_DATA.length / 2) d -= PROJECTS_DATA.length;
    return d;
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="space-y-32"
    >
      {/* Separated SQLI-style Hero Banner */}
      <motion.section
        variants={FADE_UP_ANIMATION_VARIANTS}
        className="relative w-full min-h-[460px] rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 flex items-center p-6 sm:p-12 lg:p-16 mb-16"
      >
        {/* Animated Background Ocean Sky */}
        <OceanSkyCanvas />

        {/* Diagonal Light Bleed Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 via-slate-200/50 to-transparent pointer-events-none" />

        {/* Hero Card Content with Glassmorphic Effect */}
        <div className="relative z-10 max-w-lg bg-white/45 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-xl space-y-6">

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Hi, I&apos;m <span className="text-gradient">Otmane</span>
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed">
            I engineer secure, high-performance mobile applications with <strong className="text-blue-600 font-semibold">Flutter</strong>. Passionate about scalable architecture, pixel-perfect UI, and secure government-grade workflows.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="mailto:otmaneelbaghazaoui@gmail.com"
              className="group inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-sm font-bold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 shadow-sm"
            >
              Contact Me
              <i className="fa-solid fa-chevron-right text-[10px] transition-transform group-hover:translate-x-1"></i>
            </Link>
            <a
              href="/experience"
              className="text-sm font-semibold text-slate-500 hover:text-[#1d4ed8] transition-colors flex items-center gap-1 group py-2"
            >
              View Experience
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Projects 3D Coverflow Carousel Section - Rendered FIRST */}
      <motion.section variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">Featured Projects</h2>
            <p className="text-xs text-neutral-400 font-medium">Auto-rotating coverflow carousel. Click side cards to focus</p>
          </div>
          <Link href="/projects" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4 hover:decoration-white whitespace-nowrap self-start sm:self-auto">All Projects</Link>
        </div>

        {/* 3D Stack Track Container */}
        <div className="relative flex flex-col items-center w-full select-none py-4">
          
          {/* Main absolute stack area */}
          <div className="flex items-center justify-center w-full overflow-visible min-h-[510px] md:min-h-[420px] relative px-4">

            {/* Absolute Stacking Track */}
            <div className="relative w-full max-w-5xl h-[470px] md:h-[380px] flex items-center justify-center overflow-visible">
              {PROJECTS_DATA.map((project, idx) => {
                const d = getRelativeIndex(idx);
                const isActive = d === 0;

                // On mobile we only render active card to avoid visual clutter
                if (isMobile && !isActive) return null;
                // Only render active card + 2 adjacent slots on each side
                if (Math.abs(d) > 2) return null;

                return (
                  <motion.div
                    key={project.id}
                    onClick={() => !isActive && handleManualChange(idx)}
                    className={`absolute border border-white/60 shadow-xl flex gap-5 items-center ${
                      isActive 
                        ? 'w-full max-w-[92%] md:max-w-[620px] lg:max-w-[700px] bg-white/45 backdrop-blur-xl rounded-3xl p-5 sm:p-6 lg:p-8 flex-col md:flex-row' 
                        : 'w-[230px] h-[310px] bg-white/20 hover:bg-white/35 backdrop-blur-md rounded-2xl p-5 flex-col justify-between'
                    }`}
                    style={{
                      transform: `translateX(${d * 280}px) scale(${isActive ? 1 : 0.76})`,
                      zIndex: 30 - Math.abs(d),
                      opacity: isActive ? 1 : 0.28 - Math.abs(d) * 0.08,
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-in-out',
                      cursor: isActive ? 'default' : 'pointer'
                    }}
                  >
                    {/* Left Side: Text details */}
                    <div className={`flex-1 text-left ${isActive ? 'space-y-3 sm:space-y-4' : 'text-center space-y-1 w-full mt-auto'}`}>
                      <h3 className={`font-extrabold text-slate-900 leading-tight ${isActive ? 'text-xl lg:text-2xl' : 'text-xs w-full text-center'}`}>
                        {project.title}
                      </h3>
                      
                      {isActive && (
                        <>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.badges.map((b) => (
                              <span key={b} className="text-[9px] font-bold text-slate-500 bg-slate-200/50 rounded-md px-2 py-0.5 border border-slate-200">
                                {b}
                              </span>
                            ))}
                          </div>

                          <div className="pt-2">
                            <Link
                              href={project.href}
                              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-800 transition-all hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 shadow-sm"
                            >
                              Read Case Study
                              <i className="fa-solid fa-chevron-right text-[9px] ml-1"></i>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right Side: Phone Mockup frame */}
                    <div 
                      className={`aspect-[9/19] rounded-2xl overflow-hidden border-[4px] border-slate-950 bg-slate-950 relative shadow-lg shrink-0 ${
                        isActive ? 'w-[125px] sm:w-[155px]' : 'w-[100px] mx-auto'
                      }`}
                      style={{ transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1), height 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                      {/* Speaker Notches */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                        <div className="w-1.5 h-1 rounded-full bg-slate-800"></div>
                      </div>
                      {/* Selected Mobile app screen screenshot */}
                      <img 
                        src={project.image} 
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover rounded-[10px] select-none"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Dot Indicators */}
          <div className="flex gap-2 mt-6">
            {PROJECTS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleManualChange(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-[#1d4ed8]' : 'w-2.5 bg-slate-300'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </motion.section>

      {/* Work Experience Preview - Rendered SECOND */}
      <motion.section variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">Selected Experience</h2>
          <Link href="/experience" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4 hover:decoration-white">View Full R&eacute;sum&eacute;</Link>
        </div>

        <div className="grid gap-6">
          {/* Netopia */}
          <Card className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-4 max-w-2xl">
              <div>
                <h3 className="text-lg font-semibold text-white">Flutter Developer Freelance</h3>
                <p className="text-accent font-medium text-sm mt-1">Netopia</p>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Engineered the secure <strong>&ldquo;Passeport Maroc&rdquo;</strong> government mobile application. Integrated the official DGSN SDK for protected facial/ID scanning and implemented banking-grade security mechanisms (SSL Pinning, root detection, encryption). Collaborated with the Ministry of Interior to harden releases against static security audits.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge>Flutter</Badge>
                <Badge>Security</Badge>
                <Badge>Government API</Badge>
                <Badge>DGSN SDK</Badge>
              </div>
            </div>
            <div className="shrink-0 text-sm font-medium text-neutral-500 sm:text-right">
              10/2025 — Present <br /> <span className="text-xs">Hybrid</span>
            </div>
          </Card>

          {/* Intelcia IT Solutions */}
          <Card className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-4 max-w-2xl">
              <div>
                <h3 className="text-lg font-semibold text-white">Flutter Developer Freelance</h3>
                <p className="text-accent font-medium text-sm mt-1">Intelcia IT Solutions</p>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Developed a comprehensive suite of 4 robust government mobile applications (E-Parapheur, Rendez-vous, Chikaya, Bureau d’Ordre) to pioneer public administration digitization. Built accessible, user-friendly UI architectures interacting seamlessly with highly secure internal APIs.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge>Flutter</Badge>
                <Badge>Architecture</Badge>
                <Badge>Enterprise Data</Badge>
              </div>
            </div>
            <div className="shrink-0 text-sm font-medium text-neutral-500 sm:text-right">
              11/2024 — 05/2025 <br /> <span className="text-xs">Hybrid</span>
            </div>
          </Card>
        </div>
      </motion.section>
    </motion.div>
  );
}
