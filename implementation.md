# Implementation Plan — Portfolio Redesign & Hardening

**Target:** `rayklanderman.is-a.dev` (React 18 + Vite 7 + TypeScript + SCSS + i18n + PWA)
**Scope:** Editorial redesign ("Forest-Ink" identity), content restructure (flagship dossiers, Writing section, tiered badges), plus bug fixes and platform hardening found during the codebase audit.

Follow the phases **strictly in order**. Each phase ends with verification criteria. Do not start a phase until the previous one passes.

---

## Content Ray Must Supply (collect before Phase 5–6, doesn't block Phases 0–4)

| Item | Needed for | Placeholder until supplied |
|---|---|---|
| LinkedIn Pulse URL: "Code Review Is the Firewall Against AI Slop" (Mar 2026) | Writing section | `#` |
| LinkedIn Pulse URL: "Code Utopia in 2026: The Four Pillars of Production-Ready Code" (Jan 2026) | Writing section | `#` |
| AI Health Chat verified metrics (5 languages? conversation counts?) | Flagship dossier | omit unverified metrics |
| Real screenshots of flagship apps (AI Health Chat, Luminae) | Dossier cards | text-only dossiers |
| Live Interviewer & Content Shapeshifter public URLs (currently `"#"`) | Secondary grid | GitHub link only |

---

## Design Tokens Reference (used across all phases)

### Palette

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#10231C` | Deep Forest-Ink — dark background |
| `--parchment` | `#F4F4F0` | Parchment — light background / text on dark |
| `--gold` | `#C99A3B` | Gold-Ochre — accents, wax seals, section rules |
| `--live` | `#00E599` | Signal-Teal — `● LIVE` status only |
| `--ink-raised` | `#17312A` | Card surface on dark |
| `--ink-border` | `#2A473D` | Borders/dividers on dark |
| `--parchment-raised` | `#FFFFFF` | Card surface on light |
| `--parchment-border` | `#DDDCD3` | Borders/dividers on light |
| `--text-muted-dark` | `#9DB4AA` | Muted text on dark |
| `--text-muted-light` | `#5B6660` | Muted text on light |

**Theme mapping:** the existing light/dark toggle is kept. Forest-Ink becomes the **dark theme and the default**; the light theme is Parchment background with Forest-Ink text. Gold-Ochre and Signal-Teal are shared accents. All Kenya/Netherlands flag variables are removed.

**Contrast rules:** Gold-Ochre on Forest-Ink passes WCAG AA only at large sizes/bold — use it for headings, seals, borders, and icons, never for small body text. Signal-Teal is reserved exclusively for live-status indicators so it retains meaning.

### Typography

| Family | Usage | Weights to load |
|---|---|---|
| Fraunces (serif) | `h1–h3`, section titles, dossier names | 600, 700 |
| IBM Plex Sans | body, nav, buttons | 400, 500, 600 |
| IBM Plex Mono | tech tags, dates, status lines, metrics | 400, 500 |

Load via Google Fonts with `display=swap`, one combined `<link>`, weights limited to the above (three families is already a perf cost — do not load more weights).

---

## Phase 0 — Repo Hygiene & Bug Fixes (do first, no visual changes)

These are defects found in the audit. Fixing them first gives a clean base so redesign diffs stay reviewable.

### 0.1 Remove junk from the repo
1. Delete `test.txt`.
2. Delete `public/# Code Citations.md` (leaked editor artifact, publicly served from `public/`).
3. Remove `dev-dist/` from git tracking: `git rm -r --cached dev-dist` and add `dev-dist` to `.gitignore` (it is vite-plugin-pwa dev output).

### 0.2 Fix `package.json` identity
- `name`: `ray-klanderman-portfolio`, `version`: `1.0.0`.

