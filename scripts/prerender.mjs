// Writes static HTML for every public route after `vite build` and the SSR build.
// Each page gets its own <head> (title, description, canonical, OG, JSON-LD) and
// fully rendered body content, so crawlers and no-JS clients see the real portfolio.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const APP_SLOT = '<div id="root"><!--app-html--></div>';

const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
if (!SEO_BLOCK.test(template) || !template.includes(APP_SLOT)) {
  throw new Error('dist/index.html is missing the seo:start/seo:end markers or the app-html slot');
}

const { render, head, PRERENDER_ROUTES, NOT_FOUND_PATH, renderSitemap } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const page = (url, prerenderedPath) => {
  const html = render(url);
  if (!html || html.length < 200) throw new Error(`Empty render for ${url}`);
  const rootAttr = prerenderedPath === null ? '' : ` data-prerendered-path="${prerenderedPath}"`;
  return template
    .replace(SEO_BLOCK, () => head(url))
    .replace(APP_SLOT, () => `<div id="root"${rootAttr}>${html}</div>`);
};

const outFile = (route) =>
  route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, ...route.split('/').filter(Boolean), 'index.html');

for (const route of PRERENDER_ROUTES) {
  const file = outFile(route);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, page(route, route), 'utf8');
  console.log(`prerendered ${route} -> ${path.relative(root, file)}`);
}

// 404 page: rendered without a prerendered path so the client renders it fresh for any URL.
await fs.writeFile(path.join(distDir, '404.html'), page(NOT_FOUND_PATH, null), 'utf8');
console.log('prerendered 404 -> dist/404.html');

const lastmod = new Date().toISOString().slice(0, 10);
await fs.writeFile(path.join(distDir, 'sitemap.xml'), renderSitemap(lastmod), 'utf8');
console.log('wrote dist/sitemap.xml');

await fs.rm(ssrDir, { recursive: true, force: true });
