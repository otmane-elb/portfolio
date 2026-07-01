'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Badge from '../components/Badge';

export default function ProjectsPage() {
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  } as const;

  const projects = [
    {
      id: 'passeport',
      name: 'Passeport Maroc',
      description: 'Official government mobile application for Moroccan passport requests — featuring NFC identity scanning, CMI payments, and banking-grade security.',
      tags: ['Government', 'Security', 'NFC'],
      imageCount: 15,
    },
    {
      id: 'eparapheur',
      name: 'Eparapheur',
      description: 'Mobile companion to the E-Parapheur platform, enabling full digitization of mail processing within public administrations.',
      tags: ['Government', 'Digitization'],
      imageCount: 6,
    },
    {
      id: 'rendezvous',
      name: 'Rendez-vous',
      description: 'Appointment scheduling application with advanced calendar management features and automated routing algorithms.',
      tags: ['Scheduling', 'Calendar API'],
      imageCount: 7,
    },
    {
      id: 'chikaya',
      name: 'Chikaya',
      description: 'National application for submitting and tracking citizen complaints with absolute transparency and structured workflows.',
      tags: ['Civil Tech', 'Forms'],
      imageCount: 8,
    },
    {
      id: 'bod',
      name: 'Bureau d’Ordre',
      description: 'Application for managing incoming/outgoing correspondence with strict document traceability and auditing.',
      tags: ['Traceability', 'Data Flow'],
      imageCount: 9,
    },
    {
      id: 'eliteconect',
      name: 'Elite Connect',
      description: 'Dynamic recruitment platform connecting athletes, clubs, coaches, and agents through a professional networking interface.',
      tags: ['Social Network', 'Sports'],
      imageCount: 17,
    },
    {
      id: 'topela',
      name: 'Topela',
      description: 'Intuitive business relationship hub that simplifies communication and information sharing between professionals and clients.',
      tags: ['B2B', 'SaaS Client'],
      imageCount: 21,
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
      className="space-y-16"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">All Projects</h1>
        <p className="text-neutral-400 text-lg">A deep dive into the applications and architectures I&apos;ve built.</p>
      </motion.div>

      <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="group outline-none block h-full">
            <Card className="h-full flex flex-col group-focus-visible:ring-2 ring-accent">
              <div className="flex-1 space-y-4">
                <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{project.name}</h2>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>
              
              <div className="pt-6 mt-auto space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Case Study <span aria-hidden="true">&rarr;</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700/80 bg-blue-600/5 border border-blue-600/15 rounded-full px-2.5 py-1">
                    <i className="fa-solid fa-images text-[10px]"></i> {project.imageCount} screenshots
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
}
