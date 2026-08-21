import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import './DevRayBanner.scss';

const DEVRAY_URL = 'https://devray.qzz.io/';

/**
 * Full-width strip rendered above the footer contact section,
 * promoting Ray's custom software development / agency services.
 */
const DevRayBanner: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="devray-banner" role="complementary" aria-label={t('banner.devray.ariaLabel', 'DevRay services')}>
      <a
        href={DEVRAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="devray-banner__link"
      >
        <span className="devray-banner__text">{t('banner.devray.text')}</span>
        <span className="devray-banner__cta">
          {t('banner.devray.cta')}
          <span className="devray-banner__arrow" aria-hidden="true">→</span>
        </span>
      </a>
    </div>
  );
};

export default DevRayBanner;
