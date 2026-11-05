import { FC, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { useTheme } from './ThemeContext';
import { LINKS } from '../data/site';
import './SiteHeader.scss';

const SECTION_NAV = [
  { id: 'about', key: 'menu.about' },
  { id: 'projects', key: 'menu.projects' },
  { id: 'experience', key: 'menu.experience' },
  { id: 'expertise', key: 'menu.expertise' },
  { id: 'education', key: 'menu.education' },
  { id: 'credentials', key: 'menu.credentials' },
  { id: 'writing', key: 'menu.writing' },
  { id: 'contact', key: 'menu.contact' },
] as const;

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      aria-label={t('menu.darkMode')}
      title={t('menu.darkMode')}
    >
      {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    </button>
  );
};

/** Highlights the section currently in view (home page only). */
const useActiveSection = (enabled: boolean): string => {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') {
      setActive('');
      return;
    }
    const sections = SECTION_NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [enabled]);
  return active;
};

const SiteHeader: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeSection = useActiveSection(pathname === '/');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" onClick={close}>
          <span className="site-header__mark" aria-hidden="true">
            RK
          </span>
          <span className="site-header__name">
            Raymond Klanderman<span className="visually-hidden">, {t('menu.home')}</span>
          </span>
        </Link>

        <nav id="site-nav" className={`site-nav${open ? ' is-open' : ''}`} aria-label={t('menu.mainNav')}>
          <ul role="list">
            {SECTION_NAV.map((item) => (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: `#${item.id}` }}
                  className="site-nav__link"
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={close}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/chat"
                className="site-nav__link"
                aria-current={pathname === '/chat' ? 'page' : undefined}
                onClick={close}
              >
                {t('menu.chat')}
              </Link>
            </li>
            <li>
              <a href={LINKS.services} className="site-nav__link" target="_blank" rel="noopener noreferrer">
                {t('menu.services')}
                <span aria-hidden="true"> ↗</span>
                <span className="visually-hidden"> ({t('common.newTab')})</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="site-header__tools">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="icon-button site-header__menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t('menu.closeMenu') : t('menu.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
