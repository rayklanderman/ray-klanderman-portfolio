/**
 * Canonical site-wide facts. Personal contact details (email, phone) deliberately
 * live nowhere in this codebase: enquiries and CV requests go through Formspree.
 */
export const SITE_URL = 'https://rayklanderman.is-a.dev';

export const PERSON = {
  name: 'Raymond Klanderman',
  displayName: 'Raymond (DevRay) Klanderman',
  alias: 'DevRay',
  title: 'Software & AI Engineer',
  supportingLine: 'Applied AI · Machine Learning · Agentic Systems · Cloud & Full-Stack Engineering',
  location: 'Nairobi, Kenya',
  portrait: '/images/profile1.webp',
  portraitFallback: '/images/profile1.png',
} as const;

export const LINKS = {
  github: 'https://github.com/rayklanderman',
  linkedin: 'https://www.linkedin.com/in/rayklanderman/',
  youtube: 'https://www.youtube.com/@RealDevRay',
  x: 'https://x.com/rayklanderman',
  medium: 'https://medium.com/@raymondklanderman',
  googleSkills: 'https://www.skills.google/public_profiles/5d88baf2-c5cf-40af-bc9e-e995812ff504',
  services: 'https://devray.qzz.io/',
  showcasePlaylist: 'https://www.youtube.com/playlist?list=PLJa0i7fpyLmA',
} as const;

/**
 * "My Projects in Action" playlist (owner-supplied, November 2026). Order and video IDs match
 * the playlist on YouTube. Thumbnails are self-hosted under /images/showcase so no Google
 * request is made until a visitor presses play.
 */
export const SHOWCASE = {
  playlistId: 'PLJa0i7fpyLmA',
  playlistTitle: 'My Projects in Action',
  videos: [
    { id: 'Ic3GXYO-cS0', title: 'AI Health Chat', project: 'ai-health-chat' },
    { id: 'xKE3hNbTLGs', title: 'Sauti Mtaani Nairobi', project: 'sauti-mtaani-nairobi' },
    { id: 'ODygWunOA6Y', title: 'Luminae', project: 'luminae' },
    { id: 's5Sktg34uC0', title: 'AutoResearcher', project: 'autoresearcher' },
  ],
} as const;

export const showcaseEmbedUrl = (videoId: string): string =>
  `https://www.youtube-nocookie.com/embed/${videoId}?list=${SHOWCASE.playlistId}&autoplay=1&rel=0&playsinline=1`;

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnnpbdzv';

/**
 * Public, ATS-friendly CV. Leave as `null` until an approved file is committed under
 * `public/` (e.g. '/cv/Raymond-Klanderman-CV.pdf'). While null, the site offers the
 * "Request CV" form instead of a download, so no stale or private CV is published.
 */
export const CV_PUBLIC_URL: string | null = null;

export const SOCIAL_PROFILES = [
  { label: 'GitHub', url: LINKS.github },
  { label: 'LinkedIn', url: LINKS.linkedin },
  { label: 'YouTube', url: LINKS.youtube },
  { label: 'X (Twitter)', url: LINKS.x },
  { label: 'Medium', url: LINKS.medium },
] as const;
