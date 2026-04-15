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
}: CaseStudyLayoutProps) {
  const FADE_UP_VARIANTS = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
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
      className="space-y-24 pb-24"
    >
      {/* Hero */}
      <motion.section variants={FADE_UP_VARIANTS} className="space-y-6 pt-12 text-center">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-white transition-colors mb-4"
        >
          <span aria-hidden="true">&larr;</span> Back to Projects
        </Link>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {stack.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </motion.section>

      {/* Metadata Grid */}
      <motion.section variants={FADE_UP_VARIANTS} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Role</p>
          <p className="text-sm text-neutral-200">{role}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Timeline</p>
          <p className="text-sm text-neutral-200">{timeline}</p>
        </div>
        <div className="space-y-1 col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Technologies</p>
          <p className="text-sm text-neutral-200">{stack.join(', ')}</p>
        </div>
      </motion.section>

      {/* Content Section */}
      <div className="grid lg:grid-cols-2 gap-16">
        <motion.section variants={FADE_UP_VARIANTS} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">The Challenge</h2>
            <p className="text-neutral-400 leading-relaxed">
              {challenge}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">The Solution</h2>
            <p className="text-neutral-400 leading-relaxed">
              {solution}
            </p>
          </div>
        </motion.section>

        <motion.section variants={FADE_UP_VARIANTS} className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Key Contributions</h2>
          <ul className="space-y-4">
            {contributions.map((contribution, index) => (
              <li key={index} className="flex items-start gap-3 text-neutral-400 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{contribution}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Video Demo */}
      {videoSrc && (
        <motion.section variants={FADE_UP_VARIANTS} className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-white">Direct Execution</h2>
            <p className="text-neutral-500 text-sm">Product demo & walkthough</p>
          </div>
          <div className="max-w-[400px] mx-auto aspect-[9/19.5] rounded-[3rem] overflow-hidden border-[12px] border-neutral-900 shadow-2xl bg-neutral-900 p-1">
             <div className="w-full h-full rounded-[2.25rem] overflow-hidden bg-black">
               <video
                 controls
                 playsInline
                 autoPlay
                 muted
                 loop
                 className="w-full h-full object-cover"
               >
                 <source src={videoSrc} type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
             </div>
          </div>
        </motion.section>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <motion.section variants={FADE_UP_VARIANTS} className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-white">Interface Exploration</h2>
            <p className="text-neutral-500 text-sm">Visual deep dive</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-auto overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
