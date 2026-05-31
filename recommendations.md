# Path to Premium: Portfolio Recommendations

A comprehensive roadmap to elevate this portfolio from a standard SPA to a **premium, world-class digital experience**. Categorized by implementation phases.

---

## Phase 1: Critical Code Health & Bug Fixes

Before adding premium features, the foundation must be flawless.

### 1. Fix Broken Scroll Detection (Critical)
**File:** `src/components/Header.tsx:43`
- **Issue:** `isScrolled !== isScrolled` is always false. The header's background blur never activates.
- **Fix:** Use a `useRef(0)` to track the previous scroll state and compare accurately.

### 2. Resolve Context & Wrapping Issues
**Files:** `src/main.tsx`, `src/App.tsx`
- **Issue:** App is wrapped in `<ThemeProvider>` twice, causing redundant React trees.
- **Fix:** Remove the outer wrapper in `main.tsx`.

### 3. Fix Accessibility (A11y) Anti-Patterns in Cards
**File:** `src/components/Projects.tsx`
- **Issue:** Project cards use `role="button"` and `tabIndex={0}` on an `<article>` that *also* contains nested `<a>` tags. This creates nested interactive controls, confusing screen readers and breaking keyboard navigation conventions.
- **Fix:** Remove the `onClick`/`role` from the wrapper card. Instead, use a pseudo-element `::before` on the main title link (`.project-link`) to make the entire card clickable natively without nesting issues.

### 4. Remove Dead Code & Logs
- **Issue:** `src/components/Contact.tsx` is completely unused. `Header.tsx` has debug logs. `CVRequestModal` lacks its own SCSS import for its overlay.
- **Fix:** Delete `Contact.tsx`, clean up `console.log`, and verify modal CSS boundaries.

---

## Phase 2: Theming & Dark Mode Perfection

A premium site must have a flawless dark mode. Currently, hardcoded colors completely break the theming engine.

### 5. Eradicate Hardcoded SCSS Colors
**Files:** `Header.scss`, `Footer.scss`, `Projects.scss`, `Badges.scss`
- **Issue:** Components use hardcoded hex values (e.g., `#21468B` in Footer, massive gradient lists in Projects/Badges) that completely ignore CSS variables (`--bg-color`, `--card-bg`). In dark mode, these bright pastel blocks look chaotic and harsh.
- **Fix:** Move ALL colors to CSS variables in `main.scss` (e.g., `--surface-1`, `--surface-2`, `--brand-blue`). Update components to exclusively use these variables.

### 6. Replace Pastel Gradients with Premium Surface Design
**Files:** `Projects.scss`, `Badges.scss`
- **Issue:** Assigning 12 different pastel background gradients (`&:nth-child(12n+1)`) feels dated and creates visual clutter.
- **Fix:** Use a unified dark/light "surface" color for all cards. Differentiate them using subtle, premium touches like **glowing borders**, **colored icon accents**, or **mouse-tracking spotlight gradients** on hover (a staple of premium UI).

---

## Phase 3: Premium UI/UX & Aesthetics

### 7. Typography Overhaul
**Current:** Standard `Inter` font everywhere.
- **Premium Upgrade:** Introduce a high-quality display font for headings (e.g., *Clash Display*, *Cal Sans*, or *Playfair Display* for a mature look) while keeping `Inter` for highly readable body text. Implement fluid typography (`clamp()`) for perfect scaling across devices.

### 8. Bento-Grid Layouts
**Current:** Uniform grid columns.
- **Premium Upgrade:** Adopt an asymmetric "Bento Grid" layout for the Projects and Showcase sections. Allow featured projects to span 2 columns or 2 rows. This creates dynamic visual hierarchy.

### 9. Component Refactoring & Micro-interactions
- **Refactor:** `Header.tsx` is 338 lines long and too complex. Split it into `<Hero />`, `<Navigation />`, and `<SocialBar />`.
- **Interactions:** Add magnetic button effects (buttons that slightly pull towards the cursor) for primary CTAs like "Download CV".
- **Scrolling:** Add `html { scroll-behavior: smooth; }` in `main.scss` for native anchor scrolling.

---

## Phase 4: Content Strategy & Social Proof

### 10. Render the "Elevator Pitch" Narrative
**File:** `src/i18n/en.json` (elevatorPitch key)
- **Issue:** Four paragraphs of excellent, compelling narrative about the developer's mission in Africa exist in the JSON but are never rendered on the site.
- **Fix:** Create a dedicated `<About />` or `<Mission />` bento-box section near the top to tell this story. Storytelling is what separates a resume from a premium portfolio.

### 11. Add Visual Skills Component
**Issue:** No quick way to scan technical stack. Recruiter time-on-page is short.
- **Fix:** Add an animated, infinitely scrolling marquee (ticker) of tech logos, or a categorized tag cloud.

### 12. Replace Stock Images
**File:** `src/components/Projects.tsx`
- **Issue:** Unsplash stock images undermine the credibility of real code projects.
- **Fix:** Replace with high-quality, high-resolution screenshots of the actual applications.

---

## Phase 5: Architecture & Performance (The "Next Level")

### 13. Migrate to Next.js 14+ (App Router)
**Issue:** Vite SPAs lack robust SEO and initial load speed (no SSR).
- **Upgrade:** Rewriting to Next.js provides Server-Side Rendering (SSR), giving you perfect SEO, faster First Contentful Paint, and automatic image optimization (`next/image`). This is the industry standard for modern premium portfolios.

### 14. Implement Advanced Image & Media Loading
- **Issue:** YouTube iframe and images load immediately, blocking the main thread and hurting Lighthouse scores.
- **Fix:** Add `loading="lazy"` to images and the `Showcase.tsx` iframe. Use a "blur-up" placeholder pattern for project images so the UI doesn't jump as they load.

### 15. Semantic SEO & Open Graph
- **Issue:** Missing structured data.
- **Fix:** Add JSON-LD `Person` schema markup. Generate dynamic Open Graph (OG) images so links shared on LinkedIn/Twitter look highly professional. Move `typescript-eslint` and `sharp` to `devDependencies` to clean up the build process.