### 0.3 Fix duplicate ToastContainer (`src/App.tsx`)
- `<ToastContainerWithTheme />` is rendered twice — once inside `AppContent` (line 49) and once in `App` (line 58). Every toast currently fires twice. **Keep only the one inside `AppContent`** (it's inside the router and ThemeProvider); delete the one in `App`.

### 0.4 Fix suppressed live URLs (`src/components/Projects.tsx` + `src/i18n/*.json`)
- `getProjectUrl` returns `project.url || projectData[key]?.url` — but `liveInterviewer` has `"url": "#"` in `en.json`, which is truthy, so its real live URL (`https://live-interviewer-sepia.vercel.app/`) in `projectData` is never reached and the View Live button is hidden.
- **Fix:** treat `"#"` as absent: `const url = project.url && project.url !== '#' ? project.url : projectData[key]?.url;`. Remove `"url": "#"` entries from all three locale files.

### 0.5 Fix broken PWA manifest icon (`vite.config.ts`)
- Manifest references `favicon.svg`, which does not exist in `public/` — the installed-app icon is broken. Point icons at `/logo.png` with `sizes: '512x512', type: 'image/png'` (add a 192px entry reusing the same file or generate one with `sharp`, already a devDependency).
- `theme_color` is `#34C759` (matches nothing). Set to `#10231C` now (anticipating Phase 1). Do the same for `<meta name="theme-color">` in `index.html`.

### 0.6 Delete dead data
- In `Projects.tsx`, the `image:` fields in `projectData` are Unsplash URLs that are **never rendered** by the component. Remove them (real screenshots come in Phase 4 if supplied).

### 0.7 Sync the stale AI-chat system prompt (`src/services/groq.ts`)
The prompt contradicts the site:
- MRP 2026 described as "XGBoost … ~0.92 RMSE" — site says **Hybrid LightGBM on 50-factor SVD, RMSE ~0.82**. Update.
- Portfolio URL listed as `rayklanderman.github.io/...` — change to `https://rayklanderman.is-a.dev/`.
- Services site listed as `devray.site` — change to `https://devray.qzz.io/` (see Phase 2.1).

**Verify Phase 0:** `npm run lint && npm run build` pass; toasts fire once; Live Interviewer shows a View Live button; `git status` clean of junk files.

---

## Phase 1 — Design System Foundation

### 1.1 Fonts (`index.html`)
1. Replace the Outfit `<link>` with:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
   ```
2. Keep both `preconnect` hints.

### 1.2 Rebuild token layer (`src/styles/main.scss`)
1. Delete the Kenya/Netherlands SCSS variables block entirely.
2. Define the palette table above as SCSS constants, then map into CSS custom properties:
   - `[data-theme="dark"]` (default): `--bg-color: #10231C`, `--text-color: #F4F4F0`, `--surface-1: #17312A`, `--surface-2: #1D3A31`, `--border-color: #2A473D`, `--text-muted: #9DB4AA`, `--accent-gold: #C99A3B`, `--accent-live: #00E599`.
   - Light theme: `--bg-color: #F4F4F0`, `--text-color: #10231C`, `--surface-1: #FFFFFF`, `--surface-2: #ECEBE4`, `--border-color: #DDDCD3`, `--text-muted: #5B6660`; gold/live unchanged.
3. Add font tokens:
   ```scss
   --font-display: 'Fraunces', Georgia, serif;
   --font-body: 'IBM Plex Sans', -apple-system, sans-serif;
   --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
   ```
4. `body { font-family: var(--font-body); }`; `h1–h6, .section-title { font-family: var(--font-display); }`. Add a `.mono` utility class (`font-family: var(--font-mono); letter-spacing: 0.02em;`) for tags/dates/status lines.
5. Keep the existing reduced-motion, focus-visible, and high-contrast blocks unchanged.

### 1.3 Default to dark (`src/components/ThemeContext.tsx`)
- Change the fallback when no `localStorage` value and no system preference resolves: initial `useState<Theme>('dark')`. Forest-Ink is the brand-primary presentation; light remains a full-quality alternative.

### 1.4 Sweep hardcoded colors (`Header.scss`, `Footer.scss`, `Projects.scss`, `Badges.scss`, `Education_new.scss`, `CV_new.scss`, `ChatPage.scss`, `Showcase.scss`, `SectionSkeleton.scss`, `Skeleton.scss`, `LanguageSwitcher.scss`, `CVRequestModal` styles)
1. Grep each file for hex literals and `rgba(` values; replace with the CSS variables from 1.2.
2. Remove all per-card pastel gradient rules (`nth-child(12n+…)` blocks) in `Projects.scss`/`Badges.scss` — every card uses `var(--surface-1)` with `1px solid var(--border-color)`; hover = `translateY(-4px)` + gold border-color shift.
3. Social icon brand colors in `Header.tsx` (`#0077B5` etc.) may stay — they are brand identities, not theme colors — but restyle their container to a neutral `var(--surface-2)` chip with the brand color applied to the icon on hover instead of as a permanent background.

### 1.5 Shared signature components (new files)
1. **`src/components/ui/LiveBadge.tsx`** — `● LIVE` in IBM Plex Mono, Signal-Teal dot with a subtle 2s pulse (respect `prefers-reduced-motion`), used by dossiers and secondary cards. Props: `label?: string` (default "LIVE").
2. **`src/components/ui/WaxSeal.tsx`** — circular Gold-Ochre seal rendered in SVG/CSS (radial gradient + double ring + slight rotation), size prop (`sm | md`), children = short text or emoji (e.g. "1st Place"). Used for credentials and awards. No raster images.
3. **`src/components/ui/index.ts`** barrel + a shared `ui.scss`.

**Verify Phase 1:** site renders in both themes with no leftover flag-blue/green surfaces; fonts visibly Fraunces/Plex; `npm run build` passes; Lighthouse color-contrast audit passes on both themes.

---

## Phase 2 — Header, Hero & Cross-Linking

### 2.1 Services link (`src/components/Header.tsx`)
- Change the Services menu item URL from `https://www.devray.site/` to **`https://devray.qzz.io/`**. (Also synced into the chat prompt in Phase 0.7.)

### 2.2 Hero restyle (`Header.scss` + `Header.tsx`)
1. Name in Fraunces 700, fluid size via `clamp(2.2rem, 5vw, 3.5rem)`.
2. Job-title strip (`Software Engineer • Data Analyst • AI-ML • Creative`) moves to IBM Plex Mono, `var(--text-muted)`, with Gold-Ochre separators.
3. Header background: solid `var(--bg-color)` with a faint radial gold vignette (≤ 4% opacity) — remove any remaining blue gradient.
4. Nav buttons: mono font, underline-on-active in Gold-Ochre instead of filled pills.

### 2.3 DevRay footer banner (new: `src/components/DevRayBanner.tsx` + SCSS)
1. Full-width strip rendered **above** the `<Footer>` contact section in `App.tsx`.
2. Content (i18n key `banner.devray`): "Looking for custom software development or agency services? **Visit DevRay →**" linking to `https://devray.qzz.io/` (`target="_blank" rel="noopener noreferrer"`).
3. Style: `var(--surface-2)` background, 1px gold top border, Fraunces for the link, subtle arrow-slide hover.
4. Add the key to `en.json`, `fr.json`, `nl.json`.

**Verify Phase 2:** Services opens devray.qzz.io; banner visible on mobile + desktop; keyboard focus ring visible on the banner link.

---

## Phase 3 — Professional Profile Rewrite

### 3.1 Update copy (`src/i18n/en.json` → `profile.description`)
Replace the opening of the description so it leads with public-sector experience:

> "I've spent the past two years building digital systems inside public institutions — the Pan-African Parliament and a Member of Parliament's office — while independently designing and shipping AI products. I build smart, scalable software and AI systems that solve real-world problems. My work spans full-stack engineering, machine learning, data analytics, cloud architecture, and automated deployment pipelines…"

Keep the remaining paragraphs (tooling, mission, collaboration) as they are. Translate the new opening into `fr.json` and `nl.json`.

### 3.2 Mirror in AI chat (`src/services/groq.ts`)
- Add the Pan-African Parliament / MP office experience to the `WORK PHILOSOPHY` / core-identity block so the chatbot tells the same story as the page.

### 3.3 Mirror in SEO meta (`index.html`)
- Update `og:description` / `twitter:description` / `meta[name=description]` to the new positioning (public institutions + AI products).

**Verify Phase 3:** profile section, chatbot answer to "tell me about Ray's experience", and social-share preview all tell the same story in all 3 languages.

---

## Phase 4 — Featured Project Dossiers

This is the largest phase. The current state: **all 11 projects are `featured: true`** in a uniform grid, so "Featured" means nothing. Restructure into two tiers.

### 4.1 Data model (`src/i18n/en.json` + `Projects.tsx` interface)
1. Replace the `featured: boolean` flag with `tier: "flagship" | "secondary"` on every project.
2. Add optional fields: `award` (string, e.g. "1st Place — PLP AI Innovation Hackathon"), `entered` (string, e.g. "Entered — Mistral World Hackathon"), `live` (boolean), `metrics` (array of `{ label, value }` mono-rendered stat lines), `category` (for the secondary grid, e.g. "Data Engineering & Machine Learning").
3. Tier assignment:
   - **Flagship:** `aiHealth`, `luminae`.
   - **Secondary:** `liveInterviewer`, `contentShapeshifterPro`, `serenityAI`, `kaziConnect`, `codebaseGenius`, `tutaLearn`, `weruDigital`, `mrp2026` (category: *Data Engineering & Machine Learning*). *(WeatherWise Planner is in the suggestion list but has no data in the codebase — add it only if Ray supplies name/URL/stack, as a secondary card.)*
4. Flagship content:
   - **AI Health Chat:** `award: "1st Place — PLP AI Innovation Hackathon"`, `live: true`, metrics for multilingual support and WHO/CDC/Mayo Clinic sourcing **only if Ray confirms them** (see content table); otherwise ship award + live + existing description.
   - **Luminae:** `live: true`, `entered: "Entered — Mistral World Hackathon"`, metrics: `5-agent orchestration`, `~$0.05 / paper`, `weeks → 3 minutes`.
5. Propagate the same structure to `fr.json` / `nl.json`.

### 4.2 Component split (`src/components/Projects.tsx` → keep single file, two render paths)
1. `FlagshipDossier` (internal component): 2-column layout on ≥900px — left column: Fraunces title, `LiveBadge` if `live`, `WaxSeal` if `award` (seal overlaps the card's top-right corner), long description, metrics list in IBM Plex Mono with gold tick rules; right column: screenshot if available, otherwise the tech-stack list styled as a mono "spec sheet". `entered` renders as a muted mono footnote, visually quieter than the award seal.
2. `SecondaryCard` (internal component): compact single-row card — mono category label, Fraunces name (linked), one-line `shortDescription`, inline icon links (Live / GitHub / Play Store). Grid: `repeat(auto-fill, minmax(280px, 1fr))`, tight gap.
3. Section structure: `Featured Projects` (dossiers stacked vertically) → subheading `More Projects` (i18n key `projects.more`) → dense grid.
4. Delete the now-unused `featured-badge` markup and SCSS.

### 4.3 Styling (`Projects.scss`)
- Dossiers: `var(--surface-1)`, 1px `var(--border-color)`, generous padding (`--space-2xl`), gold 2px top rule. Mobile: single column, seal shrinks to `sm`.
- Secondary cards: flat, hairline borders, hover raises border to gold. No gradients.

**Verify Phase 4:** exactly 2 dossiers render with seal/live/metrics; ≥8 compact cards below; keyboard tab order sane; mobile layout single-column; all locales render (no raw i18n keys on screen).

---

## Phase 5 — Writing & Insights Section (new)

### 5.1 Component (`src/components/Writing.tsx` + `Writing.scss`)
1. New lazy-loaded section, id `writing`, inserted in `App.tsx` **between `<Education />` and `<Badges />`**.
2. Two editorial cards from i18n (`writing.items`): serif Fraunces headline, mono date + venue line ("LinkedIn Pulse — March 2026"), 1–2 sentence teaser, "Read on LinkedIn →" external link.
3. Articles:
   - "Code Review Is the Firewall Against AI Slop" — LinkedIn Pulse, March 2026.
   - "Code Utopia in 2026: The Four Pillars of Production-Ready Code" — LinkedIn Pulse, January 2026.
   - URLs from Ray (placeholder `#` until supplied — if still `#` at launch, hide the link button, not the card).
4. Style like magazine excerpts: parchment/ink inversion is allowed here (cards use `var(--surface-2)` with a gold drop-cap or oversized quote mark).

### 5.2 Wiring
1. Add `writing` to the `menuItems` array in `Header.tsx` (label i18n key `menu.writing` = "Writing") so scroll-spy picks it up.
2. Add `writing.*` keys to all three locale files.
3. Add the section to the chatbot prompt (one line listing the two articles).

**Verify Phase 5:** section renders between Education and Badges; nav item scrolls to it and highlights; lazy chunk loads via Suspense skeleton.

---

## Phase 6 — Badges & Certifications: Tiered Layout

Currently 18 equal cards — overwhelming and undifferentiated.

### 6.1 Tier the data (`src/components/Badges.tsx`)
1. Add `tier: 'primary' | 'more'` to the `badgeKeys` array:
   - **Primary (visible by default, 5):** `oracle_cloud`, `worldquant_data_science`, `google_adk`, `linux_kcna`, plus one consolidated **ALX Africa** card (see 6.2).
   - **More (collapsed):** `google_skills` (27 badges), `aws_educate_genai`, `aws_educate_ml`, `ibm_granite`, `bcs_generative_ai`, `anthropic_fluency`, `power_learn_csdp`, `google_security`, `google_load_balancing`, `google_serverless`, `google_prompt_design`, and the individual ALX certs (`alx_data_analytics`, `alx_machine_learning`, `alx_data_science`) if 6.2's consolidation is adopted; otherwise keep them primary-adjacent.
2. Primary cards get a `WaxSeal` mark (sm) in the corner instead of the generic pill `certification-badge`.

### 6.2 ALX consolidation (optional but recommended)
- Three separate ALX cards (Data Analytics, Machine Learning, Data Science) dilute the top tier. Show one "ALX Africa Certifications" primary card summarizing all three with links, and keep the individual cards in the collapsed tier.

### 6.3 Accordion
1. Below the primary grid, a button: `+ Show More Certifications (N)` / `− Show Fewer` (i18n keys `badges.showMore` / `badges.showLess`).
2. Semantics: `<button aria-expanded aria-controls="more-certs">`; the collapsed container uses a height animation via framer-motion `AnimatePresence` (already a dependency), with `prefers-reduced-motion` fallback to instant toggle.
3. Collapsed-tier cards render in a **denser** variant: logo + name + issuer + link only (no description/skills lists) to keep the DOM light.

**Verify Phase 6:** 5 cards visible by default; accordion expands/collapses with keyboard (Enter/Space) and screen-reader state announced; no layout shift of the footer when expanding (scroll anchored).

---

## Phase 7 — Platform Hardening (SEO, PWA, security)

### 7.1 Structured data (`index.html`)
- Add JSON-LD `Person` schema: name, url, sameAs (GitHub, LinkedIn, YouTube, X), jobTitle, alumniOf, knowsAbout.

### 7.2 Meta/theme sync
- Confirm `<meta name="theme-color">` = `#10231C` and manifest `theme_color`/`background_color` match the new palette (started in 0.5).
- Refresh `og:title` / keywords to include the public-sector positioning.

### 7.3 Groq key exposure (`src/services/groq.ts`) — decision required
- `VITE_GROQ_API_KEY` ships in the client bundle; anyone can extract it and burn quota.
- **Recommended fix:** move the chat completion call to a Vercel serverless function (`api/chat.ts`) that holds the key server-side; the client posts messages to `/api/chat`. Add basic rate limiting (per-IP, in-memory or Upstash).
- If deferring: at minimum set usage limits on the Groq key and document the risk.

### 7.4 Routing (optional, non-blocking)
- `HashRouter` produces `/#/chat` URLs and weakens SEO. Switching to `BrowserRouter` + a `vercel.json` SPA rewrite (`{ "source": "/(.*)", "destination": "/index.html" }`) is a small change; do it here or explicitly defer.

**Verify Phase 7:** Rich-results test passes for Person schema; chat works through the proxy with the key absent from the built JS (`grep -r "gsk_" dist/` returns nothing).

---

## Phase 8 — i18n Parity, QA & Ship

### 8.1 Locale parity
- Run a key-parity check (en vs fr vs nl) for every key added in Phases 2–6: `banner.*`, `projects.more`, `projects.items.*.tier/award/entered/metrics/category`, `writing.*`, `menu.writing`, `badges.showMore/showLess`.

### 8.2 QA checklist
- [ ] `npm run lint` — zero warnings (script enforces `--max-warnings 0`).
- [ ] `npm run build` — clean; `npm run preview` smoke test.
- [ ] Both themes: no illegible text, no leftover blue/green surfaces (visual pass over every section).
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on mobile emulation.
- [ ] Keyboard-only pass: nav, accordion, banner, dossier links, contact form.
- [ ] All three languages: no raw i18n keys rendered anywhere.
- [ ] PWA: install prompt shows correct icon and Forest-Ink theme color.
- [ ] Chatbot answers align with page content (MRP RMSE, experience story, services URL).

### 8.3 Ship
1. Commit per phase (8 commits minimum, conventional messages: `fix: …`, `feat: …`, `refactor: …`).
2. Push to `origin/main`; verify the Vercel deployment; re-run Lighthouse against production.
3. Validate social-share cards (LinkedIn Post Inspector / opengraph.xyz) after deploy.

---

## Explicitly Out of Scope (assessed, deliberately excluded)

- **Next.js migration** (listed in the old `recommendations.md`): a full rewrite; the Vite SPA with the Phase 7 SEO work is sufficient for a portfolio. Revisit only if organic search becomes a priority.
- **WeatherWise Planner card**: no data exists in the codebase; blocked on Ray supplying it.
- **Testimonials / analytics**: not requested; add later if desired.
