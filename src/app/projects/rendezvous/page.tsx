'use client';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';

export default function RendezvousPage() {
  return (
    <CaseStudyLayout
      title="Rendez-vous 📆"
      subtitle="Government appointments scheduling application featuring advanced calendar management."
      role="Lead Flutter Developer"
      timeline="2024"
      stack={['Flutter', 'Calendar API', 'Dart', 'Scheduling Logic']}
      challenge="Coordinating appointments across various public services to reduce wait times and improve citizen experience."
      solution="Engineered a centralized scheduling app with intuitive calendar views and automated conflict resolution."
      contributions={['Set up the full mobile code architecture.', 'Developed the entire interface based on team-provided designs.', 'Handled complete backend integration personally.', 'Collaborated on the scheduling algorithm logic.']}
      videoSrc="/videos/rendezvousvid.mp4"
      images={[{'src': '/images/rendezvous01.jpg', 'alt': 'Rendez-vous 📆 Screenshot'}, {'src': '/images/rendezvous02.jpg', 'alt': 'Rendez-vous 📆 Screenshot'}, {'src': '/images/rendezvous03.jpg', 'alt': 'Rendez-vous 📆 Screenshot'}, {'src': '/images/rendezvous04.jpg', 'alt': 'Rendez-vous 📆 Screenshot'}, {'src': '/images/rendezvous05.jpg', 'alt': 'Rendez-vous 📆 Screenshot'}, {'src': '/images/rendezvous06.jpg', 'alt': 'Rendez-vous 📆 Screenshot'}, {'src': '/images/rendezvous07.jpg', 'alt': 'Rendez-vous 📆 Screenshot'}]}
    />
  );
}
