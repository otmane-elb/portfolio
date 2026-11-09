'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PROJECTS } from '../lib/data';
import { EASE, SectionLabel, SplitText } from '../components/Motion';

export default function ProjectsPage() {
  return (
    <div className="space-y-16 pt-10 sm:pt-16">
      <header className="space-y-6">
        <SectionLabel index={String(PROJECTS.length).padStart(2, '0')}>Projects</SectionLabel>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-[-0.05em] leading-[0.95]">
          <SplitText text="Selected" />{' '}
          <SplitText text="work." className="serif-italic text-accent" delay={0.1} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
          className="max-w-xl text-lg text-fg-2"
        >
          Government platforms, startups and B2B products. Secure Flutter apps built for production.
        </motion.p>
      </header>

      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: EASE }}
            className={i % 2 === 1 ? 'sm:mt-24' : ''}
          >
            <Link href={`/projects/${p.id}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-surface">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(70% 70% at 50% 100%, rgba(239,35,60,0.25), transparent 70%)' }}
                />
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  loading="lazy"
                  className="absolute left-1/2 top-[12%] w-[38%] -translate-x-1/2 rounded-[1.1rem] border-[4px] border-surface-2 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:scale-[1.04]"
                />
                <span className="absolute left-5 top-5 font-mono text-xs text-fg-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-fg text-bg transition-all duration-500 group-hover:bg-accent group-hover:text-fg group-hover:rotate-45">
                  <i className="fa-solid fa-arrow-up text-xs rotate-45" />
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl tracking-[-0.035em] transition-colors group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p className="mt-1 text-sm text-fg-3">{p.client}</p>
                </div>
                <span className="font-mono text-xs text-fg-3 pt-2">{p.year}</span>
              </div>
              <p className="mt-3 text-fg-2 leading-relaxed">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
