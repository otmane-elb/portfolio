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
      description: 'Engineered the secure “Passeport Maroc” government mobile application enabling full digitalization of the passport issuance process.',
      bullets: [
        'Integrated official DGSN SDK for secure facial scanning and reading of Moroccan identity documents.',
        'Implemented banking-grade security: SSL Pinning, encryption, root/emulator detection, anti-debug protection.',
        'Remediated vulnerabilities identified during an official APK static security audit with the Ministry of Interior Security Team.',
      ],
      skills: ['Flutter', 'DGSN SDK', 'Banking Security', 'APIs'],
    },
    {
      role: 'Flutter Developer Freelance',
      company: 'Intelcia IT Solutions',
      period: '11/2024 — 05/2025',
      location: 'Hybrid',
      description: 'Development of progressive government mobile applications (Eparapheur, Rendez-vous, Chikaya, Bureau d’Ordre).',
      bullets: [
        'Integrated secure government APIs and strict data flow management routines.',
        'Designed accessible, user-friendly, high-performance interfaces tailored for wide public audiences.',
        'Collaborated extensively within multidisciplinary teams to ensure stringent regulatory compliance.',
      ],
      skills: ['Flutter', 'Architecture', 'State Management'],
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
    },
    {
      role: 'Flutter Developer Freelance',
      company: 'FREELANCER',
      period: '12/2022 — 09/2023',
      location: 'Remote',
      description: 'Independent contractor specializing in scalable cross-platform mobile apps. Published 2 active apps on the Play Store.',
      bullets: [
        'Utilized advanced state management (GetX, Provider, Riverpod).',
        'Focused heavily on accessibility-compliant design and rendering performance optimizations.',
        'Integrated complex third-party tools like the Google Maps API.',
      ],
      skills: ['Riverpod', 'GetX', 'Play Store Deployment', 'Google Maps'],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16"
    >
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Experience</h1>
        <p className="text-neutral-400 text-lg">A timeline of my professional journey in mobile engineering.</p>
      </div>

      <div className="relative border-l border-neutral-800 ml-3 md:ml-0">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-12 ml-6 md:ml-10 relative"
          >
            {/* Timeline dot */}
            <span className="absolute -left-[33px] md:-left-[49px] top-6 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-950 ring-4 ring-neutral-900">
              <span className="h-2 w-2 rounded-full bg-accent"></span>
            </span>

            <Card hoverScale={false} className="group">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white group-hover:text-accent transition-colors">{exp.role}</h2>
                  <p className="text-neutral-400 font-medium">{exp.company}</p>
                </div>
                <div className="text-sm font-medium text-neutral-500 md:text-right shrink-0">
                  {exp.period} <br className="hidden md:block" />
                  <span className="text-xs">{exp.location}</span>
                </div>
              </div>

              <p className="text-neutral-300 leading-relaxed mb-4">
                {exp.description}
              </p>

              <ul className="list-disc list-outside ml-4 space-y-2 text-neutral-400 text-sm mb-6">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="pl-2 leading-relaxed">{bullet}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-800/50">
                {exp.skills.map(skill => (
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
