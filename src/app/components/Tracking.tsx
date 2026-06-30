'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Tracking() {
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || null,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        platform: navigator.platform,
      }),
    }).catch((error) =>
      console.warn('Tracking fetch failed (likely blocked by extension):', error?.message)
    );
  }, [pathname]);

  return null;
}
