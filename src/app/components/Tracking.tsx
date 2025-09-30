'use client';

import { useEffect } from 'react';

export default function Tracking() {
  useEffect(() => {
    fetch("https://otmane101.app.n8n.cloud/webhook/99bee353-e2c2-4f79-aa5f-278b9a6efd6c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    });
  }, []);

  return null;
}
