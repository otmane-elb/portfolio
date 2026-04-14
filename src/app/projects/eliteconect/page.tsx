'use client';
import CaseStudyLayout from '@/app/components/CaseStudyLayout';

export default function EliteconectPage() {
  return (
    <CaseStudyLayout
      title="Elite Connect"
      subtitle="Dynamic sports recruitment platform for clubs, agents, and athletes."
      role="Senior Flutter Developer"
      timeline="2023 - 2024"
      stack={['Flutter', 'Firebase', 'Cloud Functions', 'Social API']}
      challenge="Connecting athletes with recruiters and agents in a professional, social-media-style environment specialized for sports."
      solution="Built a high-performance social platform with dynamic profiles, post feeds, and recruitment discovery tools using Flutter and Firebase."
      contributions={['Transformed founder ideas into a working MVP.', 'Developed custom UI for complex role-based profiles (Club vs Athlete).', 'Integrated Firebase Auth, Firestore, and Storage.', 'Optimized data models for high-concurrency feed interactions.']}
      
      images={[{'src': '/images/ec01.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec02.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec03.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec04.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec05.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec06.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec07.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec08.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec09.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec10.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec11.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec12.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec13.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec14.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec15.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec16.jpg', 'alt': 'Elite Connect Screenshot'}, {'src': '/images/ec17.jpg', 'alt': 'Elite Connect Screenshot'}]}
    />
  );
}
