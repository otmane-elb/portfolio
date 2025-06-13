'use client';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ChikayaPage() {
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
                Chikaya
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
                    playsInline autoPlay muted
                    className="w-full h-full object-cover"
                >
                    <source src="/videos/chikayavid.mp4" type="video/mp4" />
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
                    Chikaya is a digital platform for submitting, managing, and tracking complaints directed toward Moroccan public administrations — inspired by <a href="https://www.chikaya.ma/" target="_blank" className="text-blue-400 underline">chikaya.ma</a>. It aims to promote transparency, streamline administrative processes, and empower citizens by enabling them to raise concerns directly from their mobile devices.
                </p>
                <p>
                    <strong>What I did:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Built the app’s structure from scratch using Flutter.</li>
                    <li>Implemented the complaint (reclamation) flow with proper form validation, status tracking, and submission.</li>
                    <li>Integrated backend APIs to manage categories, departments, file uploads, and complaint history.</li>
                    <li>Ensured UI/UX consistency with the provided design specifications.</li>
                </ul>
            </motion.div>

            {/* Screenshots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img src="/images/chikaya01.jpg" alt="Screenshot 1" className="rounded-lg border border-gray-700" />
                <img src="/images/chikaya02.jpg" alt="Screenshot 2" className="rounded-lg border border-gray-700" />
                <img src="/images/chikaya03.jpg" alt="Screenshot 3" className="rounded-lg border border-gray-700" />
                <img src="/images/chikaya04.jpg" alt="Screenshot 4" className="rounded-lg border border-gray-700" />
                <img src="/images/chikaya05.jpg" alt="Screenshot 5" className="rounded-lg border border-gray-700" />
                <img src="/images/chikaya06.jpg" alt="Screenshot 6" className="rounded-lg border border-gray-700" />
                <img src="/images/chikaya07.jpg" alt="Screenshot 7" className="rounded-lg border border-gray-700" />
                <img src="/images/chikaya08.jpg" alt="Screenshot 8" className="rounded-lg border border-gray-700" />
            </div>

            {/* Back link */}
            <div>
                <Link href="/projects" className="text-blue-400 hover:underline">← Back to Projects</Link>
            </div>

            <Footer />
        </div>
    );
}
