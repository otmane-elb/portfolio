import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (resets on cold start, which is fine for Vercel)
const recentVisits = new Map<string, number>();
const COOLDOWN_MS = 30_000; // 30 seconds between emails from same IP

// Parse browser & device from user agent
function parseUserAgent(ua: string) {
  let browser = 'Unknown';
  let device = 'Desktop';

  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/OPR|Opera/i.test(ua)) browser = 'Opera';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';

  if (/Mobile|Android|iPhone|iPad/i.test(ua)) device = 'Mobile';
  if (/iPad|Tablet/i.test(ua)) device = 'Tablet';

  let os = 'Unknown';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Mac OS/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/iPhone|iPad/i.test(ua)) os = 'iOS';

  return { browser, device, os };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, timestamp, userAgent, referrer, screenWidth, screenHeight, language, platform } = body;

    // Get visitor IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown';

    // Vercel provides geo data for free via headers
    const country = req.headers.get('x-vercel-ip-country') || null;
    const city = req.headers.get('x-vercel-ip-city') || null;
    const region = req.headers.get('x-vercel-ip-country-region') || null;

    const { browser, device, os } = parseUserAgent(userAgent || '');

    console.log(`[Track] Visit from ${ip} (${country || 'local'}) to ${url} — ${browser} on ${device}`);

    // Rate limit: skip if same IP visited recently
    const lastVisit = recentVisits.get(ip);
    if (lastVisit && Date.now() - lastVisit < COOLDOWN_MS) {
      console.log(`[Track] Skipped (rate limited)`);
      return NextResponse.json({ ok: true, skipped: true });
    }
    recentVisits.set(ip, Date.now());

    // Clean up old entries to prevent memory leak
    if (recentVisits.size > 1000) {
      const now = Date.now();
      for (const [key, time] of recentVisits) {
        if (now - time > COOLDOWN_MS) recentVisits.delete(key);
      }
    }

    // Build location string
    const locationParts = [city, region, country].filter(Boolean);
    const location = locationParts.length > 0 ? locationParts.join(', ') : null;

    const result = await resend.emails.send({
      from: 'Portfolio Tracker <onboarding@resend.dev>',
      to: 'otmane.elbaghzaoui@gmail.com',
      subject: `🚀 Portfolio Visit — ${device} from ${country || 'Unknown'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #0a0a0a; border-radius: 12px; border: 1px solid #262626;">
          <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 20px;">🚀 Portfolio Visit</h2>
          
          <div style="background: #171717; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Page</p>
            <p style="color: #ffffff; font-size: 14px; margin: 0;"><a href="${url}" style="color: #818cf8; text-decoration: none;">${url}</a></p>
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <div style="flex: 1; background: #171717; border-radius: 8px; padding: 16px;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Time</p>
              <p style="color: #ffffff; font-size: 14px; margin: 0;">${new Date(timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
            </div>
            ${location ? `
            <div style="flex: 1; background: #171717; border-radius: 8px; padding: 16px;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">📍 Location</p>
              <p style="color: #ffffff; font-size: 14px; margin: 0;">${location}</p>
            </div>
            ` : ''}
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <div style="flex: 1; background: #171717; border-radius: 8px; padding: 16px;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">🖥 Device</p>
              <p style="color: #ffffff; font-size: 14px; margin: 0;">${device}</p>
            </div>
            <div style="flex: 1; background: #171717; border-radius: 8px; padding: 16px;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">🌐 Browser</p>
              <p style="color: #ffffff; font-size: 14px; margin: 0;">${browser}</p>
            </div>
            <div style="flex: 1; background: #171717; border-radius: 8px; padding: 16px;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">💻 OS</p>
              <p style="color: #ffffff; font-size: 14px; margin: 0;">${os}</p>
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 12px;">
            <div style="flex: 1; background: #171717; border-radius: 8px; padding: 16px;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">📐 Screen</p>
              <p style="color: #ffffff; font-size: 14px; margin: 0;">${screenWidth || '?'}×${screenHeight || '?'}</p>
            </div>
            <div style="flex: 1; background: #171717; border-radius: 8px; padding: 16px;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">🗣 Language</p>
              <p style="color: #ffffff; font-size: 14px; margin: 0;">${language || 'Unknown'}</p>
            </div>
            <div style="flex: 1; background: #171717; border-radius: 8px; padding: 16px;">
              <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">🌍 IP</p>
              <p style="color: #ffffff; font-size: 14px; margin: 0;">${ip}</p>
            </div>
          </div>

          ${referrer ? `
          <div style="background: #171717; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">🔗 Referrer</p>
            <p style="color: #ffffff; font-size: 14px; margin: 0;">${referrer}</p>
          </div>
          ` : ''}

          <details style="background: #171717; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <summary style="color: #a3a3a3; font-size: 12px; cursor: pointer; text-transform: uppercase; letter-spacing: 1px;">Full User Agent</summary>
            <p style="color: #d4d4d4; font-size: 11px; margin: 8px 0 0 0; word-break: break-all;">${userAgent}</p>
          </details>

          <p style="color: #525252; font-size: 11px; margin: 20px 0 0 0; text-align: center;">Sent automatically from your portfolio</p>
        </div>
      `,
    });

    console.log(`[Track] Email sent successfully:`, result);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Track] Email error:', error);
    return NextResponse.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
