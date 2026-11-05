const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Sends the visible conversation to the serverless proxy (/api/chat). The proxy owns the
 * system prompt and the Groq key; the browser only ever sends user/assistant turns.
 */
export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.content || 'No response generated.';
    }

    if (res.status === 429) {
      return 'You are sending messages too quickly. Please wait a moment and try again.';
    }
    if (res.status === 400 || res.status === 413) {
      return 'That message could not be sent. Please try a shorter question.';
    }
  } catch {
    // proxy unavailable (e.g. `vite dev` without the Vercel runtime); fall back below
  }

  // Local-development fallback only. `import.meta.env.DEV` is false in production builds,
  // so this branch (and the key) never ships.
  if (import.meta.env.DEV) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (apiKey && apiKey !== 'your_groq_api_key_here') {
      try {
        const { SYSTEM_PROMPT, sanitizeMessages } = await import('../../api/chat');
        const safe = sanitizeMessages(messages) ?? [];
        const res = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...safe],
            temperature: 0.5,
            max_tokens: 600,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          return data.choices?.[0]?.message?.content || 'No response generated.';
        }
        console.error('Groq API error:', res.status);
        return 'Sorry, I encountered an error. Please try again later.';
      } catch (err) {
        console.error('Groq fetch error:', err);
        return 'Sorry, I could not reach the AI service. Please try again.';
      }
    }
  }

  return "I'm currently unavailable. Please try again later.";
}
