'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EMAIL, SOCIALS } from '../lib/data';
import { Magnetic, Reveal, SplitText } from './Motion';

function MoroccoClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Casablanca' });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? '--:--'}</span>;
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/rightframe')) return null;

  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="container-page pt-20 pb-10">
        <Reveal>
          <p className="eyebrow mb-6">Got a project? · Un projet ?</p>
        </Reveal>
        <h2 className="text-[13vw] sm:text-[9vw] lg:text-[7.5rem] leading-[0.95] tracking-[-0.05em]">
          <SplitText text="Let's build" inView />
          <br />
          <SplitText text="something solid." className="serif-italic text-accent" delay={0.15} inView />
        </h2>

        <Reveal delay={0.2} className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-3 text-lg sm:text-2xl text-fg break-all"
          >
            <span className="link-underline">{EMAIL}</span>
            <i className="fa-solid fa-arrow-right -rotate-45 text-base text-accent transition-transform duration-300 group-hover:rotate-0" />
          </a>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/files/cv-en.pdf', label: 'CV English' },
              { href: '/files/cv-fr.pdf', label: 'CV Français' },
            ].map((cv) => (
              <Magnetic key={cv.href} strength={0.2}>
                <a href={cv.href} download className="btn btn-outline text-sm">
                  <i className="fa-solid fa-arrow-down text-xs" />
                  {cv.label}
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 grid gap-8 border-t border-line pt-8 text-sm text-fg-2 sm:grid-cols-3 sm:items-center">
          <div className="flex items-center gap-2">
            <span className="status-dot" />
            <span>
              Morocco · <MoroccoClock /> local time
            </span>
          </div>
          <div className="flex gap-5 sm:justify-center">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-fg-2 transition-colors hover:text-accent"
              >
                <i className={`${s.icon} text-lg`} />
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-fg-3">© {new Date().getFullYear()} Otmane El Baghazaoui</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-fg transition-colors hover:border-accent hover:bg-accent hover:text-bg"
              aria-label="Back to top"
            >
              <i className="fa-solid fa-arrow-up text-xs" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
