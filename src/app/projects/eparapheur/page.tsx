'use client';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';

export default function EparapheurPage() {
  return (
    <CaseStudyLayout
      title="Eparapheur"
      subtitle="Mobile companion to the E-Parapheur platform, enabling full digitization of mail processing."
      role="Flutter Developer"
      timeline="2024 - 2025"
      stack={['Flutter', 'PDF Integration', 'Government APIs', 'Auth']}
      challenge="Administrations needed to move away from paper-based signatures and mail internal routing, requiring a mobile solution for officials on the go."
      solution="Built a robust Flutter application with secure authentication and real-time synchronization with the existing E-Parapheur web platform."
      contributions={['Developed accessible UI following strict design specifications.', 'Integrated secure government APIs for document management and validation.', 'Ensured cross-device responsive design and high performance.', 'Implemented offline support for document viewing.']}
      videoSrc="/videos/eparapheurvid.mp4"
      images={[{'src': '/images/eparapheur01.jpg', 'alt': 'Eparapheur Screenshot'}, {'src': '/images/eparapheur02.jpg', 'alt': 'Eparapheur Screenshot'}, {'src': '/images/eparapheur03.jpg', 'alt': 'Eparapheur Screenshot'}, {'src': '/images/eparapheur04.jpg', 'alt': 'Eparapheur Screenshot'}, {'src': '/images/eparapheur05.jpg', 'alt': 'Eparapheur Screenshot'}, {'src': '/images/eparapheur06.jpg', 'alt': 'Eparapheur Screenshot'}]}
    />
  );
}
