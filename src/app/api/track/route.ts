import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Simple in-memory rate limiting (resets on cold start, which is fine for Vercel)
const recentVisits = new Map<string, number>();
const COOLDOWN_MS = 10_000; // 10 seconds to allow seamless page transitions to register

const BROWSER_PATTERNS = [
  { name: 'Edge', regex: /Edg\/([0-9._]+)/i },
  { name: 'Opera', regex: /(?:OPR|Opera)\/([0-9._]+)/i },
  { name: 'Chrome', regex: /Chrome\/([0-9._]+)/i },
  { name: 'Safari', regex: /Version\/([0-9._]+)/i },
  { name: 'Firefox', regex: /Firefox\/([0-9._]+)/i },
];

function detectBrowser(ua: string): { browser: string; version: string } {
  const criosMatch = /CriOS\/([0-9._]+)/i.exec(ua);
  if (criosMatch) return { browser: 'Chrome (iOS)', version: criosMatch[1] };

  const fxiosMatch = /FxiOS\/([0-9._]+)/i.exec(ua);
  if (fxiosMatch) return { browser: 'Firefox (iOS)', version: fxiosMatch[1] };

  for (const b of BROWSER_PATTERNS) {
    const match = b.regex.exec(ua);
    if (match) {
      return { browser: b.name, version: match[1] };
    }
  }

  return { browser: 'Unknown', version: 'Unknown' };
}

function detectDevice(ua: string): string {
  if (/iPad|Tablet/i.test(ua)) return 'Tablet';
  if (/Mobile|Android|iPhone/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

function detectOS(ua: string): string {
  if (/Windows/i.test(ua)) return 'Windows';
  if (/iPhone|iPad/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Mac OS/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Unknown';
}

// Parse browser, browser version, OS, & device from user agent
function parseUserAgent(ua: string, maxTouchPoints = 0) {
  const { browser, version } = detectBrowser(ua);
  let device = detectDevice(ua);
  let os = detectOS(ua);

  // Refine iPad/iOS detection (iPad Safari requests desktop site, reporting macOS but supporting touch)
  if (os === 'macOS' && maxTouchPoints > 0) {
    os = 'iOS (iPadOS)';
    device = 'Tablet';
  }

  return { browser, version, device, os };
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastVisit = recentVisits.get(ip);
  if (lastVisit && now - lastVisit < COOLDOWN_MS) {
    return true;
  }
  recentVisits.set(ip, now);

  // Clean up old entries to prevent memory leak
  if (recentVisits.size > 1000) {
    for (const [key, time] of recentVisits) {
      if (now - time > COOLDOWN_MS) recentVisits.delete(key);
    }
  }

  return false;
}

function formatVisitorTime(timestamp: number | string, clientTimezone?: string): string {
  if (clientTimezone) {
    try {
      return new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
        timeZone: clientTimezone,
      });
    } catch {
      // Fallback to default locale formatting
    }
  }
  return new Date(timestamp).toLocaleString('en-US');
}

function extractPath(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return '/';
  }
}

function renderUtmSection(utm?: Record<string, string | null>): string {
  if (!utm) return '';
  const entries: Array<[string, string | null | undefined]> = [
    ['Source', utm.source],
    ['Medium', utm.medium],
    ['Campaign', utm.campaign],
    ['Term', utm.term],
    ['Content', utm.content],
  ];

  const activeRows = entries
    .filter(([, val]) => Boolean(val))
    .map(([label, val]) => (
      `<tr style="border-top: 1px solid #1a1a1a;"><td style="padding: 5px 0; color: #888; width: 30%;">${label}</td><td style="padding: 5px 0; font-weight: 600; color: #38bdf8;">${val}</td></tr>`
    ))
    .join('');

  if (!activeRows) return '';

  return `
    <div style="background: #121212; border-radius: 10px; border: 1px solid #1c1c1c; padding: 16px; margin-bottom: 12px;">
      <p style="color: #aaa; font-size: 11px; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.8px;">📣 Campaign Attribution (UTM)</p>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #d4d4d4;">
        ${activeRows}
      </table>
    </div>
  `;
}

