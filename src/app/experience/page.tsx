'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { EXPERIENCES } from '../lib/data';
import { EASE, Reveal, SectionLabel, SplitText } from '../components/Motion';

export default function ExperiencePage() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="space-y-16 pt-10 sm:pt-16">
      <header className="space-y-6">
        <SectionLabel index="4+">Years of experience</SectionLabel>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-[-0.05em] leading-[0.95]">
          <SplitText text="Experience" />{' '}
          <SplitText text="so far." className="serif-italic text-accent" delay={0.1} />
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
          className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-lg text-fg-2">
            From freelance apps to government platforms used nationwide.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/files/cv-en.pdf" download className="btn btn-outline text-sm">
              <i className="fa-solid fa-arrow-down text-xs" /> CV English
            </a>
            <a href="/files/cv-fr.pdf" download className="btn btn-outline text-sm">
              <i className="fa-solid fa-arrow-down text-xs" /> CV Français
            </a>
          </div>
        </motion.div>
      </header>

      <div ref={listRef} className="relative">
        {/* Progress line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-line md:left-[calc(25%-1px)]" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[5px] top-2 bottom-2 w-px origin-top bg-accent md:left-[calc(25%-1px)]"
        />

        {EXPERIENCES.map((e) => (
          <Reveal key={`${e.company}-${e.period}`} y={24}>
            <article className="relative grid gap-4 pb-16 pl-8 md:grid-cols-4 md:gap-12 md:pl-0">
              <span
                className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-bg md:left-[calc(25%-6px)] ${
                  e.current ? 'bg-ok' : 'bg-accent'
                }`}
              />
              <div className="md:pr-10 md:text-right">
                <p className="font-mono text-xs text-fg-2">{e.period}</p>
                <p className="mt-1 font-mono text-xs text-fg-3">{e.location}</p>
              </div>
              <div className="md:col-span-3 md:pl-2">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-3xl sm:text-4xl tracking-[-0.04em]">{e.company}</h2>
                  {e.current && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ok">
                      <span className="status-dot" /> Current
                    </span>
                  )}
                </div>
                <p className="mt-1 text-fg-3">{e.role}</p>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg">{e.description}</p>
                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-fg-2 leading-relaxed">
                      <span className="mt-[0.7em] h-px w-3 shrink-0 bg-fg-3" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {e.skills.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
