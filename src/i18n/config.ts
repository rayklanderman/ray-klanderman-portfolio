import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';

export const SUPPORTED_LANGUAGES = ['en', 'nl', 'fr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** Same key the previous language detector used, so existing preferences survive. */
const STORAGE_KEY = 'i18nextLng';

const loaders: Record<Exclude<SupportedLanguage, 'en'>, () => Promise<{ default: Record<string, unknown> }>> = {
  fr: () => import('./fr.json'),
  nl: () => import('./nl.json'),
};

// English is bundled and initialised synchronously so the prerendered HTML and the
// first client render are identical (required for hydration). Other languages load on demand.
i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: [...SUPPORTED_LANGUAGES],
  initImmediate: false,
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
});

const asSupported = (value: string | null | undefined): SupportedLanguage | undefined => {
  const base = value?.toLowerCase().split('-')[0];
  return SUPPORTED_LANGUAGES.find((l) => l === base);
};

export async function setLanguage(lng: SupportedLanguage, persist = true): Promise<void> {
  if (lng !== 'en' && !i18n.hasResourceBundle(lng, 'translation')) {
    const mod = await loaders[lng]();
    i18n.addResourceBundle(lng, 'translation', mod.default, true, true);
  }
  await i18n.changeLanguage(lng);
  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, lng);
    } catch {
      // storage unavailable (private mode); the choice simply is not remembered
    }
  }
}

/** Call once after the first client render: applies a saved or browser language. */
export function restoreLanguagePreference(): void {
  if (typeof window === 'undefined') return;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    saved = null;
  }
  const preferred = asSupported(saved) ?? asSupported(navigator.language);
  if (preferred && preferred !== i18n.language) {
    void setLanguage(preferred, Boolean(saved));
  }
}

export default i18n;
