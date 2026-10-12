'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Badge from './Badge';

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
  const FADE_UP = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const STAGGER = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={STAGGER}
      className="space-y-20 pb-24"
    >
      {/* Back link + Hero */}
      <motion.section variants={FADE_UP} className="space-y-6 pt-8 text-center">
        <Link
          href="/projects"
          id="case-study-back-link"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors mb-4"
          style={{ color: '#5a4d7a' }}
        >
          <span aria-hidden="true">←</span> Back to Projects
        </Link>

        <h1
          className="text-4xl sm:text-5xl font-bold"
          style={{ fontFamily: 'Space Grotesk', color: '#f0ecff' }}
        >
          {title}
        </h1>

        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b5d9a' }}>
          {subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {stack.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </motion.section>

      {/* Metadata strip */}
      <motion.section variants={FADE_UP}>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.12)',
          }}
        >
          {[
            { label: 'Role', value: role },
            { label: 'Timeline', value: timeline },
            { label: 'Stack', value: stack.slice(0, 3).join(', ') },
            { label: 'Technologies', value: stack.length + ' tools used' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="px-6 py-8 space-y-1"
              style={{ background: 'rgba(7,6,15,0.95)' }}
            >
              <p className="section-label">{label}</p>
              <p className="text-sm font-medium" style={{ color: '#c4b5fd' }}>{value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Challenge + Solution */}
      <div className="grid lg:grid-cols-2 gap-12">
        <motion.section variants={FADE_UP} className="space-y-10">
          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: 'rgba(13,11,26,0.8)',
              border: '1px solid rgba(139,92,246,0.1)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <h2 className="text-xl font-semibold" style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}>
                The Challenge
              </h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#6b5d9a' }}>
              {challenge}
            </p>
          </div>

          <div
            className="rounded-2xl p-6 space-y-4"
            style={{
              background: 'rgba(13,11,26,0.8)',
              border: '1px solid rgba(139,92,246,0.1)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <h2 className="text-xl font-semibold" style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}>
                The Solution
              </h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#6b5d9a' }}>
              {solution}
            </p>
          </div>
        </motion.section>

        <motion.section variants={FADE_UP}>
          <div
            className="rounded-2xl p-6 space-y-5 h-full"
            style={{
              background: 'rgba(13,11,26,0.8)',
              border: '1px solid rgba(139,92,246,0.1)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <h2 className="text-xl font-semibold" style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}>
                Key Contributions
              </h2>
            </div>
            <ul className="space-y-3">
              {contributions.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm" style={{ color: '#b8acd6' }}>
                  <span
                    className="mt-2 shrink-0 rounded-full"
                    style={{
                      width: '5px', height: '5px', minWidth: '5px',
                      background: '#8b5cf6',
                      boxShadow: '0 0 6px rgba(139,92,246,0.8)',
                    }}
                  />
                  <span className="leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      </div>

      {/* Video Demo */}
      {videoSrc && (
        <motion.section variants={FADE_UP} className="space-y-8">
          <div className="text-center space-y-2">
            <span className="section-label">Demo</span>
            <h2 className="text-2xl font-semibold" style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}>
              Product Walkthrough
            </h2>
          </div>
          <div
            className="max-w-[380px] mx-auto aspect-[9/19.5] rounded-[3rem] overflow-hidden p-1"
            style={{
              border: '10px solid #0d0b1a',
              boxShadow: '0 0 60px rgba(139,92,246,0.2), 0 20px 60px rgba(0,0,0,0.6)',
              background: '#0d0b1a',
            }}
          >
            <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-black">
              <video controls playsInline autoPlay muted loop className="w-full h-full object-cover">
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.section>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <motion.section variants={FADE_UP} className="space-y-10">
          <div className="text-center space-y-2">
            <span className="section-label">Gallery</span>
            <h2 className="text-2xl font-semibold" style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}>
              Interface Exploration
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {images.map((image) => (
              <motion.div
                key={image.src}
                whileHover={{ scale: 1.025, y: -4 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-auto overflow-hidden rounded-2xl"
                style={{
                  border: '1px solid rgba(139,92,246,0.12)',
                  background: 'rgba(13,11,26,0.5)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-85"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(139,92,246,0.15) 0%, transparent 50%)',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
