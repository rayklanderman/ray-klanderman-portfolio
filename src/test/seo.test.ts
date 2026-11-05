// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { PRERENDER_ROUTES, SITEMAP_ROUTES, getRouteMeta, renderHeadTags, renderSitemap, serializeJsonLd, truncate } from '../seo/meta';

describe('route metadata', () => {
  it('gives every prerendered route a unique title and canonical URL', () => {
    const metas = PRERENDER_ROUTES.map(getRouteMeta);
    expect(new Set(metas.map((m) => m.title)).size).toBe(metas.length);
    expect(new Set(metas.map((m) => m.canonical)).size).toBe(metas.length);
    for (const m of metas) {
      expect(m.canonical).toMatch(/^https:\/\/rayklanderman\.is-a\.dev\//);
      expect(m.description.length).toBeGreaterThan(50);
      expect(m.description.length).toBeLessThanOrEqual(170);
    }
  });

  it('normalises trailing slashes', () => {
    expect(getRouteMeta('/projects/luminae/').canonical).toBe('https://rayklanderman.is-a.dev/projects/luminae');
  });

  it('marks the chat and unknown pages as noindex', () => {
    expect(getRouteMeta('/chat').robots).toMatch(/noindex/);
    expect(getRouteMeta('/nope').robots).toMatch(/noindex/);
    expect(getRouteMeta('/projects/does-not-exist').robots).toMatch(/noindex/);
  });

  it('describes the person truthfully in JSON-LD', () => {
    const person = getRouteMeta('/').jsonLd.find((n) => n['@type'] === 'Person')!;
    expect(person.jobTitle).toBe('Software & AI Engineer');
    expect(JSON.stringify(person)).toContain('linkedin.com/in/rayklanderman');
    expect(JSON.stringify(person)).not.toContain('Stanford');
    expect(JSON.stringify(person)).not.toMatch(/email|telephone/i);
  });

  it('adds breadcrumbs for project pages', () => {
    const types = getRouteMeta('/projects/eyesense').jsonLd.map((n) => n['@type']);
    expect(types).toEqual(['BreadcrumbList', 'CreativeWork']);
  });

  it('escapes markup in head tags and JSON-LD', () => {
    expect(serializeJsonLd([{ name: '</script><script>alert(1)</script>' }])).not.toContain('</script>');
    const html = renderHeadTags({ ...getRouteMeta('/'), title: 'A "quoted" <b>title</b>' });
    expect(html).toContain('<title>A "quoted" &lt;b&gt;title&lt;/b&gt;</title>');
    expect(html).toContain('content="A &quot;quoted&quot; &lt;b&gt;title&lt;/b&gt;"');
  });

  it('truncates long descriptions on a word boundary', () => {
    const out = truncate('word '.repeat(60), 50);
    expect(out.length).toBeLessThanOrEqual(50);
    expect(out.endsWith('…')).toBe(true);
  });

  it('lists only indexable routes in the sitemap', () => {
    const xml = renderSitemap('2026-01-01');
    expect(SITEMAP_ROUTES).not.toContain('/chat');
    expect(xml).toContain('<loc>https://rayklanderman.is-a.dev/projects/ai-health-chat</loc>');
    expect(xml).not.toContain('/chat');
  });
});
