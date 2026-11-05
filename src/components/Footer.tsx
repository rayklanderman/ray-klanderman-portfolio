import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { LINKS, PERSON } from '../data/site';
import './Footer.scss';

const SOCIAL = [
  { icon: <FaGithub aria-hidden="true" />, url: LINKS.github, label: 'GitHub' },
  { icon: <FaLinkedin aria-hidden="true" />, url: LINKS.linkedin, label: 'LinkedIn' },
  { icon: <FaYoutube aria-hidden="true" />, url: LINKS.youtube, label: 'YouTube' },
  { icon: <FaTwitter aria-hidden="true" />, url: LINKS.x, label: 'X (Twitter)' },
];

const Footer: FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <p className="site-footer__name">{PERSON.displayName}</p>
          <p className="site-footer__role">
            {PERSON.title} · {PERSON.location}
          </p>
        </div>
        <ul className="site-footer__social" role="list" aria-label={t('footer.social')}>
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="icon-button" title={s.label}>
                {s.icon}
                <span className="visually-hidden">
                  {s.label} ({t('common.newTab')})
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="site-footer__meta">
          © {new Date().getFullYear()} {PERSON.name} ·{' '}
          <Link to="/chat" className="text-link">
            {t('menu.chat')}
          </Link>{' '}
          ·{' '}
          <a href={LINKS.services} className="text-link" target="_blank" rel="noopener noreferrer">
            DevRay {t('menu.services')}
            <span className="visually-hidden"> ({t('common.newTab')})</span>
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
