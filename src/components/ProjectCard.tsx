import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCode, FaExternalLinkAlt, FaGithub, FaLock, FaTrophy } from 'react-icons/fa';
import { Project, projectPath, publicRepoUrl } from '../data/projects';

interface ProjectLinksProps {
  project: Project;
  showCaseStudy?: boolean;
  size?: 'small' | 'regular';
}

/**
 * Case study / live / source actions. Private repositories never get a source link,
 * only a "Source private" label.
 */
export const ProjectLinks: FC<ProjectLinksProps> = ({ project, showCaseStudy = true, size = 'regular' }) => {
  const { t } = useTranslation();
  const repoUrl = publicRepoUrl(project);
  const sizeClass = size === 'small' ? ' btn--small' : '';

  return (
    <div className="project-links">
      {showCaseStudy && (
        <Link to={projectPath(project.slug)} className={`btn btn--primary${sizeClass}`}>
          {t('projects.caseStudy')}
          <span className="visually-hidden">: {project.name}</span>
        </Link>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          className={`btn btn--secondary${sizeClass}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaExternalLinkAlt aria-hidden="true" /> {t('projects.liveApp')}
          <span className="visually-hidden">
            : {project.name} ({t('common.newTab')})
          </span>
        </a>
      )}
      {repoUrl && (
        <a href={repoUrl} className={`btn btn--secondary${sizeClass}`} target="_blank" rel="noopener noreferrer">
          <FaGithub aria-hidden="true" /> {t('projects.viewSource')}
          <span className="visually-hidden">
            : {project.name} ({t('common.newTab')})
          </span>
        </a>
      )}
      {project.repo.visibility === 'private' && (
        <span className="source-private">
          <FaLock aria-hidden="true" /> {t('projects.sourcePrivate')}
        </span>
      )}
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  variant: 'featured' | 'compact';
  headingLevel?: 'h3' | 'h4';
}

const ProjectCard: FC<ProjectCardProps> = ({ project, variant, headingLevel = 'h3' }) => {
  const { t } = useTranslation();
  const Heading = headingLevel;
  const titleId = `project-${project.slug}-title`;
  const isFeatured = variant === 'featured';
  const tags = isFeatured && project.cardTags ? project.cardTags : project.techStack.slice(0, 4);
  const hiddenTech = isFeatured && project.cardTags ? 0 : project.techStack.length - tags.length;

  return (
    <article className={`project-card project-card--${variant}`} aria-labelledby={titleId}>
      <div className="project-card__meta">
        <span className="status-chip">{project.status}</span>
        <span className="project-card__type">{project.projectType}</span>
      </div>
      <Heading id={titleId} className="project-card__title">
        <Link to={projectPath(project.slug)}>{project.name}</Link>
      </Heading>
      <p className="project-card__tagline">{project.tagline}</p>
      {isFeatured && project.proof && (
        <p className="project-proof">
          <span className="visually-hidden">{t('projects.keyResult')}: </span>
          <strong className="project-proof__value">{project.proof.value}</strong>
          <span className="project-proof__label">{project.proof.label}</span>
        </p>
      )}
      {project.award && (
        <p className="project-card__award">
          <FaTrophy aria-hidden="true" /> {project.award}
        </p>
      )}
      <p className="project-card__role">
        <FaCode aria-hidden="true" />
        <span>
          <span className="visually-hidden">{t('caseStudy.role')}: </span>
          {project.role}
        </span>
      </p>
      <ul className="tag-list project-card__tech" role="list" aria-label={t('projects.techLabel')}>
        {tags.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
        {hiddenTech > 0 && <li className="tag tag--more">+{hiddenTech}</li>}
      </ul>
      <ProjectLinks project={project} size={isFeatured ? 'regular' : 'small'} />
    </article>
  );
};

export default ProjectCard;
