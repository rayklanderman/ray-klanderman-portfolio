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

  it('never publishes contact details or outdated academic figures', () => {
    for (const route of PRERENDER_ROUTES) {
      const html = render(route) + head(route);
      expect(html, route).not.toMatch(/mailto:|tel:/);
      expect(html, route).not.toMatch(/[\w.+-]+@[\w-]+\.(com|org|net|ke|io|dev)\b/);
      expect(html, route).not.toMatch(/3\.95|\b(21|45)\s*(\/|of)\s*120/);
    }
  });

  it('shows the current University of the People record on the home page', () => {
    const html = render('/');
    expect(html).toContain('Cumulative GPA 3.98; 57 of 120 credits earned (as of September 2026)');
    expect(html).toContain('President’s List');
  });

  it('opens external links safely', () => {
    const html = render('/');
    const targets = html.match(/<a [^>]*target="_blank"[^>]*>/g) ?? [];
    expect(targets.length).toBeGreaterThan(0);
    for (const tag of targets) expect(tag).toMatch(/rel="noopener noreferrer"/);
  });

  it('puts the headline and key results in the crawlable HTML', () => {
    const home = render('/');
    expect(home).toContain('Building AI systems that solve real-world problems.');
    expect(home).toContain('RMSE 0.82');
    expect(home).toContain('Human-reviewed AI');
    const caseStudy = render('/projects/eyesense');
    expect(caseStudy).toContain('Offline OCR');
    expect(caseStudy).toContain('Engineering highlights');
  });
});
