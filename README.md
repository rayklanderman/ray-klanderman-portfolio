# Raymond (DevRay) Klanderman — Portfolio

[![CI](https://github.com/rayklanderman/ray-klanderman-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/rayklanderman/ray-klanderman-portfolio/actions/workflows/ci.yml)

Source for **https://rayklanderman.is-a.dev/**, the portfolio of Raymond (DevRay) Klanderman, Software & AI Engineer (applied AI, machine learning, agentic systems, cloud and full-stack engineering).

The site presents featured AI and engineering projects with case-study pages, professional experience, education, credentials, technical writing, an AI assistant that answers questions about my work, and a contact form.

- GitHub: [rayklanderman](https://github.com/rayklanderman)
- LinkedIn: [raymondklanderman](https://www.linkedin.com/in/raymondklanderman/)

## Tech stack

| Area | Tools |
| --- | --- |
| App | React 18, TypeScript, React Router 6, SCSS |
| Build | Vite 7, static prerendering of every route (React SSR at build time), vite-plugin-pwa |
| i18n | i18next (English bundled; French and Dutch loaded on demand) |
| AI chat | Vercel serverless function (`api/chat.ts`) proxying Groq |
| Forms | Formspree (contact form and CV requests) |
| Tests | Vitest, Testing Library, jsdom |
| Hosting | Vercel |

## Getting started

Requires Node.js 20.19+ or 22.12+ (the version Vite 7 needs).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server (client-side rendering only) |
| `npm run lint` | ESLint, zero warnings allowed |
| `npm run typecheck` | TypeScript, no emit |
| `npm run test:run` | Run the test suite once |
| `npm run build` | Type check, client build, SSR build, prerender, sitemap |
| `npm run preview` | Serve the production build locally |

## Where the content lives

Edit content in these files rather than in components:

| Content | File |
| --- | --- |
| Name, links, Formspree endpoint, CV setting | `src/data/site.ts` |
| Projects and case studies | `src/data/projects.ts` |
| Professional roles and training | `src/data/experience.ts` |
| Technical expertise groups | `src/data/expertise.ts` |
| UI text, education, credentials, writing | `src/i18n/en.json` (plus `fr.json`, `nl.json`) |
| Page titles, descriptions, JSON-LD | `src/seo/meta.ts` |
| AI assistant facts and rules | `SYSTEM_PROMPT` in `api/chat.ts` |

Adding a project to `PROJECTS` automatically adds its card, its case-study page at `/projects/<slug>`, its prerendered HTML and its sitemap entry.

### Content rules

- Only publish facts that can be verified. Label the source of any metric (for example "README-reported" or "Public leaderboard").
- A repository link is shown only when `repo.visibility` is `'public'`; private repos display "Source private".
- No email address or phone number appears anywhere on the site. Visitors use the contact form or LinkedIn, and CVs are sent on request (`CV_PUBLIC_URL` is `null`).
- `src/data/data.test.ts` and `src/test/prerender.test.tsx` enforce several of these rules.

## How prerendering works

`npm run build` runs four steps:

1. `tsc` type check.
2. `vite build` produces the client bundle in `dist/`.
3. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` produces a Node render bundle.
4. `node scripts/prerender.mjs` renders every route in `PRERENDER_ROUTES` into static HTML (`dist/index.html`, `dist/chat/index.html`, `dist/projects/<slug>/index.html`, `dist/404.html`), injects per-route meta tags, writes `dist/sitemap.xml`, and deletes `dist-ssr/`.

Search engines and link previews therefore receive full content without running JavaScript. In the browser, `src/main.tsx` hydrates the prerendered HTML when it matches the current route, and otherwise renders from scratch.

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `GROQ_API_KEY` | Vercel project settings | Used by `api/chat.ts` on the server. Required for the AI assistant. |
| `VITE_GROQ_API_KEY` | `.env.local`, local development only | Lets `npm run dev` call Groq directly without the serverless function. Never set this in production; `VITE_` variables are visible to the browser. |

No other secrets are needed to build the site.

## Deployment

Vercel deploys from `main` using `vercel.json`:

- Build command `npm run build`, output directory `dist`.
- Rewrites map `/projects/:slug` and `/chat` to their prerendered HTML. Unknown paths return `404.html` with a real 404 status.
- Long-term caching for hashed `/assets`, plus security headers.

Checklist for a release:

1. `npm run lint && npm run typecheck && npm run test:run && npm run build`
2. Optionally `npm run preview` and check the home page, a case study, `/chat` and the contact form.
3. Push to `main`. CI (`.github/workflows/ci.yml`) runs the same checks, and Vercel deploys.
4. After deploying, confirm that `/sitemap.xml` loads and a case-study URL returns 200.

## Project structure

```
api/chat.ts              Serverless AI chat endpoint (system prompt, input limits, rate limit)
scripts/prerender.mjs    Build-time prerender and sitemap
src/components/          Page sections, header, footer, chat page, dialogs
src/data/                Typed content registry (projects, experience, expertise, site)
src/i18n/                i18next setup and translations
src/pages/               Home, project case study, 404
src/seo/                 Route metadata, JSON-LD, sitemap, head sync
src/services/            Formspree and Groq clients
src/styles/              Design tokens and shared styles
src/test/                SEO, prerender, chat API and component tests
public/                  Static assets (images, badges, icons, robots.txt, manifest)
```
