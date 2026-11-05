import { PERSON, LINKS, SITE_URL } from '../data/site';
import { PROJECTS, Project, getProjectBySlug, projectPath, CATEGORY_LABELS } from '../data/projects';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: 'website' | 'article' | 'profile';
  image: string;
  imageAlt: string;
  jsonLd: Record<string, unknown>[];
}

const SITE_NAME = PERSON.name;
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_IMAGE_ALT = 'Raymond (DevRay) Klanderman, Software & AI Engineer, with a gold RK monogram';
const INDEX = 'index, follow, max-image-preview:large, max-snippet:-1';
const NOINDEX = 'noindex, follow';

const HOME_TITLE = 'Raymond (DevRay) Klanderman | Software & AI Engineer';
const HOME_DESCRIPTION =
  'Software & AI engineer in Nairobi building applied AI end to end, full stack to models, for healthcare, education, accessibility and civic participation.';

export const NOT_FOUND_PATH = '/404';

/** Routes written to static HTML at build time. */
export const PRERENDER_ROUTES: string[] = ['/', '/chat', ...PROJECTS.map((p) => projectPath(p.slug))];

/** Routes listed in sitemap.xml (indexable pages only). */
export const SITEMAP_ROUTES: string[] = ['/', ...PROJECTS.map((p) => projectPath(p.slug))];

export const normalizePath = (pathname: string): string => {
  const clean = pathname.split(/[?#]/)[0] || '/';
  return clean.length > 1 ? clean.replace(/\/+$/, '') : '/';
};

const absolute = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

export const truncate = (text: string, max = 158): string => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '')}…`;
};

const PERSON_ID = `${SITE_URL}/#person`;

const personSchema = (): Record<string, unknown> => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON.name,
  alternateName: ['DevRay', 'Ray Klanderman'],
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/images/profile1.png`,
  jobTitle: PERSON.title,
  description:
    'Software and AI engineer who builds applied AI products end to end, as both full-stack and AI engineer, for healthcare, education, accessibility and civic participation.',
  address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
  sameAs: [LINKS.github, LINKS.linkedin, LINKS.youtube, LINKS.x, LINKS.medium, LINKS.googleSkills],
  alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Management University of Africa' }],
  knowsAbout: [
    'Applied artificial intelligence',
    'Machine learning',
    'Large language models',
    'Multi-agent systems',
    'Recommender systems',
    'Full-stack web development',
    'Flutter',
    'Google Cloud',
  ],
  award: ['1st place, Power Learn Project Class of 2024 graduate hackathon (2024)'],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Cloud Certified Professional Cloud Architect',
      credentialCategory: 'Professional certification',
      recognizedBy: { '@type': 'Organization', name: 'Google Cloud' },
      url: 'https://www.credly.com/badges/1eb3782a-a4cf-42b9-859c-80ab36498448',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
      credentialCategory: 'Professional certification',
      recognizedBy: { '@type': 'Organization', name: 'Oracle' },
      url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=7418DAC9DB558E4572B75960D015FF4F8AC815414D000F75011C3391E0103A33',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Kubernetes and Cloud Native Associate (KCNA)',
      credentialCategory: 'Professional certification',
      recognizedBy: { '@type': 'Organization', name: 'The Linux Foundation' },
      url: 'https://www.credly.com/badges/565da7e7-3a27-4327-a1d8-af11b3e62362',
    },
  ],
});

const websiteSchema = (): Record<string, unknown> => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
});

const projectSchemas = (project: Project): Record<string, unknown>[] => {
  const url = absolute(projectPath(project.slug));
  const work: Record<string, unknown> = {
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    name: project.name,
    headline: `${project.name}: ${project.tagline}`,
    description: project.summary,
    url,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    keywords: [...project.categories.map((c) => CATEGORY_LABELS[c]), ...project.techStack].join(', '),
    inLanguage: 'en',
  };
  const sameAs = [project.liveUrl, project.repo.visibility === 'public' ? project.repo.url : undefined].filter(
    Boolean,
  );
  if (sameAs.length > 0) work.sameAs = sameAs;
  if (project.videoUrl) work.video = { '@type': 'VideoObject', name: `${project.name} demo`, url: project.videoUrl };

  return [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/#projects` },
        { '@type': 'ListItem', position: 3, name: project.name, item: url },
      ],
    },
    work,
  ];
};

export function getRouteMeta(pathname: string): RouteMeta {
  const path = normalizePath(pathname);
  const base = { image: OG_IMAGE, imageAlt: OG_IMAGE_ALT };

  if (path === '/') {
    return {
      ...base,
      path,
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      canonical: absolute('/'),
      robots: INDEX,
      ogType: 'profile',
      jsonLd: [
        personSchema(),
        websiteSchema(),
        {
          '@type': 'ProfilePage',
          '@id': `${SITE_URL}/#profilepage`,
          url: `${SITE_URL}/`,
          name: HOME_TITLE,
          mainEntity: { '@id': PERSON_ID },
          isPartOf: { '@id': `${SITE_URL}/#website` },
        },
      ],
    };
  }

  if (path === '/chat') {
    return {
      ...base,
      path,
      title: `Ask about Raymond’s work (AI chat) | ${SITE_NAME}`,
      description:
        'An AI assistant that answers questions about Raymond Klanderman’s projects, skills and experience, based on his published portfolio.',
      canonical: absolute('/chat'),
      robots: NOINDEX,
      ogType: 'website',
      jsonLd: [],
    };
  }

  const match = /^\/projects\/([^/]+)$/.exec(path);
  const project = match ? getProjectBySlug(match[1]) : undefined;
  if (project) {
    return {
      ...base,
      path,
      title: `${project.name}: ${project.featured ? 'Case Study' : 'Project'} | ${SITE_NAME}`,
      description: truncate(project.summary),
      canonical: absolute(path),
      robots: INDEX,
      ogType: 'article',
      jsonLd: projectSchemas(project),
    };
  }

  return {
    ...base,
    path,
    title: `Page not found | ${SITE_NAME}`,
    description: 'This page does not exist. Browse Raymond Klanderman’s projects and case studies instead.',
    canonical: absolute('/'),
    robots: 'noindex, nofollow',
    ogType: 'website',
    jsonLd: [],
  };
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeText = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Serialises JSON-LD so it can never close the surrounding <script> element. */
export const serializeJsonLd = (graph: Record<string, unknown>[]): string =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');

/** Head tags for the prerendered HTML (between the seo:start/seo:end markers). */
export function renderHeadTags(meta: RouteMeta): string {
  const tags = [
    `<title>${escapeText(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="${meta.robots}" />`,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:type" content="${meta.ogType}" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(meta.image)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeAttr(meta.imageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(meta.image)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(meta.imageAlt)}" />`,
  ];
  if (meta.jsonLd.length > 0) {
    tags.push(`<script type="application/ld+json">${serializeJsonLd(meta.jsonLd)}</script>`);
  }
  return tags.join('\n    ');
}

/** sitemap.xml contents for the indexable routes. */
export function renderSitemap(lastmod: string): string {
  const urls = SITEMAP_ROUTES.map(
    (route) =>
      `  <url>\n    <loc>${absolute(route)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
