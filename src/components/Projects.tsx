import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import {
  CATEGORY_LABELS,
  ProjectCategory,
  categoriesInUse,
  featuredProjects,
  galleryProjects,
} from '../data/projects';
import './Projects.scss';

type Filter = 'all' | ProjectCategory;

const Projects: FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');

  const featured = featuredProjects();
  const gallery = galleryProjects();
  const categories = categoriesInUse([...featured, ...gallery]);

  const matches = (projectCategories: ProjectCategory[]) =>
    filter === 'all' || projectCategories.includes(filter);
  const visibleFeatured = featured.filter((p) => matches(p.categories));
  const visibleGallery = gallery.filter((p) => matches(p.categories));
  const total = visibleFeatured.length + visibleGallery.length;

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('projects.filterAll') },
    ...categories.map((c) => ({ id: c, label: CATEGORY_LABELS[c] })),
  ];

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <div className="container">
        <h2 id="projects-title" className="section-title">
          {t('projects.title')}
        </h2>
        <p className="section-subtitle">{t('projects.subtitle')}</p>

        <div className="project-filter">
          <div className="project-filter__buttons" role="group" aria-label={t('projects.filterLabel')}>
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className="project-filter__btn"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="project-filter__count" aria-live="polite">
            {t('projects.showing', { count: total })}
          </p>
        </div>

        {visibleFeatured.length > 0 && (
          <>
            <h3 className="projects__group-title">{t('projects.featured')}</h3>
            <ul className="projects__featured" role="list">
              {visibleFeatured.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} variant="featured" headingLevel="h4" />
                </li>
              ))}
            </ul>
          </>
        )}

        {visibleGallery.length > 0 && (
          <>
            <h3 className="projects__group-title">{t('projects.more')}</h3>
            <ul className="projects__gallery" role="list">
              {visibleGallery.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} variant="compact" headingLevel="h4" />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
