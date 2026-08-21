import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { FaGithub, FaExternalLinkAlt, FaGooglePlay } from 'react-icons/fa';
import { LiveBadge, WaxSeal } from './ui';
import './Projects.scss';

interface ProjectMetric {
  label: string;
  value: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  tags?: string[];
  url?: string;
  tier?: 'flagship' | 'secondary';
  shortDescription?: string;
  github?: string;
  playstore?: string;
  award?: string;
  entered?: string;
  live?: boolean;
  metrics?: ProjectMetric[];
  category?: string;
}

// Project URLs (screenshots removed — text-only dossiers until real ones are supplied)
const projectData: Record<string, { github: string; url: string; playstore?: string }> = {
  mrp2026: {
    github: 'https://github.com/rayklanderman/mrp-2026',
    url: '#'
  },
  luminae: {
    github: 'https://github.com/RealDevRay/luminae',
    url: 'https://luminae.qzz.io/'
  },
  aiHealth: {
    github: 'https://github.com/rayklanderman/ai-health-chat',
    url: 'https://aihealthchat.qzz.io/'
  },
  liveInterviewer: {
    github: 'https://github.com/rayklanderman/live-interviewer',
    url: 'https://live-interviewer-sepia.vercel.app/'
  },
  contentShapeshifterPro: {
    github: 'https://github.com/RealDevRay/Content-Shapeshifter-Pro',
    url: '#'
  },
  serenityAI: {
    github: 'https://github.com/rayklanderman/Serenity-AI',
    url: 'https://serenityai.qzz.io/'
  },
  tutaLearn: {
    github: 'https://github.com/rayklanderman/tutalearn',
    url: 'https://www.tutalearn.study/'
  },
  codebaseGenius: {
    github: 'https://github.com/rayklanderman/jaseci-proj',
    url: 'https://geniuscodebase.streamlit.app/'
  },
  weruDigital: {
    github: 'https://github.com/rayklanderman/weru_digital',
    url: 'https://werudigital.co.ke/',
    playstore: 'https://play.google.com/store/apps/details?id=com.werudigital.weru_digital&hl=en_US'
  },
  kaziConnect: {
    github: 'https://github.com/rayklanderman/kazi-connect',
    url: 'https://www.kaziconnect.work/'
  }
};

// Get project URL (treat '#' placeholders as absent so the real URL from projectData can win)
const getProjectUrl = (project: Project, projectKey: string): string => {
  const url = project.url && project.url !== '#' ? project.url : projectData[projectKey]?.url;
  return url || '#';
};

interface FlagshipDossierProps {
  project: Project;
  projectKey: string;
  t: TFunction;
}

const FlagshipDossier: FC<FlagshipDossierProps> = ({ project, projectKey, t }) => {
  const projectUrl = getProjectUrl(project, projectKey);
  const githubUrl = projectData[projectKey]?.github || null;
  const hasLinks = projectUrl !== '#' || githubUrl;

  return (
    <article className="dossier">
      {project.award && (
        <WaxSeal size="md" title={project.award} className="dossier__seal">
          <span className="dossier__seal-text">{project.award.split('—')[0].trim()}</span>
        </WaxSeal>
      )}

      <div className="dossier__grid">
        <div className="dossier__body">
          <div className="dossier__meta mono">
            {project.live && <LiveBadge />}
            {project.entered && <span className="dossier__entered">{project.entered}</span>}
          </div>
          <h3 className="dossier__title">
            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
              {project.name}
            </a>
          </h3>
          <p className="dossier__description">{project.description}</p>

          {project.metrics && project.metrics.length > 0 && (
            <ul className="dossier__metrics mono">
              {project.metrics.map((metric, idx) => (
                <li key={idx} className="dossier__metric">
                  <span className="dossier__metric-label">{metric.label}</span>
                  <span className="dossier__metric-value">{metric.value}</span>
                </li>
              ))}
            </ul>
          )}

          {hasLinks && (
            <div className="dossier__actions">
              {projectUrl !== '#' && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn primary"
                >
                  {t('projects.viewProject')}
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn secondary"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>

        <aside className="dossier__spec">
          <h4 className="dossier__spec-title mono">{t('projects.techSpec', 'Stack')}</h4>
          <ul className="dossier__tech mono">
            {project.technologies.map((tech, idx) => (
              <li key={idx} className="dossier__tech-item">
                <span className="dossier__tech-dot" aria-hidden="true" />
                {tech}
              </li>
            ))}
          </ul>
          {project.tags && project.tags.length > 0 && (
            <div className="dossier__tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-tag">{tag}</span>
              ))}
            </div>
          )}
        </aside>
      </div>
    </article>
  );
};

interface SecondaryCardProps {
  project: Project;
  projectKey: string;
  t: TFunction;
}

const SecondaryCard: FC<SecondaryCardProps> = ({ project, projectKey, t }) => {
  const projectUrl = getProjectUrl(project, projectKey);
  const githubUrl = projectData[projectKey]?.github || null;
  const playstoreUrl = projectData[projectKey]?.playstore || null;
  const shortDescription =
    project.shortDescription ||
    (project.description.length > 120
      ? `${project.description.substring(0, 120)}...`
      : project.description);

  return (
    <article className="secondary-card" data-key={projectKey}>
      <div className="secondary-card__body">
        <span className="secondary-card__category mono">{project.category}</span>
        <h4 className="secondary-card__title">
          <a href={projectUrl} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
        </h4>
        <p className="secondary-card__description">{shortDescription}</p>
      </div>
      <div className="secondary-card__links">
        {projectUrl !== '#' && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-card__link"
            aria-label={`View ${project.name} live`}
            title={t('projects.viewProject')}
          >
            <FaExternalLinkAlt />
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-card__link"
            aria-label={`View ${project.name} on GitHub`}
            title="GitHub"
          >
            <FaGithub />
          </a>
        )}
        {playstoreUrl && (
          <a
            href={playstoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-card__link"
            aria-label={`Get ${project.name} on Google Play`}
            title="Google Play"
          >
            <FaGooglePlay />
          </a>
        )}
      </div>
    </article>
  );
};

const Projects: FC = () => {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) as Record<string, Project>;

  const flagshipKeys = Object.keys(projects).filter((key) => projects[key].tier === 'flagship');
  const secondaryKeys = Object.keys(projects).filter((key) => projects[key].tier !== 'flagship');

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t('projects.title')}
        </motion.h2>

        {t('projects.subtitle') && (
          <motion.p
            className="section-subtitle"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('projects.subtitle')}
          </motion.p>
        )}

        <div className="dossiers">
          {flagshipKeys.map((key) => (
            <FlagshipDossier key={key} project={projects[key]} projectKey={key} t={t} />
          ))}
        </div>

        {secondaryKeys.length > 0 && (
          <>
            <motion.h3
              className="projects-subheading"
              initial={{ y: 16, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              {t('projects.more')}
            </motion.h3>
            <div className="secondary-grid">
              {secondaryKeys.map((key) => (
                <SecondaryCard key={key} project={projects[key]} projectKey={key} t={t} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
