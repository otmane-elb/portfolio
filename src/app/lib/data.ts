export const EMAIL = 'otmane.elbaghzaoui@gmail.com';

export const SOCIALS = [
  { href: 'https://www.linkedin.com/in/otmane-el-baghazaoui/', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
  { href: 'https://github.com/otmane-elb', icon: 'fa-brands fa-github', label: 'GitHub' },
  { href: 'https://x.com/elbaghazaoui', icon: 'fa-brands fa-x-twitter', label: 'X' },
];

export const STACK = [
  'Flutter', 'Dart', 'Riverpod', 'Bloc', 'Freezed', 'Dio', 'NFC', 'SSL Pinning',
  'freeRASP', 'CMI Payments', 'Firebase', 'Google Maps', 'REST APIs', 'CI/CD', 'i18n · AR / FR / EN',
];

export type Project = {
  id: string;
  title: string;
  client: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  screenshots: number;
};

export const PROJECTS: Project[] = [
  {
    id: 'passeport',
    title: 'Passeport Maroc',
    client: 'Ministry of Interior · Netopia',
    year: '2025–26',
    description: 'The official app for Moroccan passport requests: NFC ID scanning, DGSN facial verification, CMI payments and banking-grade security.',
    image: '/images/passeport01.jpg',
    tags: ['Gov', 'NFC', 'CMI', 'Security'],
    screenshots: 15,
  },
  {
    id: 'eparapheur',
    title: 'e-Parapheur',
    client: 'Public administration · Intelcia',
    year: '2024–25',
    description: 'Mobile companion to the e-Parapheur platform: end-to-end digital processing, signing and validation of official mail.',
    image: '/images/eparapheur03.jpg',
    tags: ['Gov', 'E-signature', 'Workflow'],
    screenshots: 6,
  },
  {
    id: 'rendezvous',
    title: 'Rendez-vous',
    client: 'Public administration · Intelcia',
    year: '2024',
    description: 'Citizen appointment booking with advanced calendar management, slot conflict checks and real-time sync.',
    image: '/images/rendezvous03.jpg',
    tags: ['Gov', 'Scheduling'],
    screenshots: 7,
  },
  {
    id: 'chikaya',
    title: 'Chikaya',
    client: 'Public administration · Intelcia',
    year: '2024',
    description: 'National app for submitting, routing and tracking citizen complaints to Moroccan public administrations.',
    image: '/images/chikaya02.jpg',
    tags: ['Civic tech', 'Forms', 'Routing'],
    screenshots: 8,
  },
  {
    id: 'bod',
    title: "Bureau d'Ordre",
    client: 'Public administration · Intelcia',
    year: '2025',
    description: 'Digital registry for incoming and outgoing correspondence with full document traceability and audit trails.',
    image: '/images/bod04.jpg',
    tags: ['Gov', 'Traceability'],
    screenshots: 9,
  },
  {
    id: 'eliteconect',
    title: 'EliteConnect',
    client: 'EliteConnect',
    year: '2023–24',
    description: 'Sports recruitment network connecting athletes, clubs, coaches and agents through rich professional profiles.',
    image: '/images/ec09.jpg',
    tags: ['Social', 'Sports', 'UI'],
    screenshots: 17,
  },
  {
    id: 'topela',
    title: 'Topela',
    client: 'Topela',
    year: '2024',
    description: 'B2B relationship hub that simplifies communication and information sharing between professionals and their clients.',
    image: '/images/topela04.webp',
    tags: ['B2B', 'Sync', 'Custom UI'],
    screenshots: 21,
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
  current?: boolean;
};

export const EXPERIENCES: Experience[] = [
  {
    role: 'Flutter Developer · Freelance',
    company: 'Netopia',
    period: '10/2025 — Present',
    location: 'Hybrid · Rabat',
    description: 'Built "Passeport Maroc", the Ministry of Interior app that takes the passport process fully digital.',
    bullets: [
      'Integrated the official DGSN SDK for facial verification and reading Moroccan identity documents.',
      'Implemented banking-grade security: SSL pinning, encryption, root/emulator detection, anti-debug.',
      'Fixed every finding from the official APK static security audit run with the Ministry of Interior.',
    ],
    skills: ['Flutter', 'DGSN SDK', 'Mobile Security', 'Gov APIs'],
    current: true,
  },
  {
    role: 'Flutter Developer · Freelance',
    company: 'Intelcia IT Solutions',
    period: '11/2024 — 05/2025',
    location: 'Hybrid',
    description: "Delivered 4 government apps for Moroccan public administrations: e-Parapheur, Rendez-vous, Chikaya and Bureau d'Ordre.",
    bullets: [
      'Integrated secure government APIs with strict data-flow rules.',
      'Designed accessible, fast interfaces for a broad public audience.',
      'Worked with multidisciplinary teams to meet regulatory compliance.',
    ],
    skills: ['Flutter', 'Architecture', 'State Management'],
  },
  {
    role: 'Flutter Developer · Freelance',
    company: 'EliteConnect',
    period: '09/2023 — 11/2024',
    location: 'Remote',
    description: 'Led UI architecture and front-end development of EliteConnect, a sports recruitment platform.',
    bullets: [
      'Built profile customization for clubs, agents and athletes.',
      'Refactored legacy UI components to improve retention and UX flows.',
    ],
    skills: ['Flutter', 'UI/UX', 'Performance'],
  },
  {
    role: 'Flutter Developer',
    company: 'WEBCK',
    period: '06/2024 — 09/2024',
    location: 'Technopark',
    description: 'Designed and shipped mobile business-management apps from scratch.',
    bullets: [
      'Consumed complex REST APIs to build enterprise modules.',
      'Set up testing, took part in QA, and kept state management clean.',
    ],
    skills: ['REST APIs', 'QA/Testing', 'Architecture'],
  },
  {
    role: 'Flutter Developer · Freelance',
    company: 'Independent',
    period: '12/2022 — 09/2023',
    location: 'Remote',
    description: 'Freelance cross-platform apps for clients. Published 2 apps on the Play Store.',
    bullets: [
      'Used GetX, Provider and Riverpod for state management.',
      'Focused on accessibility and rendering performance.',
      'Integrated third-party services such as the Google Maps API.',
    ],
    skills: ['Riverpod', 'GetX', 'Play Store', 'Google Maps'],
  },
];
