'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from './components/footer';
import Navbar from './components/navbar';

export default function Home() {
  return (
    <div className="bg-neutral-950 text-white px-6 sm:px-12 lg:px-32 py-12 text-sm max-w-3xl mx-auto space-y-24">
      <Navbar />


      {/* Intro */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-xl font-semibold">Hi, I&apos;m Otmane 👋</h2>
        <p className="text-gray-400 italic">
          I&apos;m a Flutter Developer with a passion for mobile experiences, UI design and scalable architecture. I work with Flutter, Firebase, and modern tooling to ship high-quality apps.
        </p>
      </motion.section>

      {/* Work Experience Preview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Work Experience</h3>
          <Link href="/experience" className="text-sm text-gray-400 hover:text-white underline">See all</Link>
        </div>

        <div className="space-y-10 text-gray-300 text-sm">
          {/* Intelcia IT Solutions */}
          <div>
            <p className="text-xs text-gray-400">📅 11/2024 – 05/2025 · 📍 Hybrid</p>
            <h4 className="font-semibold text-white">Flutter Developer Freelance</h4>
            <p className="text-blue-400 font-medium">Intelcia IT Solutions</p>
            <div className="mt-2">
              <p className="font-semibold">Development of government mobile applications, including:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li><strong>Eparapheur</strong>: Mail digitization companion app for public administrations.</li>
                <li><strong>Rendez-vous</strong>: Calendar-based appointment scheduling app.</li>
                <li><strong>Chikaya</strong>: Complaint submission and tracking app.</li>
                <li><strong>Bureau d’Ordre</strong>: Document tracking and correspondence app.</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-semibold">Tasks included:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Integration of secure government APIs and data flow management.</li>
                <li>Design of accessible, user-friendly interfaces.</li>
                <li>Collaboration with cross-functional teams for compliance.</li>
              </ul>
            </div>
          </div>

          {/* ELITECONNECT */}
          <div>
            <p className="text-xs text-gray-400">📅 09/2023 – 11/2024 · 📍 Remote</p>
            <h4 className="font-semibold text-white">Flutter Developer Freelance</h4>
            <p className="text-blue-400 font-medium">ELITECONNECT</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Platform Development</strong>: Designed and developed EliteConnect, a sports recruitment platform.</li>
              <li><strong>User Profile Creation</strong>: Enabled clubs, coaches, agents, and athletes to create profiles.</li>
              <li><strong>UI Enhancements</strong>: Improved the interface for a better user experience.</li>
            </ul>
          </div>
        </div>
      </motion.section>


      {/* Projects Preview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Recent Projects</h3>
          <Link href="/projects" className="text-sm text-gray-400 hover:text-white underline">See all projects</Link>
        </div>
        <ul className="space-y-4">
          <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
            <Link href="/projects/eparapheur">
              <div className="font-semibold">Eparapheur</div>
              <div className="text-sm text-gray-400"> Mobile companion to the E-Parapheur platform, enabling full digitization of mail processing within public administrations.</div>
            </Link>
          </li>
          <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
            <Link href="/projects/rendezvous">
              <div className="font-semibold">Rendez-vous</div>
              <div className="text-sm text-gray-400">Appointment scheduling application with calendar management features.</div>
            </Link>
          </li>  <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
            <Link href="/projects/chikaya">
              <div className="font-semibold">Chikaya</div>
              <div className="text-sm text-gray-400">Application for submitting and tracking complaints.</div>
            </Link>
          </li>
        </ul>
      </motion.section>
      <Footer />
    </div>

  );
}
