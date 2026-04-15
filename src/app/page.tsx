'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from './components/Card';
import Badge from './components/Badge';

export default function Home() {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  } as const;

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
      {/* Hero */}
      <motion.section variants={FADE_UP_ANIMATION_VARIANTS} className="max-w-3xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Hi, I&apos;m <span className="text-gradient">Otmane</span> 👋
        </h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          I build premium, high-performance mobile applications with Flutter. Passionate about scalable architecture, pixel-perfect UI, and secure government-grade workflows. I ship rigorous, production-ready software.
        </p>
        <div className="flex gap-4 pt-4">
          <Link href="mailto:otmaneelbaghazaoui@gmail.com" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95">
            Contact Me
          </Link>
          <a href="/experience" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            View Experience
          </a>
        </div>
      </motion.section>

      {/* Work Experience Preview */}
      <motion.section variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-100">Selected Experience</h2>
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
              10/2025 — Present <br/> <span className="text-xs">Hybrid</span>
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
              11/2024 — 05/2025 <br/> <span className="text-xs">Hybrid</span>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-100">Featured Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700 underline-offset-4 hover:decoration-white">All Projects</Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link href="/projects/eparapheur" className="group outline-none">
            <Card hoverScale={true} className="h-full flex flex-col group-focus-visible:ring-2 ring-accent">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">Eparapheur</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  Mobile companion enabling complete digitalization of mail processing and validation within public administrations.
                </p>
              </div>
              <div className="pt-6 mt-auto">
                <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Case Study <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Card>
          </Link>

          <Link href="/projects/rendezvous" className="group outline-none">
            <Card hoverScale={true} className="h-full flex flex-col group-focus-visible:ring-2 ring-accent">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">Rendez-vous</h3>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  Government appointments scheduling application featuring advanced calendar management and synchronization.
                </p>
              </div>
              <div className="pt-6 mt-auto">
                <Badge>Calendar Integration</Badge>
              </div>
            </Card>
          </Link>

          <Link href="/projects/chikaya" className="group outline-none sm:col-span-2">
            <Card hoverScale={true} className="h-full flex flex-col sm:flex-row items-start sm:items-center gap-6 group-focus-visible:ring-2 ring-accent">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">Chikaya</h3>
                <p className="text-neutral-400 leading-relaxed text-sm max-w-2xl">
                  National application for submitting and routing citizen complaints. Built with strict form validaton flows and real-time tracking transparency.
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
