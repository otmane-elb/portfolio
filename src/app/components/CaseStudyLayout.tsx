'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PROJECTS } from '../lib/data';
import { EASE, Reveal, SectionLabel, SplitText } from './Motion';

interface CaseStudyLayoutProps {
  title: string;
  subtitle: string;
  role: string;
  timeline: string;
  stack: string[];
  challenge: string;
  solution: string;
  contributions: string[];
  videoSrc?: string;
  images?: { src: string; alt: string }[];
}

function Lightbox({
  images,
  index,
  onClose,
  onMove,
}: Readonly<{ images: { src: string; alt: string }[]; index: number; onClose: () => void; onMove: (d: number) => void }>) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onMove]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onMove(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong hover:border-fg">
          <i className="fa-solid fa-arrow-left text-xs" />
        </button>
        <span className="font-mono text-xs text-fg-2 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <button onClick={() => onMove(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong hover:border-fg">
          <i className="fa-solid fa-arrow-right text-xs" />
        </button>
      </div>
      <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong hover:border-fg">
        <i className="fa-solid fa-xmark" />
      </button>
    </motion.div>
  );
}

export default function CaseStudyLayout({
  title,
  subtitle,
  role,
  timeline,
  stack,
  challenge,
  solution,
  contributions,
  videoSrc,
  images = [],
}: Readonly<CaseStudyLayoutProps>) {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const move = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length]
  );
  const close = useCallback(() => setOpen(null), []);

  const idx = PROJECTS.findIndex((p) => pathname?.endsWith(`/${p.id}`));
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <div className="space-y-24 pt-8 sm:pt-12">
      {/* Hero */}
      <section className="space-y-10">
        <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg">
          <i className="fa-solid fa-arrow-left text-xs transition-transform group-hover:-translate-x-1" />
          <span>All projects</span>
        </Link>

        <div className="space-y-6">
          {idx >= 0 && <SectionLabel index={String(idx + 1).padStart(2, '0')}>Case study</SectionLabel>}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-[-0.05em] leading-[0.95]">
            <SplitText text={title} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-fg-2"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
          className="grid gap-8 border-y border-line py-8 sm:grid-cols-3"
        >
          <div>
            <dt className="eyebrow">Role</dt>
            <dd className="mt-2 text-fg">{role}</dd>
          </div>
          <div>
            <dt className="eyebrow">Timeline</dt>
            <dd className="mt-2 text-fg">{timeline}</dd>
          </div>
          <div>
            <dt className="eyebrow">Stack</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </dd>
          </div>
        </motion.dl>
      </section>

      {/* Challenge / Solution */}
      <section className="grid gap-12 md:grid-cols-2 md:gap-16">
        {[
          { label: 'The challenge', body: challenge },
          { label: 'The solution', body: solution },
        ].map((b, i) => (
          <Reveal key={b.label} delay={i * 0.1}>
            <p className="eyebrow text-accent">{b.label}</p>
            <p className="mt-5 text-xl sm:text-2xl leading-snug tracking-[-0.02em] text-fg">{b.body}</p>
          </Reveal>
        ))}
      </section>

      {/* Contributions */}
      <section className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="text-4xl tracking-[-0.045em] lg:sticky lg:top-24">
              What I <span className="serif-italic text-accent">built</span>
            </h2>
          </Reveal>
        </div>
        <ol className="border-t border-line lg:col-span-8">
          {contributions.map((c, i) => (
            <Reveal key={c} delay={i * 0.04} y={14}>
              <li className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-line py-5">
                <span className="font-mono text-xs text-fg-3 pt-1">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-fg-2 leading-relaxed">{c}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Video */}
      {videoSrc && (
        <section className="space-y-10">
          <Reveal className="text-center">
            <p className="eyebrow">Demo</p>
            <h2 className="mt-3 text-4xl tracking-[-0.045em]">
              Product <span className="serif-italic text-accent">walkthrough</span>
            </h2>
          </Reveal>
          <Reveal>
            <div className="relative mx-auto max-w-[340px]">
              <div
                aria-hidden
                className="absolute -inset-16 -z-10 rounded-full opacity-60 blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(226,96,59,0.25), transparent 65%)' }}
              />
              <div className="aspect-[9/19.5] overflow-hidden rounded-[2.8rem] border-[10px] border-surface-2 bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]">
                <video controls playsInline autoPlay muted loop preload="metadata" className="h-full w-full object-cover">
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <section className="space-y-10">
          <Reveal className="flex items-end justify-between gap-4">
            <h2 className="text-4xl tracking-[-0.045em]">
              Inter<span className="serif-italic text-accent">face</span>
            </h2>
            <span className="font-mono text-xs text-fg-3">{images.length} screens · click to enlarge</span>
          </Reveal>
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
            {images.map((image, i) => (
              <motion.button
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: EASE }}
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-surface break-inside-avoid"
                aria-label={`Open ${image.alt} ${i + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-bg/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-fg text-bg">
                    <i className="fa-solid fa-plus text-sm" />
                  </span>
                </span>
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Next project */}
      {idx >= 0 && (
        <Reveal>
          <Link href={`/projects/${next.id}`} className="group block border-t border-line pt-10">
            <p className="eyebrow">Next project</p>
            <div className="mt-4 flex items-center justify-between gap-6">
              <h2 className="text-5xl sm:text-7xl tracking-[-0.05em] transition-colors duration-300 group-hover:text-accent">
                {next.title}
              </h2>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                <i className="fa-solid fa-arrow-right -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              </span>
            </div>
          </Link>
        </Reveal>
      )}

      <AnimatePresence>
        {open !== null && <Lightbox images={images} index={open} onClose={close} onMove={move} />}
      </AnimatePresence>
    </div>
  );
}
