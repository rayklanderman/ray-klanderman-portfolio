import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/** Only explicit choices are stored, under a new key, so the cream light theme is the default. */
export const THEME_STORAGE_KEY = 'colorTheme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components -- hook + provider in one context file is intentional
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const readDomTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

/**
 * The inline script in index.html sets `data-theme` before first paint. React state starts
 * as 'light' on both server and client (so hydration matches) and syncs from the DOM after mount.
 */
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(readDomTheme());
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = readDomTheme() === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // storage unavailable; the choice lasts for this page view only
    }
    setTheme(next);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
