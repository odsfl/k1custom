interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  ENVIRONMENT?: string;
}

const ALLOWED_ORIGINS = [
  'https://k-1custom.com',
  'https://www.k-1custom.com',
  'https://k1custom-site.pages.dev',
];

const stripCRLF = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Strict email regex — rejects CRLF, header-injection chars, and bad TLDs
const EMAIL_RE = /^[^\s@<>",;\r\n]+@[^\s@<>",;\r\n]+\.[^\s@<>",;\r\n]{2,}$/;

// Lightweight in-memory rate limiter using Cloudflare Cache API
const RATE_LIMIT_MAX = 5; // requests
const RATE_LIMIT_WINDOW = 60_000; // ms

async function checkRateLimit(ip: string): Promise<boolean> {
  const cache = (caches as any).default;
  const key = new Request(`https://rl.local/contact/${ip}`);
  const hit = await cache.match(key);
  let count = 0;
  if (hit) {
    try {
      count = parseInt(await hit.text(), 10) || 0;
    } catch {}
  }
  if (count >= RATE_LIMIT_MAX) return false;
  const next = new Response(String(count + 1), {
    headers: { 'Cache-Control': `max-age=${Math.ceil(RATE_LIMIT_WINDOW / 1000)}` },
  });
  await cache.put(key, next);
  return true;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin') ?? '';
  const referer = request.headers.get('referer') ?? '';
  let refererOrigin = '';
  try {
    refererOrigin = referer ? new URL(referer).origin : '';
  } catch {}

  // Env-driven dev mode (not attacker-controlled via headers)
  const isDev = env.ENVIRONMENT === 'dev';
  if (!isDev && !ALLOWED_ORIGINS.includes(origin) && !ALLOWED_ORIGINS.includes(refererOrigin)) {
    return Response.json({ error: 'Forbidden.' }, { status: 403 });
  }

  // Rate limit by IP
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  if (!(await checkRateLimit(ip))) {
    return Response.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
  }

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { name = '', email = '', phone = '', message = '', company = '' } = body;
  if (company.trim()) return Response.json({ ok: true }, { status: 200 });
  if (!name.trim() || !email.trim() || !message.trim()) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  const cleanEmail = stripCRLF(email);
  if (!EMAIL_RE.test(cleanEmail)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (name.length > 200 || cleanEmail.length > 200 || phone.length > 50 || message.length > 5000) {
    return Response.json({ error: 'Submission too large.' }, { status: 400 });
  }

  const to = env.CONTACT_TO_EMAIL || 'konecustom@gmail.com';
  const from = env.CONTACT_FROM_EMAIL || 'K-1 Custom Website <onboarding@resend.dev>';
  const subject = `New inquiry from ${stripCRLF(name)} - k-1custom.com`;

  const html = `
    <h2 style="font-family:Arial,sans-serif;color:#1E2858;">New Website Inquiry</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;color:#161E42;border-collapse:collapse;">
      <tr><td style="padding:6px 12px;font-weight:bold;">Name:</td><td style="padding:6px 12px;">${esc(name)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Email:</td><td style="padding:6px 12px;">${esc(cleanEmail)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Phone:</td><td style="padding:6px 12px;">${esc(phone || 'Not provided')}</td></tr>
    </table>
    <h3 style="font-family:Arial,sans-serif;color:#1E2858;margin-top:24px;">Message</h3>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#161E42;white-space:pre-wrap;">${esc(message)}</p>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: cleanEmail,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    console.error('Resend error:', res.status, err);
    return Response.json({ error: 'Could not send message. Please call us.' }, { status: 502 });
  }

  return Response.json({ ok: true });
};
