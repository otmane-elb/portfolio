'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Tracking() {
  const pathname = usePathname();
  const currentPath = useRef<string | null>(null);
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);
  const clicks = useRef({
    github: 0,
    linkedin: 0,
    cv: 0,
    contact: 0
  });

  // Track session & visit number (client-side only)
  const sessionInfo = useRef<{ sessionId: string; visitNumber: number } | null>(null);

  const getSessionInfo = () => {
    if (sessionInfo.current) return sessionInfo.current;
    
    let sessionId = '';
    if (typeof window !== 'undefined') {
      sessionId = sessionStorage.getItem('portfolio_session_id') || '';
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('portfolio_session_id', sessionId);
        
        const count = parseInt(localStorage.getItem('portfolio_visit_count') || '0', 10) + 1;
        localStorage.setItem('portfolio_visit_count', count.toString());
      }
    }
    
    const visitNumber = parseInt(localStorage.getItem('portfolio_visit_count') || '1', 10);
    sessionInfo.current = { sessionId, visitNumber };
    return sessionInfo.current;
  };

  // Helper to send tracking data to server
  const sendTrackingData = (path: string, isUnload = false) => {
    const elapsed = Math.round((Date.now() - startTime.current) / 1000);
    
    // Don't report extremely short page views on unload (e.g. bots or quick misclicks < 1.5s)
    if (isUnload && elapsed < 1.5) return;

    const { sessionId, visitNumber } = getSessionInfo();
    const params = new URLSearchParams(window.location.search);

    const payload = {
      url: window.location.origin + path,
      title: document.title || 'Otmane El Baghazaoui | Portfolio',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || null,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      language: navigator.language,
      languages: navigator.languages ? [...navigator.languages] : [navigator.language],
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      maxTouchPoints: navigator.maxTouchPoints || 0,
      utm: {
        source: params.get('utm_source'),
        medium: params.get('utm_medium'),
        campaign: params.get('utm_campaign'),
        term: params.get('utm_term'),
        content: params.get('utm_content'),
      },
      visitNumber,
      sessionId,
      timeOnPage: elapsed,
      scrollDepth: maxScroll.current,
      clicks: clicks.current,
    };

    // Use keepalive: true so that if the page is unloading, the browser guarantees delivery of the POST
    fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((error) =>
      console.warn('Tracking fetch failed:', error?.message)
    );
  };

  // 1. Handle scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const percentage = Math.round((scrollTop / docHeight) * 100);
        maxScroll.current = Math.max(maxScroll.current, Math.min(percentage, 100));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Handle interactive clicks tracking
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href') || '';

      if (href.includes('github.com')) {
        clicks.current.github += 1;
      } else if (href.includes('linkedin.com')) {
        clicks.current.linkedin += 1;
      } else if (href.includes('cv-') || href.endsWith('.pdf')) {
        clicks.current.cv += 1;
      } else if (href.startsWith('mailto:') || href.includes('contact')) {
        clicks.current.contact += 1;
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // 3. Handle pathname transitions
  useEffect(() => {
    // If it's the very first load, set currentPath and do NOT trigger unload tracking
    if (currentPath.current === null) {
      currentPath.current = pathname;
      startTime.current = Date.now();
      maxScroll.current = 0;
      clicks.current = { github: 0, linkedin: 0, cv: 0, contact: 0 };
      return;
    }

    // Pathname changed -> Send stats for previous path, reset stats for new path
    const prevPath = currentPath.current;
    sendTrackingData(prevPath, false);

    currentPath.current = pathname;
    startTime.current = Date.now();
    maxScroll.current = 0;
    clicks.current = { github: 0, linkedin: 0, cv: 0, contact: 0 };
  }, [pathname]);

  // 4. Handle page visibility transitions (tab close, browser minimize)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (currentPath.current) {
          sendTrackingData(currentPath.current, true);
        }
      } else if (document.visibilityState === 'visible') {
        // Reset startTime when returning to the tab so we don't skew the duration
        startTime.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return null;
}
