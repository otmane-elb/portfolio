'use client';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';

export default function PasseportPage() {
  return (
    <CaseStudyLayout
      title="Passeport Maroc"
      subtitle="Official mobile application for Moroccan passport requests, enabling citizens to apply, track, and pay for passports entirely from their phone."
      role="Lead Flutter Developer"
      timeline="2025 - 2026"
      stack={['Flutter', 'Riverpod', 'Dio', 'NFC', 'Freezed', 'Government APIs', 'CMI Payment', 'freeRASP Security']}
      challenge="Moroccan citizens had to go through lengthy, paper-heavy administrative processes to apply for a passport, with no mobile-first experience. The government needed a secure, multilingual app that could handle sensitive identity verification, NFC document scanning, online payments, and strict security requirements."
      solution="Built a production-grade Flutter application with advanced security layers (freeRASP, anti-tampering, root/jailbreak detection), NFC-based national ID scanning, real-time government API integration, CMI online payment, and full multilingual support (French, Arabic, English)."
      contributions={[
        'Architected the full app using MVVM with Riverpod for state management, Freezed for immutable models, and AutoRoute for navigation.',
        'Implemented NFC-based national ID card scanning for automated identity verification.',
        'Integrated CMI payment gateway for secure online passport fee transactions.',
        'Built a multi-step passport request form with dynamic validation, photo upload with compliance checks, and digital signature capture.',
        'Developed a comprehensive security layer using freeRASP — detecting root/jailbreak, debuggers, hooks, ADB, and unofficial app stores.',
        'Implemented real-time application tracking so users can follow their passport request status.',
        'Added full i18n support (French, Arabic, English) with server-driven translations.',
        'Integrated push notifications for status updates and application milestones.'
      ]}
      images={[
        { src: '/images/passeport01.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport02.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport03.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport04.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport05.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport06.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport07.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport08.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport09.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport10.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport11.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport12.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport13.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport14.jpg', alt: 'Passeport Maroc Screenshot' },
        { src: '/images/passeport15.jpg', alt: 'Passeport Maroc Screenshot' }
      ]}
    />
  );
}