interface EmailPayload {
  url: string;
  title: string;
  referrer?: string;
  device: string;
  browser: string;
  version: string;
  os: string;
  screenWidth?: number;
  screenHeight?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  devicePixelRatio?: number;
  language?: string;
  languages?: string[];
  platform?: string;
  maxTouchPoints?: number;
  timeOnPage?: number;
  scrollDepth?: number;
  visitNumber?: number;
  clicks?: { github?: number; linkedin?: number; cv?: number; contact?: number };
  utm?: Record<string, string | null>;
  sessionId?: string;
  ip: string;
  userAgent?: string;
  visitorLocalTime: string;
  clientTimezone?: string;
  location: string;
  ipTimezone?: string | null;
  coords?: string | null;
  mapsLink?: string | null;
}

function buildEmailHtml(data: EmailPayload): string {
  const {
    url,
    title,
    referrer,
    device,
    browser,
    version,
    os,
    screenWidth,
    screenHeight,
    viewportWidth,
    viewportHeight,
    devicePixelRatio = 1,
    language,
    languages = [],
    platform,
    maxTouchPoints = 0,
    timeOnPage = 0,
    scrollDepth = 0,
    visitNumber = 1,
    clicks = { github: 0, linkedin: 0, cv: 0, contact: 0 },
    utm,
    sessionId = 'Unknown',
    ip,
    userAgent = '',
    visitorLocalTime,
    clientTimezone,
    location,
    ipTimezone,
    coords,
    mapsLink,
  } = data;

  const referrerBlock = referrer
    ? `<div>
        <p style="color: #888; font-size: 10px; margin: 0 0 2px 0; text-transform: uppercase; letter-spacing: 0.5px;">🔗 Referrer URL</p>
        <p style="color: #a3a3a3; font-size: 12px; margin: 0; word-break: break-all;">${referrer}</p>
      </div>`
    : '';

  const mapsBlock = coords && mapsLink
    ? `<p style="color: #666; font-size: 10px; margin: 4px 0 4px 0;">Coords: ${coords}</p>
       <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #222; border: 1px solid #333; color: #818cf8; text-decoration: none; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; margin-top: 2px;">🗺️ View on Google Maps</a>`
    : '';

  const tzIpNote = ipTimezone && ipTimezone !== clientTimezone ? `<br/>(IP TZ: ${ipTimezone})` : '';

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; background: #0a0a0a; border-radius: 16px; border: 1px solid #222; color: #ffffff;">
      <!-- Header -->
      <div style="margin-bottom: 24px;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">🚀 Portfolio Visit</h2>
        <p style="color: #666; margin: 2px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">Live visitor interaction report</p>
      </div>

      <!-- Section 1: Engagement Metrics -->
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <div style="flex: 1; background: #121212; border-radius: 8px; border: 1px solid #1c1c1c; padding: 14px; text-align: center;">
          <p style="color: #888; font-size: 10px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">⏱ Time on Page</p>
          <p style="color: #818cf8; font-size: 18px; font-weight: 700; margin: 0;">${timeOnPage}s</p>
        </div>
        <div style="flex: 1; background: #121212; border-radius: 8px; border: 1px solid #1c1c1c; padding: 14px; text-align: center;">
          <p style="color: #888; font-size: 10px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">📜 Scroll Depth</p>
          <p style="color: #34d399; font-size: 18px; font-weight: 700; margin: 0;">${scrollDepth}%</p>
        </div>
        <div style="flex: 1; background: #121212; border-radius: 8px; border: 1px solid #1c1c1c; padding: 14px; text-align: center;">
          <p style="color: #888; font-size: 10px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">🔢 Visit Number</p>
          <p style="color: #f59e0b; font-size: 18px; font-weight: 700; margin: 0;">#${visitNumber}</p>
        </div>
      </div>

      <!-- Section 2: Visitor Clicks / Actions -->
      <div style="background: #121212; border-radius: 10px; border: 1px solid #1c1c1c; padding: 16px; margin-bottom: 16px;">
        <p style="color: #aaa; font-size: 11px; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.8px;">⚡ Actions during visit</p>
        <div style="display: flex; gap: 8px; text-align: center;">
          <div style="flex: 1; background: #171717; border-radius: 6px; padding: 8px;">
            <p style="color: #888; font-size: 9px; margin: 0 0 2px 0;">GitHub</p>
            <p style="color: ${(clicks.github ?? 0) > 0 ? '#38bdf8' : '#444'}; font-size: 14px; font-weight: 700; margin: 0;">${clicks.github ?? 0}</p>
          </div>
          <div style="flex: 1; background: #171717; border-radius: 6px; padding: 8px;">
            <p style="color: #888; font-size: 9px; margin: 0 0 2px 0;">LinkedIn</p>
            <p style="color: ${(clicks.linkedin ?? 0) > 0 ? '#38bdf8' : '#444'}; font-size: 14px; font-weight: 700; margin: 0;">${clicks.linkedin ?? 0}</p>
          </div>
          <div style="flex: 1; background: #171717; border-radius: 6px; padding: 8px;">
            <p style="color: #888; font-size: 9px; margin: 0 0 2px 0;">CV Download</p>
            <p style="color: ${(clicks.cv ?? 0) > 0 ? '#38bdf8' : '#444'}; font-size: 14px; font-weight: 700; margin: 0;">${clicks.cv ?? 0}</p>
          </div>
          <div style="flex: 1; background: #171717; border-radius: 6px; padding: 8px;">
            <p style="color: #888; font-size: 9px; margin: 0 0 2px 0;">Contact</p>
            <p style="color: ${(clicks.contact ?? 0) > 0 ? '#38bdf8' : '#444'}; font-size: 14px; font-weight: 700; margin: 0;">${clicks.contact ?? 0}</p>
          </div>
        </div>
      </div>

      <!-- Section 3: Navigation Details -->
      <div style="background: #121212; border-radius: 10px; border: 1px solid #1c1c1c; padding: 16px; margin-bottom: 12px;">
        <div style="margin-bottom: 10px;">
          <p style="color: #888; font-size: 10px; margin: 0 0 2px 0; text-transform: uppercase; letter-spacing: 0.5px;">📄 Page Visited</p>
          <p style="color: #ffffff; font-size: 13px; font-weight: 600; margin: 0; word-break: break-all;">
            <a href="${url}" style="color: #818cf8; text-decoration: none;">${url}</a>
          </p>
        </div>
        <div style="margin-bottom: 10px;">
          <p style="color: #888; font-size: 10px; margin: 0 0 2px 0; text-transform: uppercase; letter-spacing: 0.5px;">🏷️ Page Title</p>
          <p style="color: #e5e5e5; font-size: 13px; margin: 0;">${title}</p>
        </div>
        ${referrerBlock}
      </div>

      <!-- Section 4: Geolocation & Local Time -->
      <div style="display: flex; gap: 12px; margin-bottom: 12px;">
        <div style="flex: 1; background: #121212; border-radius: 10px; border: 1px solid #1c1c1c; padding: 16px;">
          <p style="color: #888; font-size: 10px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">🕒 Visitor Local Time</p>
          <p style="color: #e5e5e5; font-size: 13px; font-weight: 600; margin: 0;">${visitorLocalTime}</p>
          <p style="color: #666; font-size: 10px; margin: 4px 0 0 0; font-family: monospace; word-break: break-all;">
            TZ: ${clientTimezone || 'Unknown'}${tzIpNote}
          </p>
        </div>
        <div style="flex: 1; background: #121212; border-radius: 10px; border: 1px solid #1c1c1c; padding: 16px;">
          <p style="color: #888; font-size: 10px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">📍 Location Details</p>
          <p style="color: #e5e5e5; font-size: 13px; font-weight: 600; margin: 0;">${location}</p>
          ${mapsBlock}
        </div>
      </div>

      <!-- Section 5: Device & Screen Capabilities -->
      <div style="background: #121212; border-radius: 10px; border: 1px solid #1c1c1c; padding: 16px; margin-bottom: 12px;">
        <p style="color: #aaa; font-size: 11px; font-weight: 600; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.8px;">💻 Device & Tech Specs</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #d4d4d4;">
          <tr>
            <td style="padding: 6px 0; color: #888; width: 40%;">Device Classification</td>
            <td style="padding: 6px 0; font-weight: 600; color: #fff;">${device}</td>
          </tr>
          <tr style="border-top: 1px solid #1a1a1a;">
            <td style="padding: 6px 0; color: #888;">Browser & Version</td>
            <td style="padding: 6px 0; font-weight: 600; color: #fff;">${browser} (v${version})</td>
          </tr>
          <tr style="border-top: 1px solid #1a1a1a;">
            <td style="padding: 6px 0; color: #888;">Operating System</td>
            <td style="padding: 6px 0; font-weight: 600; color: #fff;">${os}</td>
          </tr>
          <tr style="border-top: 1px solid #1a1a1a;">
            <td style="padding: 6px 0; color: #888;">Screen Resolution</td>
            <td style="padding: 6px 0; font-weight: 600; color: #fff;">${screenWidth || '?'}×${screenHeight || '?'} (Ratio: ${devicePixelRatio}x)</td>
          </tr>
          <tr style="border-top: 1px solid #1a1a1a;">
            <td style="padding: 6px 0; color: #888;">Viewport Dimensions</td>
            <td style="padding: 6px 0; font-weight: 600; color: #fff;">${viewportWidth || '?'}×${viewportHeight || '?'}</td>
          </tr>
          <tr style="border-top: 1px solid #1a1a1a;">
            <td style="padding: 6px 0; color: #888;">Platform & Input Mode</td>
            <td style="padding: 6px 0; font-weight: 600; color: #fff;">${platform || 'Unknown'} (${maxTouchPoints > 0 ? 'Touch' : 'Mouse/Keys'})</td>
          </tr>
          <tr style="border-top: 1px solid #1a1a1a;">
            <td style="padding: 6px 0; color: #888;">Languages</td>
            <td style="padding: 6px 0; font-weight: 600; color: #fff;">${languages.join(', ') || language || 'Unknown'}</td>
          </tr>
        </table>
      </div>

      <!-- Section 6: UTM Parameters (Attribution) -->
      ${renderUtmSection(utm)}

      <!-- Section 7: Technical Session Audit Details -->
      <div style="background: #121212; border-radius: 10px; border: 1px solid #1c1c1c; padding: 16px;">
        <p style="color: #aaa; font-size: 11px; font-weight: 600; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.8px;">🛠️ Session Audit Info</p>
        <div style="font-size: 11px; color: #888;">
          <p style="margin: 0 0 4px 0;"><span style="color: #555;">Session ID:</span> <span style="font-family: monospace; color: #aaa;">${sessionId}</span></p>
          <p style="margin: 0 0 4px 0;"><span style="color: #555;">Visitor IP:</span> <span style="font-family: monospace; color: #aaa;">${ip}</span></p>
          <p style="margin: 0 0 4px 0; line-height: 1.4;"><span style="color: #555;">User Agent:</span> <span style="color: #999; word-break: break-all;">${userAgent}</span></p>
        </div>
      </div>

      <p style="color: #444; font-size: 10px; margin: 20px 0 0 0; text-align: center;">Sent automatically from your portfolio tracking system</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      url,
      timestamp,
      userAgent,
      timezone: clientTimezone,
      maxTouchPoints = 0,
    } = body;

    // Get visitor IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown';

    // Vercel provides geo/timezone data for free via headers
    const country = req.headers.get('x-vercel-ip-country') || null;
    const city = req.headers.get('x-vercel-ip-city') || null;
    const region = req.headers.get('x-vercel-ip-country-region') || null;
    const ipTimezone = req.headers.get('x-vercel-ip-timezone') || null;
    const latitude = req.headers.get('x-vercel-ip-latitude') || null;
    const longitude = req.headers.get('x-vercel-ip-longitude') || null;

    const { browser, version, device, os } = parseUserAgent(userAgent || '', maxTouchPoints);

    console.log(`[Track] Visit from ${ip} (${country || 'local'}) to ${url} — ${browser} on ${device}`);

    if (isRateLimited(ip)) {
      console.log('[Track] Skipped (rate limited)');
      return NextResponse.json({ ok: true, skipped: true });
    }

    const locationParts = [city, region, country].filter(Boolean);
    const location = locationParts.length > 0 ? locationParts.join(', ') : 'Unknown';
    const mapsLink = latitude && longitude
      ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      : null;
    const coords = latitude && longitude ? `${latitude}, ${longitude}` : null;

    const visitorLocalTime = formatVisitorTime(timestamp, clientTimezone);
    const path = extractPath(url);

    const resend = getResend();
    if (!resend) {
      console.warn('[Track] RESEND_API_KEY not configured, skipping email delivery.');
      return NextResponse.json({ ok: true, skipped: true, reason: 'No API key' });
    }

    const emailHtml = buildEmailHtml({
      ...body,
      device,
      browser,
      version,
      os,
      ip,
      visitorLocalTime,
      location,
      ipTimezone,
      coords,
      mapsLink,
    });

    const result = await resend.emails.send({
      from: 'Portfolio Tracker <onboarding@resend.dev>',
      to: 'otmane.elbaghzaoui@gmail.com',
      subject: `🚀 Portfolio Visit — ${device} on ${path} from ${country || 'Unknown'}`,
      html: emailHtml,
    });

    console.log('[Track] Email sent successfully:', result);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Track] Email error:', error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
