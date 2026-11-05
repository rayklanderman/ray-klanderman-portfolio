import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const focusWithoutScroll = (el: HTMLElement) => {
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
};

/**
 * Client-side navigation does not scroll or move focus like a full page load does.
 * This restores that: hash links scroll to their section, new pages start at the top,
 * and keyboard/screen-reader focus moves to the new content.
 */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    const first = isFirst.current;
    isFirst.current = false;

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: first || prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
        if (!first) focusWithoutScroll(target);
      }
      return;
    }

    if (first) return;
    window.scrollTo(0, 0);
    const main = document.getElementById('main');
    if (main) focusWithoutScroll(main);
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
