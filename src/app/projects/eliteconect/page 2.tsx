'use client';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EliteConectPage() {
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
                EliteConect
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
                    <source src="/videos/eliteconectvid.mp4" type="video/mp4" />
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
                    EliteConect is a sports recruitment platform that conects athletes, clubs, coaches, and agents. The platform allows users to create detailed profiles, discover opportunities, and engage in meaningful collaborations. It was built entirely from scratch based on the vision shared by the platform owner.
                </p>
                <p>
                    <strong>What I did:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Worked closely with the founder to transform ideas into a working MVP.</li>
                    <li>Developed the full app using Flutter with a clean and modern UI.</li>
                    <li>Integrated Firebase Authentication, Firestore, and Storage.</li>
                    <li>Designed and implemented data models and complex relationships between users, roles (clubs, players, coaches), and posts.</li>
                    <li>Handled everything from account creation to dynamic profile visibility and post feeds.</li>
                </ul>
            </motion.div>

            {/* Screenshots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <img src="/images/ec01.jpg" alt="Screenshot 1" className="rounded-lg border border-gray-700" />
                <img src="/images/ec02.jpg" alt="Screenshot 2" className="rounded-lg border border-gray-700" />
                <img src="/images/ec03.jpg" alt="Screenshot 3" className="rounded-lg border border-gray-700" />
                <img src="/images/ec04.jpg" alt="Screenshot 4" className="rounded-lg border border-gray-700" />
                <img src="/images/ec05.jpg" alt="Screenshot 5" className="rounded-lg border border-gray-700" />
                <img src="/images/ec06.jpg" alt="Screenshot 6" className="rounded-lg border border-gray-700" />
                <img src="/images/ec07.jpg" alt="Screenshot 7" className="rounded-lg border border-gray-700" />
                <img src="/images/ec08.jpg" alt="Screenshot 8" className="rounded-lg border border-gray-700" />
                <img src="/images/ec09.jpg" alt="Screenshot 9" className="rounded-lg border border-gray-700" />
                <img src="/images/ec10.jpg" alt="Screenshot 10" className="rounded-lg border border-gray-700" />
                <img src="/images/ec11.jpg" alt="Screenshot 11" className="rounded-lg border border-gray-700" />
                <img src="/images/ec12.jpg" alt="Screenshot 12" className="rounded-lg border border-gray-700" />
                <img src="/images/ec13.jpg" alt="Screenshot 13" className="rounded-lg border border-gray-700" />
                <img src="/images/ec14.jpg" alt="Screenshot 14" className="rounded-lg border border-gray-700" />
                <img src="/images/ec15.jpg" alt="Screenshot 15" className="rounded-lg border border-gray-700" />
                <img src="/images/ec16.jpg" alt="Screenshot 16" className="rounded-lg border border-gray-700" />
                <img src="/images/ec17.jpg" alt="Screenshot 17" className="rounded-lg border border-gray-700" />
            </div>

            {/* Back link */}
            <div>
                <Link href="/projects" className="text-blue-400 hover:underline">← Back to Projects</Link>
            </div>

            <Footer />
        </div>
    );
}
