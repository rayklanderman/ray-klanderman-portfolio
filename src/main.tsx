import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { normalizePath } from './seo/meta';
import './i18n/config';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Hydrate only when the static HTML was rendered for this exact route. Otherwise (dev server,
// service-worker fallback, unknown route) render from scratch.
const prerenderedPath = container.getAttribute('data-prerendered-path');
if (container.firstElementChild && prerenderedPath === normalizePath(window.location.pathname)) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
