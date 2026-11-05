import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { featuredProjects, projectPath } from '../data/projects';
import './NotFoundPage.scss';

interface NotFoundPageProps {
  kind?: 'page' | 'project';
}

const NotFoundPage: FC<NotFoundPageProps> = ({ kind = 'page' }) => {
  const { t } = useTranslation();
  return (
    <section className="not-found container" aria-labelledby="not-found-title">
      <p className="mono not-found__code">404</p>
      <h1 id="not-found-title">{kind === 'project' ? t('notFound.projectTitle') : t('notFound.title')}</h1>
      <p>{t('notFound.text')}</p>
      <div className="not-found__actions">
        <Link to="/" className="btn btn--primary">
          {t('notFound.home')}
        </Link>
        <Link to={{ pathname: '/', hash: '#projects' }} className="btn btn--secondary">
          {t('notFound.projects')}
        </Link>
      </div>
      <h2 className="not-found__subtitle">{t('notFound.featured')}</h2>
      <ul>
        {featuredProjects().map((p) => (
          <li key={p.slug}>
            <Link to={projectPath(p.slug)} className="text-link">
              {p.name}
            </Link>{' '}
            — {p.tagline}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NotFoundPage;
