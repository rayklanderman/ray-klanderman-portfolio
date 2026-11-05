import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlay, FaYoutube } from 'react-icons/fa';
import { LINKS } from '../data/site';
import './Showcase.scss';

/**
 * Demo playlist. The YouTube player (~1 MB of third-party script) loads only after
 * the visitor asks for it; until then a lightweight placeholder is shown.
 */
const Showcase: FC = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  return (
    <div id="showcase" className="showcase">
      <h3 id="showcase-title" className="showcase__title">
        {t('showcase.title')}
      </h3>
      <p className="showcase__description">{t('showcase.description')}</p>
      <div className="showcase__frame">
        {loaded ? (
          <iframe
            className="showcase__iframe"
            src={`${LINKS.showcaseEmbed}&autoplay=1`}
            title={t('showcase.iframeTitle')}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="showcase__placeholder" onClick={() => setLoaded(true)}>
            <span className="showcase__play" aria-hidden="true">
              <FaPlay />
            </span>
            <span className="showcase__label">{t('showcase.load')}</span>
            <span className="showcase__hint">{t('showcase.privacy')}</span>
          </button>
        )}
      </div>
      <p className="showcase__link">
        <a href={LINKS.showcasePlaylist} target="_blank" rel="noopener noreferrer" className="text-link">
          <FaYoutube aria-hidden="true" /> {t('showcase.openOnYoutube')}
          <span className="visually-hidden"> ({t('common.newTab')})</span>
        </a>
      </p>
    </div>
  );
};

export default Showcase;
