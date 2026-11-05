import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { FaDownload, FaFileAlt, FaGithub, FaLinkedin, FaShareAlt } from 'react-icons/fa';
import CVRequestModal from './CVRequestModal';
import { CV_PUBLIC_URL, LINKS, PERSON, SITE_URL } from '../data/site';
import { featuredProjects, projectPath } from '../data/projects';
import './Hero.scss';

const Hero: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const liveWork = featuredProjects().filter((p) => p.liveUrl);

  const handleShare = async () => {
    const url = `${SITE_URL}/`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${PERSON.name} | ${PERSON.title}`, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success(t('share.copied'));
      }
    } catch (error) {
      if ((error as DOMException)?.name !== 'AbortError') {
        toast.error(t('share.failed'));
      }
    }
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__portrait">
          <picture>
            <source srcSet={PERSON.portrait} type="image/webp" />
            <img
              src={PERSON.portraitFallback}
              alt={t('hero.portraitAlt')}
              width={240}
              height={240}
              decoding="async"
              {...{ fetchpriority: 'high' }}
            />
          </picture>
        </div>

        <div className="hero__text">
          <p className="hero__eyebrow mono">{t('hero.location')}</p>
          <h1 id="hero-title" className="hero__name">
            <span className="highlight">Raymond</span> (DevRay) Klanderman
          </h1>
          <p className="hero__role">{t('hero.title')}</p>
          <p className="hero__headline">{t('hero.headline')}</p>
          <p className="hero__supporting mono">{t('hero.supporting')}</p>
          <p className="hero__intro">{t('hero.intro')}</p>

          <div className="hero__ctas">
            <Link to={{ pathname: '/', hash: '#projects' }} className="btn btn--primary">
              {t('hero.ctaProjects')}
            </Link>
            <a href={LINKS.github} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              <FaGithub aria-hidden="true" /> {t('hero.ctaGithub')}
              <span className="visually-hidden"> ({t('common.newTab')})</span>
            </a>
            <a href={LINKS.linkedin} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
              <FaLinkedin aria-hidden="true" /> LinkedIn
              <span className="visually-hidden"> ({t('common.newTab')})</span>
            </a>
            {CV_PUBLIC_URL ? (
              <a href={CV_PUBLIC_URL} className="btn btn--secondary" download>
                <FaDownload aria-hidden="true" /> {t('hero.ctaDownloadCv')}
              </a>
            ) : (
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setIsModalOpen(true)}
                aria-haspopup="dialog"
              >
                <FaFileAlt aria-hidden="true" /> {t('header.downloadCV')}
              </button>
            )}
            <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn--ghost">
              {t('hero.ctaContact')}
            </Link>
          </div>

          {liveWork.length > 0 && (
            <div className="hero__live">
              <h2 className="hero__live-title mono">{t('hero.liveWork')}</h2>
              <ul role="list">
                {liveWork.map((p) => (
                  <li key={p.slug}>
                    <Link to={projectPath(p.slug)} className="hero__live-link">
                      <span className="hero__live-dot" aria-hidden="true" />
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="button" className="hero__share" onClick={handleShare}>
            <FaShareAlt aria-hidden="true" /> {t('header.share')}
          </button>
        </div>
      </div>
      {isModalOpen && <CVRequestModal onClose={closeModal} />}
    </section>
  );
};

export default Hero;
