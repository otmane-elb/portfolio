'use client';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function ExperiencePage() {
  const experiences = [
    {
      role: 'Flutter Developer Freelance',
      company: 'Netopia',
      period: '10/2025 — Present',
      location: 'Hybrid',
      description: 'Engineered the secure "Passeport Maroc" government mobile application enabling full digitalization of the passport issuance process.',
      bullets: [
        'Integrated official DGSN SDK for secure facial scanning and reading of Moroccan identity documents.',
        'Implemented banking-grade security: SSL Pinning, encryption, root/emulator detection, anti-debug protection.',
        'Remediated vulnerabilities identified during an official APK static security audit with the Ministry of Interior.',
      ],
      skills: ['Flutter', 'DGSN SDK', 'Banking Security', 'APIs'],
      current: true,
      accent: '#8b5cf6',
      icon: '🛂',
    },
    {
      role: 'Flutter Developer Freelance',
      company: 'Intelcia IT Solutions',
      period: '11/2024 — 05/2025',
      location: 'Hybrid',
      description: "Development of progressive government mobile applications (Eparapheur, Rendez-vous, Chikaya, Bureau d'Ordre).",
      bullets: [
        'Integrated secure government APIs and strict data flow management routines.',
        'Designed accessible, user-friendly, high-performance interfaces tailored for wide public audiences.',
        'Collaborated extensively within multidisciplinary teams to ensure stringent regulatory compliance.',
      ],
      skills: ['Flutter', 'Architecture', 'State Management'],
      current: false,
      accent: '#7c3aed',
      icon: '🏛️',
    },
    {
      role: 'Flutter Developer Freelance',
      company: 'ELITECONNECT',
      period: '09/2023 — 11/2024',
      location: 'Remote',
      description: 'Led the UI architecture and front-end development of EliteConnect, a dynamic sports recruitment platform.',
      bullets: [
        'Built powerful profile customization features for clubs, agents, and athletes.',
        'Refactored legacy UI components to dramatically improve user retention and UX flows.',
      ],
      skills: ['Flutter', 'UI/UX', 'Performance Optimization'],
      current: false,
      accent: '#a78bfa',
      icon: '⚽',
    },
    {
      role: 'Flutter Developer',
      company: 'WEBCK',
      period: '06/2024 — 09/2024',
      location: 'TechnoPark',
      description: 'Designed and deployed mobile business management experiences from the ground up.',
      bullets: [
        'Consumed deep REST APIs to build robust enterprise modules.',
        'Enforced testing protocols, QA participation, and clean architectural state management.',
      ],
      skills: ['REST APIs', 'QA/Testing', 'App Architecture'],
      current: false,
      accent: '#8b5cf6',
      icon: '💼',
    },
    {
      role: 'Flutter Developer — Freelance',
      company: 'Independent',
      period: '12/2022 — 09/2023',
      location: 'Remote',
      description: 'Independent contractor specializing in scalable cross-platform mobile apps. Published 2 active apps on the Play Store.',
      bullets: [
        'Utilized advanced state management (GetX, Provider, Riverpod).',
        'Focused heavily on accessibility-compliant design and rendering performance optimizations.',
        'Integrated complex third-party tools like the Google Maps API.',
      ],
      skills: ['Riverpod', 'GetX', 'Play Store', 'Google Maps'],
      current: false,
      accent: '#6d28d9',
      icon: '🚀',
    },
  ];

  const FADE_UP = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-16 pb-12"
    >
      {/* Header */}
      <motion.div variants={FADE_UP} className="space-y-3 pt-4">
        <span className="section-label" style={{ color: '#c4b5fd' }}>Career Timeline</span>
        <h1
          className="text-4xl sm:text-5xl font-bold"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          My{' '}
          <span className="text-gradient">Experience</span>
        </h1>
        <p className="text-base max-w-xl" style={{ color: '#b8acd6' }}>
          A timeline of my professional journey building secure, high-performance mobile applications.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative ml-3 md:ml-0">
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '0',
            top: '24px',
            bottom: '24px',
            width: '1px',
            background: 'linear-gradient(to bottom, rgba(139,92,246,0.6) 0%, rgba(109,40,217,0.3) 60%, transparent 100%)',
          }}
        />

        {experiences.map((exp) => (
          <motion.div
            key={`${exp.company}-${exp.period}`}
            variants={FADE_UP}
            className="mb-10 ml-6 md:ml-12 relative"
          >
            {/* Timeline connector dot */}
            <div
              className="absolute flex items-center justify-center rounded-full"
              style={{
                left: '-33px',
                top: '24px',
                width: '22px',
                height: '22px',
                background: 'rgba(7,6,15,1)',
                border: `2px solid ${exp.accent}`,
                boxShadow: `0 0 12px ${exp.accent}60`,
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: '8px',
                  height: '8px',
                  background: exp.accent,
                  boxShadow: `0 0 6px ${exp.accent}`,
                }}
              />
            </div>

            <Card className="group">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0 text-lg"
                    style={{
                      background: `${exp.accent}15`,
                      border: `1px solid ${exp.accent}30`,
                    }}
                  >
                    {exp.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2
                        className="text-base font-bold transition-colors"
                        style={{ color: '#f0ecff', fontFamily: 'Space Grotesk' }}
                      >
                        {exp.role}
                      </h2>
                      {exp.current && (
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider"
                          style={{
                            background: `${exp.accent}20`,
                            color: exp.accent,
                            border: `1px solid ${exp.accent}40`,
                          }}
                        >
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: exp.accent }}>
                      {exp.company}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-semibold md:text-right shrink-0 pl-13 md:pl-0" style={{ color: '#8b7fb8' }}>
                  {exp.period}
                  <br />
                  <span style={{ color: '#c4b5fd' }}>{exp.location}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#b8acd6' }}>
                {exp.description}
              </p>

              <ul className="space-y-2.5 mb-6">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm" style={{ color: '#b8acd6' }}>
                    <span
                      className="mt-2 shrink-0 rounded-full"
                      style={{
                        width: '5px',
                        height: '5px',
                        minWidth: '5px',
                        background: exp.accent,
                        boxShadow: `0 0 6px ${exp.accent}80`,
                      }}
                    />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div
                className="flex flex-wrap gap-2 pt-4"
                style={{ borderTop: '1px solid rgba(139,92,246,0.08)' }}
              >
                {exp.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
