import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ExperienceEntry, ROLES, TRAINING } from '../data/experience';
import { getProjectBySlug, projectPath } from '../data/projects';
import './Experience.scss';

const Entry: FC<{ entry: ExperienceEntry }> = ({ entry }) => {
  const { t } = useTranslation();
  const related = (entry.relatedProjects ?? [])
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const meta = [entry.organisation, entry.engagement, entry.location].filter(Boolean).join(' · ');

  return (
    <li className="timeline__item">
      <article>
        <p className="timeline__period mono">{entry.period}</p>
        <h4 className="timeline__title">{entry.title}</h4>
        <p className="timeline__meta">{meta}</p>
        {entry.summary && <p className="timeline__summary">{entry.summary}</p>}
        {entry.highlights && entry.highlights.length > 0 && (
          <ul className="timeline__highlights">
            {entry.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        {related.length > 0 && (
          <p className="timeline__related">
            <span>{t('experience.related')}: </span>
            {related.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && ', '}
                <Link to={projectPath(p.slug)} className="text-link">
                  {p.name}
                </Link>
              </span>
            ))}
          </p>
        )}
      </article>
    </li>
  );
};

const Experience: FC = () => {
  const { t } = useTranslation();
  return (
    <section id="experience" className="section section--alt" aria-labelledby="experience-title">
      <div className="container">
        <h2 id="experience-title" className="section-title">
          {t('experience.title')}
        </h2>
        <p className="section-subtitle">{t('experience.subtitle')}</p>
        <div className="experience-columns">
          <div>
            <h3 className="experience-columns__title">{t('experience.roles')}</h3>
            <ol className="timeline" role="list">
              {ROLES.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </ol>
          </div>
          <div>
            <h3 className="experience-columns__title">{t('experience.training')}</h3>
            <ol className="timeline" role="list">
              {TRAINING.map((entry) => (
                <Entry key={entry.id} entry={entry} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
