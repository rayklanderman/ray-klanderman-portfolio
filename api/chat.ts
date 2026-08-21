import type { IncomingMessage, ServerResponse } from 'node:http';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

// Simple in-memory per-IP rate limiting (resets on cold start — fine for a portfolio)
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, { count: number; resetAt: number }>();

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

function send(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function readJsonBody(req: IncomingMessage): Promise<{ messages?: ChatMessage[] }> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk: Buffer) => {
      data += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed' });
  }

  // Rate limit per IP
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || record.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    record.count += 1;
    if (record.count > MAX_PER_WINDOW) {
      return send(res, 429, { error: 'Too many requests. Please try again later.' });
    }
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return send(res, 500, { error: 'Chat service is not configured.' });
  }

  const body = await readJsonBody(req);
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return send(res, 400, { error: 'messages is required' });
  }

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: body.messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error('Groq API error:', groqRes.status, err);
      return send(res, 502, { error: 'Upstream AI service error.' });
    }

    const data = await groqRes.json();
    const content = data.choices?.[0]?.message?.content;
    return send(res, 200, { content: content || 'No response generated.' });
  } catch (err) {
    console.error('Groq proxy error:', err);
    return send(res, 500, { error: 'Could not reach the AI service.' });
  }
}
