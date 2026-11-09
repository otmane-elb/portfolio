'use client';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EMAIL, EXPERIENCES, PROJECTS, STACK } from './lib/data';
import { EASE, Magnetic, Reveal, SectionLabel, SplitText } from './components/Motion';

/* ---------------- Rotating "available" badge ---------------- */
function RotatingBadge() {
  const text = 'AVAILABLE · FREELANCE · CDI · REMOTE · ';
  return (
    <div className="relative h-28 w-28 sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-fg font-mono" style={{ fontSize: 8.6, letterSpacing: 1.6 }}>
          <textPath href="#circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent text-fg">
        <i className="fa-solid fa-arrow-down text-sm" />
      </div>
    </div>
  );
}

/* ---------------- Count-up number ---------------- */
function Counter({ value, suffix = '' }: Readonly<{ value: number; suffix?: string }>) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1600, 1);
          setN(Math.round((1 - Math.pow(1 - p, 4)) * value));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

/* ---------------- Work index with cursor-follow preview ---------------- */
function WorkIndex() {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const listRef = useRef<HTMLUListElement>(null);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="border-t border-line"
        onPointerMove={(e) => {
          const r = listRef.current?.getBoundingClientRect();
          if (!r) return;
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {PROJECTS.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
            className="border-b border-line"
          >
            <Link
              href={`/projects/${p.id}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 sm:gap-8 sm:py-8"
            >
              <span className="font-mono text-xs text-fg-3 w-6">{String(i + 1).padStart(2, '0')}</span>

              <div className="flex min-w-0 items-center gap-4">
                {/* Inline thumbnail on touch screens */}
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="h-16 w-11 shrink-0 rounded-md object-cover md:hidden"
                />
                <div className="min-w-0">
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl tracking-[-0.04em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-3">
                    <span className="transition-colors duration-300 group-hover:text-accent">{p.title}</span>
                  </h3>
                  <p className="mt-1 truncate text-sm text-fg-3">{p.client}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden lg:flex gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <span className="hidden sm:block font-mono text-xs text-fg-3">{p.year}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-fg">
                  <i className="fa-solid fa-arrow-right -rotate-45 text-xs transition-transform duration-300 group-hover:rotate-0" />
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Floating phone preview (desktop pointer only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              exit={{ opacity: 0, scale: 0.6, rotate: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative -ml-24 -mt-52 h-[26rem] w-[12rem] overflow-hidden rounded-[1.6rem] border-[5px] border-surface-2 bg-surface shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={PROJECTS[hovered].image}
                  src={PROJECTS[hovered].image}
                  alt=""
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ---------------- Page ---------------- */
const MARKET = [
  {
    title: 'Government-grade apps',
    desc: 'Ministry of Interior, DGSN and public administrations. I know the security audits, the APIs and the compliance process.',
  },
  {
    title: 'Arabic, French & English',
    desc: 'RTL-ready layouts, bilingual content and locale-aware formats from day one. I also work in all three languages with your team.',
  },
  {
    title: 'CMI & local payments',
    desc: 'Hands-on CMI payment gateway integration, plus experience with treasury and electronic stamp workflows.',
  },
  {
    title: 'From startup to ministry',
    desc: 'Freelance, CDI or remote. On-site or hybrid in Rabat and Casablanca, or fully remote for teams abroad.',
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <div className="space-y-32 sm:space-y-40">
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative pt-10 sm:pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="flex items-center gap-2 text-fg-2">
            <span className="status-dot" /> Open to new projects
          </span>
          <span className="hidden sm:inline text-line-strong">/</span>
          <span>Flutter Developer</span>
          <span className="hidden sm:inline text-line-strong">/</span>
          <span>Based in Morocco 🇲🇦</span>
        </motion.div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div style={{ y: textY }} className="lg:col-span-7 xl:col-span-8">
            <h1 className="text-[10.4vw] leading-[0.95] sm:text-7xl lg:text-[5.6rem] xl:text-[6.5rem] tracking-[-0.05em]">
              <SplitText text="I build secure" delay={0.1} />
              <br />
              <SplitText text="mobile apps for" delay={0.25} />
              <br />
              <SplitText text="Morocco & beyond." className="serif-italic text-accent" delay={0.4} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: EASE }}
              className="mt-10 max-w-xl text-lg leading-relaxed text-fg-2"
            >
              I&apos;m Otmane, a Flutter developer with 5+ years of experience. I shipped{' '}
              <span className="text-fg">Passeport Maroc</span> for the Ministry of Interior and four other
              government apps used by citizens across the country.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a href={`mailto:${EMAIL}`} className="btn btn-accent">
                  Start a project
                  <i className="fa-solid fa-arrow-right text-xs" />
                </a>
              </Magnetic>
              <Magnetic>
                <Link href="/projects" className="btn btn-outline">
                  See my work
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(-15% -15% -15% -15%)' }}
            transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
            className="relative mx-auto w-full max-w-sm lg:col-span-5 xl:col-span-4 lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(80% 60% at 50% 100%, rgba(239,35,60,0.28), transparent 70%), linear-gradient(180deg, #353850 0%, #2b2d42 100%)',
                }}
              />
              <motion.img
                src="/profile-transparent.png"
                alt="Otmane El Baghazaoui"
                style={{ y: photoY, scale: photoScale }}
                className="absolute inset-x-0 bottom-0 mx-auto h-[95%] w-auto max-w-none object-contain object-bottom grayscale-[20%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-sm text-fg">Otmane El Baghazaoui</p>
                  <p className="font-mono text-[11px] text-fg-2">Flutter · Dart · Mobile security</p>
                </div>
              </div>
            </div>
            <div className="absolute -left-6 -top-6 hidden lg:block">
              <RotatingBadge />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= STACK MARQUEE ================= */}
      <section aria-label="Tech stack" className="relative left-1/2 -mt-12 w-screen -translate-x-1/2 overflow-hidden border-y border-line py-5 sm:-mt-16">
        <div className="flex w-max animate-marquee">
          {[...STACK, ...STACK].map((s, i) => (
            <span key={`${s}-${i}`} className="flex items-center gap-8 pr-8 text-lg sm:text-xl text-fg-2 whitespace-nowrap">
              {s}
              <span className="text-accent text-sm">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section>
        <Reveal>
          <div className="hairline-grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: 5, suffix: '+', label: 'Years building with Flutter' },
              { value: 7, suffix: '+', label: 'Apps shipped to production' },
              { value: 5, suffix: '', label: 'Government apps delivered' },
              { value: 3, suffix: '', label: 'Languages: AR · FR · EN' },
            ].map((s) => (
              <div key={s.label} className="p-6 sm:p-10">
                <div className="text-5xl sm:text-6xl tracking-[-0.05em]">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-sm text-fg-3">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= SELECTED WORK ================= */}
      <section className="space-y-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-5">
            <SectionLabel index="01">Selected work</SectionLabel>
            <h2 className="text-4xl sm:text-6xl tracking-[-0.045em]">
              <SplitText text="Apps in the hands" inView />{' '}
              <SplitText text="of real users." className="serif-italic text-fg-2" delay={0.1} inView />
            </h2>
          </div>
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg">
            <span className="link-underline">All projects</span>
            <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <WorkIndex />
      </section>

      {/* ================= MOROCCO ================= */}
      <section className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <SectionLabel index="02">Why work with me</SectionLabel>
            <h2 className="text-4xl sm:text-6xl tracking-[-0.045em]">
              <SplitText text="Built for the" inView />{' '}
              <SplitText text="Moroccan market." className="serif-italic text-accent" delay={0.1} inView />
            </h2>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7 self-end" delay={0.1}>
            <p className="text-lg leading-relaxed text-fg-2">
              Moroccan apps have specific needs: bilingual Arabic/French UX, local payment gateways and strict
              public-sector security. I&apos;ve delivered all of it in production, from Rabat to Casablanca.
            </p>
          </Reveal>
        </div>

        <div className="hairline-grid sm:grid-cols-2">
          {MARKET.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08} y={20}>
              <div className="group relative h-full overflow-hidden p-8 sm:p-10 transition-colors duration-500 hover:bg-surface">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 text-2xl tracking-[-0.03em]">{m.title}</h3>
                <p className="mt-3 max-w-md text-fg-2 leading-relaxed">{m.desc}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-accent p-8 sm:p-12 text-fg">
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="font-mono text-xs uppercase tracking-[0.08em] opacity-70">Lancer une app au Maroc ?</p>
                <h3 className="mt-3 text-3xl sm:text-4xl tracking-[-0.04em] text-fg">
                  Launching a mobile app in Morocco? Let&apos;s talk about it.
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/212684829954?text=Bonjour%20Otmane%2C%20j%27ai%20vu%20votre%20portfolio%20Flutter%20et%20j%27aimerais%20discuter%20d%27un%20projet%20mobile."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-bg text-fg hover:bg-surface-2"
                >
                  <i className="fa-brands fa-whatsapp" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${EMAIL}?subject=Projet%20mobile%20Flutter`}
                  className="btn border border-fg/40 text-fg hover:bg-fg/10"
                >
                  <i className="fa-regular fa-envelope" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="space-y-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-5">
            <SectionLabel index="03">Experience</SectionLabel>
            <h2 className="text-4xl sm:text-6xl tracking-[-0.045em]">
              <SplitText text="Recent" inView />{' '}
              <SplitText text="roles." className="serif-italic text-fg-2" delay={0.08} inView />
            </h2>
          </div>
          <Link href="/experience" className="group inline-flex items-center gap-2 text-sm text-fg-2 hover:text-fg">
            <span className="link-underline">Full experience</span>
            <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="border-t border-line">
          {EXPERIENCES.slice(0, 3).map((e, i) => (
            <Reveal key={e.company} delay={i * 0.06} y={16}>
              <div className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3 font-mono text-xs text-fg-3 pt-1.5">
                  {e.period}
                  {e.current && <span className="ml-2 text-ok">● Now</span>}
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl tracking-[-0.03em]">{e.company}</h3>
                  <p className="mt-1 text-sm text-fg-3">{e.role} · {e.location}</p>
                </div>
                <p className="md:col-span-5 text-fg-2 leading-relaxed">{e.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
