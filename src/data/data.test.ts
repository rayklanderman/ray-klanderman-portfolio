// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  PROJECTS,
  CATEGORY_ORDER,
  adjacentProjects,
  categoriesInUse,
  featuredProjects,
  getProjectBySlug,
  publicRepoUrl,
} from './projects';
import { ROLES, TRAINING } from './experience';
import { EXPERTISE } from './expertise';
import { CV_PUBLIC_URL, LINKS } from './site';

const OWNER_LIVE_URLS: Record<string, string> = {
  'ai-health-chat': 'https://aihealthchat.qzz.io/',
  tutalearn: 'https://tutalearn.qzz.io/',
  luminae: 'https://luminae.qzz.io/',
  postshifterpro: 'https://postshifterpro.qzz.io/',
  'live-interviewer': 'https://liveinterviewer.vercel.app/',
  'sauti-mtaani-nairobi': 'https://www.sautimtaani.site/',
  'kazi-connect': 'https://kazi-connect.vercel.app/',
};

const PRIVATE_REPO_NAMES = ['ai-health-chat', 'tutalearn', 'Serenity-AI', 'live-interviewer', 'kazi-connect', 'UrbanSpark'];
const PRIVATE_REPO_PATHS = [
  ...PRIVATE_REPO_NAMES.map((name) => `github.com/rayklanderman/${name}`),
  'github.com/RealDevRay/Sauti-Mtaani-Nairobi',
];

describe('project registry', () => {
  it('has unique, URL-safe slugs', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('features exactly six flagship projects in the agreed order', () => {
    expect(featuredProjects().map((p) => p.slug)).toEqual([
      'ai-health-chat',
      'eyesense',
      'movie-recommendation',
      'sauti-mtaani-nairobi',
      'tutalearn',
      'luminae',
    ]);
  });

  it('keeps every owner-confirmed live URL on the right project', () => {
    for (const [slug, url] of Object.entries(OWNER_LIVE_URLS)) {
      expect(getProjectBySlug(slug)?.liveUrl).toBe(url);
    }
  });

  it('uses only https links and no placeholders', () => {
    for (const p of PROJECTS) {
      for (const url of [p.liveUrl, p.videoUrl, p.repo.url].filter(Boolean) as string[]) {
        expect(url).toMatch(/^https:\/\//);
        expect(url).not.toContain('#');
      }
    }
  });

  it('never exposes a repository URL unless the repo is public', () => {
    for (const p of PROJECTS) {
      if (p.repo.visibility !== 'public') {
        expect(p.repo.url).toBeUndefined();
        expect(publicRepoUrl(p)).toBeUndefined();
      }
      const serialised = JSON.stringify(p);
      for (const repoPath of PRIVATE_REPO_PATHS) {
        expect(serialised).not.toContain(repoPath);
      }
    }
  });

  it('gives every project an explicit role', () => {
    for (const p of PROJECTS) {
      expect(p.role, p.slug).toMatch(/engineer/i);
    }
  });

  it('has no APK or Play Store links', () => {
    expect(JSON.stringify(PROJECTS)).not.toMatch(/\.apk|play\.google\.com/i);
  });

  it('labels the source of every reported result', () => {
    for (const p of PROJECTS) {
      for (const r of p.caseStudy.results ?? []) {
        expect(r.source.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('describes the leaderboard RMSE as a public-leaderboard figure', () => {
    const mrp = getProjectBySlug('movie-recommendation')!;
    const rmse = mrp.caseStudy.results!.find((r) => r.value === '0.82')!;
    expect(rmse.source).toMatch(/public leaderboard/i);
  });

  it('avoids banned or unsupported claims', () => {
    const text = JSON.stringify(PROJECTS).toLowerCase();
    for (const phrase of ['clinically validated diagnostic', 'enterprise-grade', 'secure by design', 'hallucination-free', 'no automated test']) {
      expect(text).not.toContain(phrase);
    }
    expect(getProjectBySlug('luminae')!.award).toBeUndefined();
  });

  it('only shows category filters that have projects', () => {
    expect(categoriesInUse(PROJECTS)).toEqual(CATEGORY_ORDER);
    expect(categoriesInUse([getProjectBySlug('movie-recommendation')!])).toEqual(['ml']);
  });

  it('links previous and next projects in display order', () => {
    expect(adjacentProjects('ai-health-chat').prev).toBeUndefined();
    expect(adjacentProjects('ai-health-chat').next?.slug).toBe('eyesense');
    expect(adjacentProjects('unknown')).toEqual({});
  });
});

describe('profile data', () => {
  it('keeps training separate from professional roles', () => {
    expect(ROLES.map((r) => r.organisation)).not.toContain('ALX Africa');
    expect(TRAINING.map((r) => r.organisation)).toEqual(['ALX Africa', 'Power Learn Project']);
  });

  it('does not extend the Nairobi Woman Representative role beyond 2024', () => {
    const nwr = ROLES.find((r) => r.id === 'nwr')!;
    expect(nwr.period).toBe('2017 – 2024');
  });

  it('links related projects that exist', () => {
    for (const entry of [...ROLES, ...TRAINING]) {
      for (const slug of entry.relatedProjects ?? []) {
        expect(getProjectBySlug(slug)).toBeDefined();
      }
    }
  });

  it('does not list unverified vector databases or frameworks', () => {
    const skills = EXPERTISE.flatMap((g) => g.skills).join(' ');
    for (const tool of ['Pinecone', 'Weaviate', 'Qdrant', 'LangChain', 'LlamaIndex']) {
      expect(skills).not.toContain(tool);
    }
  });

  it('uses the correct LinkedIn profile and no public CV until one is approved', () => {
    expect(LINKS.linkedin).toBe('https://www.linkedin.com/in/raymondklanderman/');
    expect(CV_PUBLIC_URL).toBeNull();
  });
});
