import './LanguageSwitcher.scss';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: 'EN', country: 'English' },
    { code: 'nl', label: 'NL', country: 'Nederlands' },
    { code: 'fr', label: 'FR', country: 'Français' }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <motion.div
      className="language-switcher"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`language-btn ${i18n.language === lang.code ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={lang.country}
        >
          <span className="language-label">{lang.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default LanguageSwitcher;
