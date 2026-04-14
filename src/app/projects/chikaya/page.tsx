'use client';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';

export default function ChikayaPage() {
  return (
    <CaseStudyLayout
      title="Chikaya"
      subtitle="A national platform for citizens to submit and track complaints with transparency."
      role="Flutter Developer"
      timeline="2024"
      stack={['Flutter', 'Real-time Tracking', 'APIs', 'Forms']}
      challenge="Establishing a transparent and reliable communication channel between citizens and government agencies for complaint resolution."
      solution="Designed and implemented the mobile client for Chikaya, focusing on ease of use and immediate feedback for citizen submissions."
      contributions={['Built advanced form validation flows for complex data entry.', 'Implemented real-time status tracking and notifications.', 'Optimized image uploading and compression for evidence attachments.', 'Collaborated on securing the data flow from mobile to gov servers.']}
      videoSrc="/videos/chikayavid.mp4"
      images={[{'src': '/images/chikaya01.jpg', 'alt': 'Chikaya Screenshot'}, {'src': '/images/chikaya02.jpg', 'alt': 'Chikaya Screenshot'}, {'src': '/images/chikaya03.jpg', 'alt': 'Chikaya Screenshot'}]}
    />
  );
}
