'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function ExperiencePage() {
    return (
        <div className="bg-neutral-950 text-white px-6 sm:px-12 lg:px-32 py-12 text-sm max-w-3xl mx-auto space-y-24">
            <Navbar />

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12 text-sm text-gray-300"
            >
                <h1 className="text-2xl font-bold text-white">Full Work Experience</h1>
                <div className="space-y-12 text-sm text-gray-300">
                    {/* experience entries here */}


                    {/* Intelcia */}
                    <div>
                        <p className="text-xs text-gray-400">📅 11/2024 – Present · 📍 Hybrid</p>
                        <h2 className="font-semibold text-white">Flutter Developer Freelance</h2>
                        <p className="text-blue-400 font-medium">Intelcia IT Solutions</p>
                        <div className="mt-2">
                            <p className="font-semibold">Development of government mobile applications, including:</p>
                            <ul className="list-disc list-inside space-y-1 mt-1">
                                <li><strong>Eparapheur:</strong> Mail digitization companion app.</li>
                                <li><strong>Rendez-vous:</strong> Appointment scheduling with calendar features.</li>
                                <li><strong>Chikaya:</strong> Complaint submission and tracking app.</li>
                                <li><strong>Bureau d’Ordre:</strong> Document traceability and correspondence manager.</li>
                            </ul>
                        </div>
                        <div className="mt-2">
                            <p className="font-semibold">Tasks included:</p>
                            <ul className="list-disc list-inside space-y-1 mt-1">
                                <li>Integration of secure government APIs and data flow.</li>
                                <li>Accessible, user-friendly interface design.</li>
                                <li>Collaboration with multidisciplinary teams for compliance.</li>
                            </ul>
                        </div>
                    </div>

                    {/* EliteConnect */}
                    <div>
                        <p className="text-xs text-gray-400">📅 09/2023 – 11/2024 · 📍 Remote</p>
                        <h2 className="font-semibold text-white">Flutter Developer Freelance</h2>
                        <p className="text-blue-400 font-medium">ELITECONNECT</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                            <li><strong>Platform Development:</strong> Developed a sports recruitment platform.</li>
                            <li><strong>User Profile Creation:</strong> Features for clubs, agents, athletes.</li>
                            <li><strong>UI Enhancements:</strong> Improved interface usability and experience.</li>
                        </ul>
                    </div>

                    {/* Webck */}
                    <div>
                        <p className="text-xs text-gray-400">📅 06/2024 – 09/2024 · 📍 TechnoPark</p>
                        <h2 className="font-semibold text-white">Flutter Developer</h2>
                        <p className="text-blue-400 font-medium">WEBCK</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                            <li><strong>API Integration:</strong> Consumed APIs for mobile business management.</li>
                            <li><strong>Development Practices:</strong> State management, layout, clean navigation.</li>
                            <li><strong>Testing Contribution:</strong> Testing and QA participation.</li>
                            <li><strong>Feature Design:</strong> Designed new feature experiences.</li>
                        </ul>
                    </div>

                    {/* Freelancer */}
                    <div>
                        <p className="text-xs text-gray-400">📅 12/2022 – 09/2023 · 📍 Remote</p>
                        <h2 className="font-semibold text-white">Flutter Developer Freelance</h2>
                        <p className="text-blue-400 font-medium">FREELANCER</p>
                        <ul className="list-disc list-inside space-y-1 mt-1">
                            <li><strong>API Integration:</strong> RESTful APIs (frontend/backend communication).</li>
                            <li><strong>State Management:</strong> Used GetX, Provider, Riverpod.</li>
                            <li><strong>App Deployment:</strong> Published 2 apps on Play Store.</li>
                            <li><strong>UI/UX Design:</strong> Accessibility-focused UI work.</li>
                            <li><strong>Performance Optimization:</strong> Improved loading speeds.</li>
                            <li><strong>Version Control:</strong> Git-based feature integration.</li>
                            <li><strong>Google Maps API Integration:</strong> Added geolocation functionality.</li>
                        </ul>
                    </div>

                    {/* Customs Agent */}
                    <div>
                        <p className="text-xs text-gray-400">📅 05/2021 – 05/2024</p>
                        <h2 className="font-semibold text-white">Customs Agent</h2>
                        <p className="text-blue-400 font-medium">ADII</p>
                    </div>

                    {/* Az Networking */}
                    <div>
                        <p className="text-xs text-gray-400">📅 02/2021 – 05/2021 · 📍 Deroua</p>
                        <h2 className="font-semibold text-white">Developer Intern</h2>
                        <p className="text-blue-400 font-medium">Az networking</p>
                        <p className="mt-1">Desktop Application Development</p>
                    </div>

                </div>
            </motion.section>

           <Footer />
        </div>
    );
}
