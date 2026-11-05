import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { setLanguage, SupportedLanguage } from '../i18n/config';
import './LanguageSwitcher.scss';

const LANGUAGES: { code: SupportedLanguage; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'nl', label: 'NL', name: 'Nederlands' },
  { code: 'fr', label: 'FR', name: 'Français' },
];

const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.split('-')[0];

  return (
    <div className="language-switcher" role="group" aria-label={t('menu.language')}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          lang={lang.code}
          className="language-switcher__btn"
          aria-pressed={current === lang.code}
          title={lang.name}
          onClick={() => void setLanguage(lang.code)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
