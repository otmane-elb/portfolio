'use client';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TopelaPage() {
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
                Topela
            </motion.h1>


            {/* Project Description */}
            <motion.div
                className="space-y-4 text-sm text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <p>
                    <a href="https://123topela.fr/" target="_blank" className="text-blue-400 underline">Topela</a> is a platform that simplifies the relationship between professionals and clients, offering an intuitive interface to manage quotes, invoices, appointments, and more.
                </p>
                <p>
                    <strong>What I did :</strong>
                </p>
                <ul className="list-disc list-inside space-y-1"><ul className="list-disc list-inside space-y-1">
                    <li>Helped designed and implemented a robust subscription system to manage premium features and user plans efficiently.</li>
                    <li>Contributed to UI/UX enhancements, ensuring alignment with the design team&apos;s vision and improving overall user experience.</li>
                    <li>Developed and integrated the accounting export functionality, enabling users to easily generate and share financial data with accountants.</li>
                    <li>Revamped the notifications page from the ground up — from interface design to functional logic — to improve clarity and user engagement.</li>
                </ul>
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <img src="/images/topela01.webp" alt="Screenshot 1" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela02.webp" alt="Screenshot 2" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela03.webp" alt="Screenshot 3" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela04.webp" alt="Screenshot 4" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela05.webp" alt="Screenshot 5" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela06.webp" alt="Screenshot 6" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela07.webp" alt="Screenshot 7" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela08.webp" alt="Screenshot 8" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela09.webp" alt="Screenshot 9" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela10.webp" alt="Screenshot 10" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela11.webp" alt="Screenshot 11" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela12.webp" alt="Screenshot 12" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela13.webp" alt="Screenshot 13" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela14.webp" alt="Screenshot 14" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela15.webp" alt="Screenshot 15" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela16.webp" alt="Screenshot 16" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela17.webp" alt="Screenshot 17" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela18.webp" alt="Screenshot 18" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela19.webp" alt="Screenshot 19" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela20.webp" alt="Screenshot 20" className="rounded-lg border border-gray-700" />
                    <img src="/images/topela21.webp" alt="Screenshot 21" className="rounded-lg border border-gray-700" />
                </div>
            </motion.div>
            {/* Screenshots */}


            {/* Back link */}
            <div>
                <Link href="/projects" className="text-blue-400 hover:underline">← Back to Projects</Link>
            </div>

            <Footer />
        </div>
    );
}
