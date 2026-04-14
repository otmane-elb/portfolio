'use client';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';

export default function BodPage() {
  return (
    <CaseStudyLayout
      title="Bureau d’Ordre"
      subtitle="Managing incoming and outgoing correspondence with full document traceability for public administrations."
      role="Flutter Developer"
      timeline="2025"
      stack={['Flutter', 'Document Security', 'Traceability', 'APIs']}
      challenge="Public administrations required a reliable way to manage massive amounts of physical and digital correspondence while maintaining an audit trail and strict document traceability."
      solution="Developed a secure mobile interface that integrates with centralized government servers, allowing users to scan, categorize, and track documents in real-time."
      contributions={['Architected the document tracking workflow.', 'Implemented secure API data fetching and state management.', 'Integrated barcode/QR scanning for quick document lookup.', 'Collaborated with backend teams to ensure data integrity.']}
      
      images={[{'src': '/images/bod01.jpg', 'alt': 'Bureau d’Ordre Screenshot'}, {'src': '/images/bod02.jpg', 'alt': 'Bureau d’Ordre Screenshot'}, {'src': '/images/bod03.jpg', 'alt': 'Bureau d’Ordre Screenshot'}, {'src': '/images/bod04.jpg', 'alt': 'Bureau d’Ordre Screenshot'}, {'src': '/images/bod05.jpg', 'alt': 'Bureau d’Ordre Screenshot'}, {'src': '/images/bod06.jpg', 'alt': 'Bureau d’Ordre Screenshot'}, {'src': '/images/bod07.jpg', 'alt': 'Bureau d’Ordre Screenshot'}]}
    />
  );
}
