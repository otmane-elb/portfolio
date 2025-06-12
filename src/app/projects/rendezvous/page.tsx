'use client';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RendezVousPage() {
  return (
    <div className="bg-neutral-950 text-white px-6 sm:px-12 lg:px-32 py-12 max-w-3xl mx-auto space-y-24">
      <Navbar />

      {/* Project Title */}
      <motion.h1
        className="text-2xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Rendez-vous 📆
      </motion.h1>

      {/* Video Demo */}
      <motion.div
        className="w-[300px] sm:w-[360px] aspect-[9/20] mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <video
          controls
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/rendezvousvid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Project Description */}
      <motion.div
        className="space-y-4 text-sm text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p>
          Rendez-vous is an appointment scheduling application that allows users within the administration to plan, manage, and track appointments through an intuitive calendar-based interface. It helps streamline interactions between citizens and services.
        </p>
        <p>
          <strong>What I did:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Created the project and set up the full code architecture.</li>
          <li>Developed the entire user interface based on team-provided designs.</li>
          <li>Handled all backend integration personally.</li>
          <li>Worked independently on the complete implementation.</li>
        </ul>
      </motion.div>

      {/* Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <img src="/images/rendezvous01.jpg" alt="Screenshot 1" className="rounded-lg border border-gray-700" />
        <img src="/images/rendezvous02.jpg" alt="Screenshot 2" className="rounded-lg border border-gray-700" />
        <img src="/images/rendezvous03.jpg" alt="Screenshot 3" className="rounded-lg border border-gray-700" />
        <img src="/images/rendezvous04.jpg" alt="Screenshot 4" className="rounded-lg border border-gray-700" />
        <img src="/images/rendezvous05.jpg" alt="Screenshot 5" className="rounded-lg border border-gray-700" />
        <img src="/images/rendezvous06.jpg" alt="Screenshot 6" className="rounded-lg border border-gray-700" />
        <img src="/images/rendezvous07.jpg" alt="Screenshot 7" className="rounded-lg border border-gray-700" />
      </div>

      {/* Back link */}
      <div>
        <Link href="/projects" className="text-blue-400 hover:underline">← Back to Projects</Link>
      </div>

      <Footer />
    </div>
  );
}
