'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function ProjectsPage() {
    return (
        <div className="bg-neutral-950 text-white px-6 sm:px-12 lg:px-32 py-12 max-w-3xl mx-auto space-y-24">

            <Navbar />

            {/* Projects Section */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
            >
                <h1 className="text-2xl font-bold">All Projects</h1>

                <ul className="space-y-4">
                    <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
                        <Link href="/projects/eparapheur">
                            <div className="font-semibold">Eparapheur</div>
                            <div className="text-sm text-gray-400">
                                Mobile companion to the E-Parapheur platform, enabling full digitization of mail processing within public administrations.
                            </div>
                        </Link>
                    </li>

                    <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
                        <Link href="/projects/rendezvous">
                            <div className="font-semibold">Rendez-vous</div>
                            <div className="text-sm text-gray-400">
                                Appointment scheduling application with calendar management features.
                            </div>
                        </Link>
                    </li>

                    <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
                        <Link href="/projects/chikaya">
                            <div className="font-semibold">Chikaya</div>
                            <div className="text-sm text-gray-400">
                                Application for submitting and tracking complaints.
                            </div>
                        </Link>
                    </li>
                    <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
                        <Link href="/projects/bureau-dordre">
                            <div className="font-semibold">Bureau d’Ordre</div>
                            <div className="text-sm text-gray-400">
                                Application for managing incoming/outgoing correspondence with document traceability.
                            </div>
                        </Link>
                    </li>
                    <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
                        <Link href="/projects/eliteconect">
                            <div className="font-semibold">Elite Conect</div>
                            <div className="text-sm text-gray-400">
                                Application designed to connect athletes, clubs, coaches, and agents. It streamlines recruitment in the sports industry by allowing users to showcase profiles, achievements, and connect through a professional networking interface.
                            </div>
                        </Link>
                    </li>
                    <li className="border border-gray-700 rounded-lg p-4 hover:bg-white/5 transition">
                        <Link href="/projects/chikaya">
                            <div className="font-semibold">Topela</div>
                            <div className="text-sm text-gray-400">
                                Application that simplifies the relationship between professionals and clients. With intuitive interfaces, both pros and clients can share useful information throughout their business relationship.
                            </div>
                        </Link>
                    </li>


                </ul>
            </motion.section>

            <Footer />
        </div>
    );
}
