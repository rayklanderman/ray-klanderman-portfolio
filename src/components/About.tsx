import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCloud, FaChartLine, FaRocket, FaShieldAlt, FaTrophy, FaUniversalAccess } from 'react-icons/fa';
import './About.scss';

interface Highlight {
  title: string;
  text: string;
}

const ICONS: ReactElement[] = [
  <FaRocket key="rocket" />,
  <FaShieldAlt key="shield" />,
  <FaChartLine key="chart" />,
  <FaUniversalAccess key="access" />,
  <FaCloud key="cloud" />,
  <FaTrophy key="trophy" />,
];

const About: FC = () => {
  const { t } = useTranslation();
  const highlights = t('about.highlights', { returnObjects: true });
  const items = Array.isArray(highlights) ? (highlights as Highlight[]) : [];

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <span id="profile" className="anchor-alias" aria-hidden="true" />
      <div className="container">
        <h2 id="about-title" className="section-title">
          {t('about.title')}
        </h2>

        <div className="about__summary">
          <p className="about__lead">{t('about.summary')}</p>
          <p className="about__open">{t('about.openTo')}</p>
          <details className="about__details">
            <summary>{t('about.backgroundTitle')}</summary>
            <p>{t('about.background')}</p>
          </details>
        </div>

        <h3 className="about__highlights-title">{t('about.highlightsTitle')}</h3>
        <ul className="about__highlights" role="list">
          {items.map((item, idx) => (
            <li key={item.title} className="about-card">
              <span className="about-card__icon" aria-hidden="true">
                {ICONS[idx % ICONS.length]}
              </span>
              <h4 className="about-card__title">{item.title}</h4>
              <p className="about-card__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default About;
