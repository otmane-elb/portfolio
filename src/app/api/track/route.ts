import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (resets on cold start, which is fine for Vercel)
const recentVisits = new Map<string, number>();
const COOLDOWN_MS = 30_000; // 30 seconds between emails from same IP

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, timestamp, userAgent, referrer } = body;

    // Get visitor IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown';

    // Rate limit: skip if same IP visited recently
    const lastVisit = recentVisits.get(ip);
    if (lastVisit && Date.now() - lastVisit < COOLDOWN_MS) {
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

    await resend.emails.send({
      from: 'Portfolio Tracker <onboarding@resend.dev>',
      to: 'otmaneelbaghazaoui@gmail.com',
      subject: '🚀 Portfolio Visit',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; background: #0a0a0a; border-radius: 12px; border: 1px solid #262626;">
          <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 20px;">🚀 Portfolio Visit</h2>
          
          <div style="background: #171717; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Page</p>
            <p style="color: #ffffff; font-size: 14px; margin: 0;"><a href="${url}" style="color: #818cf8; text-decoration: none;">${url}</a></p>
          </div>

          <div style="background: #171717; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Time</p>
            <p style="color: #ffffff; font-size: 14px; margin: 0;">${new Date(timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
          </div>

          ${referrer ? `
          <div style="background: #171717; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Referrer</p>
            <p style="color: #ffffff; font-size: 14px; margin: 0;">${referrer}</p>
          </div>
          ` : ''}

          <div style="background: #171717; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
            <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">User Agent</p>
            <p style="color: #d4d4d4; font-size: 12px; margin: 0; word-break: break-all;">${userAgent}</p>
          </div>

          <div style="background: #171717; border-radius: 8px; padding: 16px;">
            <p style="color: #a3a3a3; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Visitor IP</p>
            <p style="color: #ffffff; font-size: 14px; margin: 0;">${ip}</p>
          </div>

          <p style="color: #525252; font-size: 11px; margin: 20px 0 0 0; text-align: center;">Sent automatically from your portfolio</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Tracking email error:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
