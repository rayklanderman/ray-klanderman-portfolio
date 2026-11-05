import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import i18n from './i18n/config';
import {
  NOT_FOUND_PATH,
  PRERENDER_ROUTES,
  getRouteMeta,
  normalizePath,
  renderHeadTags,
  renderSitemap,
} from './seo/meta';

/** Server-side render of one route, used by scripts/prerender.mjs at build time. */
export function render(url: string): string {
  if (i18n.language !== 'en') void i18n.changeLanguage('en');
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}

export function head(url: string): string {
  return renderHeadTags(getRouteMeta(url));
}

export { NOT_FOUND_PATH, PRERENDER_ROUTES, normalizePath, renderSitemap };
