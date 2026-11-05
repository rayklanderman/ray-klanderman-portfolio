import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SiteHeader from './SiteHeader';
import DevRayBanner from './DevRayBanner';
import Footer from './Footer';

const SiteLayout: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <a href="#main" className="skip-link">
        {t('menu.skipToContent')}
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <DevRayBanner />
      <Footer />
    </>
  );
};

export default SiteLayout;
