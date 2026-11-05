import { FORMSPREE_ENDPOINT } from '../data/site';

export interface FormspreePayload {
  [field: string]: string;
  /** Honeypot: real visitors never fill this in. */
  _gotcha: string;
}

export interface FormspreeResult {
  ok: boolean;
  /** User-safe error text from Formspree, if any. */
  message?: string;
}

/**
 * Posts a form to Formspree. If the honeypot is filled the request is skipped and
 * reported as successful, so automated submissions get no signal.
 */
export async function submitToFormspree(payload: FormspreePayload): Promise<FormspreeResult> {
  if (payload._gotcha) {
    return { ok: true };
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.ok) return { ok: true };

    let message: string | undefined;
    try {
      const data = (await response.json()) as { errors?: { message?: string }[]; error?: string };
      message = data.errors?.map((e) => e.message).filter(Boolean).join(' ') || data.error;
    } catch {
      message = undefined;
    }
    return { ok: false, message };
  } catch {
    return { ok: false };
  }
}
