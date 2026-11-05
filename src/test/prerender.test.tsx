// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { render, head, PRERENDER_ROUTES } from '../entry-server';

describe('prerendered HTML', () => {
  it('renders the home page content without JavaScript', () => {
    const html = render('/');
    expect(html).toContain('<h1');
    expect(html).toContain('Software &amp; AI Engineer');
    expect(html).toContain('href="/projects/ai-health-chat"');
    expect(html).toContain('id="contact"');
    expect(html).toContain('<label for="contact-email"');
  });

  it('renders every route with a single h1', () => {
    for (const route of PRERENDER_ROUTES) {
      const html = render(route);
      expect(html.match(/<h1[\s>]/g) ?? [], route).toHaveLength(1);
    }
  });

  it('never publishes contact details, GPA or credit counts', () => {
    for (const route of PRERENDER_ROUTES) {
      const html = render(route) + head(route);
      expect(html, route).not.toMatch(/mailto:|tel:/);
      expect(html, route).not.toMatch(/[\w.+-]+@[\w-]+\.(com|org|net|ke|io|dev)\b/);
      expect(html, route).not.toMatch(/GPA|3\.98|3\.95|\/\s*120/);
    }
  });

  it('opens external links safely', () => {
    const html = render('/');
    const targets = html.match(/<a [^>]*target="_blank"[^>]*>/g) ?? [];
    expect(targets.length).toBeGreaterThan(0);
    for (const tag of targets) expect(tag).toMatch(/rel="noopener noreferrer"/);
  });
});
