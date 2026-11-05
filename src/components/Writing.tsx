import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Showcase from './Showcase';
import { LINKS } from '../data/site';
import './Writing.scss';

interface WritingItem {
  title: string;
  venue: string;
  date: string;
  teaser: string;
  url: string;
}

const Writing: FC = () => {
  const { t } = useTranslation();
  const raw = t('writing.items', { returnObjects: true });
  const items = Array.isArray(raw) ? (raw as WritingItem[]) : [];

  return (
    <section id="writing" className="section writing-section" aria-labelledby="writing-title">
      <div className="container">
        <h2 id="writing-title" className="section-title">
          {t('writing.title')}
        </h2>
        <p className="section-subtitle">{t('writing.subtitle')}</p>

        <ul className="writing-grid" role="list">
          {items.map((item) => (
            <li key={item.title}>
              <article className="writing-card">
                <span className="writing-card__quote" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="writing-card__meta mono">
                  {item.venue} · {item.date}
                </p>
                <h3 className="writing-card__title">
                  {item.url && item.url !== '#' ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-link">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="writing-card__teaser">{item.teaser}</p>
              </article>
            </li>
          ))}
        </ul>
        <p className="writing-more">
          <a href={LINKS.linkedin} className="btn btn--secondary" target="_blank" rel="noopener noreferrer">
            {t('writing.readMore')}
            <span className="visually-hidden"> ({t('common.newTab')})</span>
          </a>
        </p>

        <Showcase />
      </div>
    </section>
  );
};

export default Writing;
