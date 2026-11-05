import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteMeta, serializeJsonLd } from './meta';

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/**
 * Keeps <head> in sync during client-side navigation. The initial HTML for every
 * route already contains the same tags (written by scripts/prerender.mjs).
 */
const DocumentMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    document.title = meta.title;
    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[name="robots"]', 'name', 'robots', meta.robots);
    setMeta('meta[property="og:url"]', 'property', 'og:url', meta.canonical);
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', meta.ogType);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = meta.canonical;

    let ld = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    if (meta.jsonLd.length === 0) {
      ld?.remove();
    } else {
      if (!ld) {
        ld = document.createElement('script');
        ld.type = 'application/ld+json';
        document.head.appendChild(ld);
      }
      ld.textContent = serializeJsonLd(meta.jsonLd);
    }
  }, [pathname]);

  return null;
};

export default DocumentMeta;
