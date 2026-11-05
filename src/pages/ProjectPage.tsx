import { FC, ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaArrowRight, FaTrophy, FaYoutube } from 'react-icons/fa';
import { ProjectLinks } from '../components/ProjectCard';
import NotFoundPage from './NotFoundPage';
import {
  CATEGORY_LABELS,
  Project,
  adjacentProjects,
  getProjectBySlug,
  projectPath,
  publicRepoUrl,
} from '../data/projects';
import './ProjectPage.scss';

const Glance: FC<{ project: Project }> = ({ project }) => {
  const { t } = useTranslation();
  const repoUrl = publicRepoUrl(project);
  const sourceLabel =
    project.repo.visibility === 'public'
      ? t('projects.sourcePublic')
      : project.repo.visibility === 'private'
        ? t('projects.sourcePrivate')
        : t('projects.sourceNotListed');

  const rows: [string, ReactNode][] = [
    [t('caseStudy.role'), project.role],
    [t('caseStudy.status'), project.status],
    [t('caseStudy.type'), project.projectType],
    [t('caseStudy.context'), project.event],
    [t('caseStudy.years'), project.years],
    [t('caseStudy.categories'), project.categories.map((c) => CATEGORY_LABELS[c]).join(' · ')],
    [
      t('caseStudy.source'),
      repoUrl ? (
        <a href={repoUrl} target="_blank" rel="noopener noreferrer">
          {sourceLabel}
        </a>
      ) : (
        sourceLabel
      ),
    ],
  ];

  return (
    <dl className="case-study__glance">
      {rows
        .filter(([, value]) => Boolean(value))
        .map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
    </dl>
  );
};

const ProjectPage: FC = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFoundPage kind="project" />;
  }

  const { caseStudy: cs } = project;
  const { prev, next } = adjacentProjects(project.slug);

  return (
    <article className="case-study" aria-labelledby="case-study-title">
      <div className="container case-study__container">
        <nav aria-label={t('caseStudy.breadcrumb')} className="breadcrumb">
          <ol role="list">
            <li>
              <Link to="/">{t('menu.home')}</Link>
            </li>
            <li>
              <Link to={{ pathname: '/', hash: '#projects' }}>{t('menu.projects')}</Link>
            </li>
            <li aria-current="page">{project.name}</li>
          </ol>
        </nav>

        <header className="case-study__header">
          <div className="project-card__meta">
            <span className="status-chip">{project.status}</span>
            <span className="project-card__type">{project.projectType}</span>
          </div>
          <h1 id="case-study-title">{project.name}</h1>
          <p className="case-study__tagline">{project.tagline}</p>
          {project.proof && (
            <p className="project-proof project-proof--large">
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
          <p className="case-study__summary">{project.summary}</p>
          <ProjectLinks project={project} showCaseStudy={false} />
          {project.liveNote && <p className="case-study__note">{project.liveNote}</p>}
          {project.videoUrl && (
            <p className="case-study__video">
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                <FaYoutube aria-hidden="true" /> {t('caseStudy.watchDemo')}
                <span className="visually-hidden"> ({t('common.newTab')})</span>
              </a>
            </p>
          )}
        </header>

        <section className="case-study__section" aria-labelledby="cs-glance">
          <h2 id="cs-glance">{t('caseStudy.atAGlance')}</h2>
          <Glance project={project} />
          {project.highlights.length > 0 && (
            <>
              <h3 className="case-study__subhead">{t('caseStudy.highlights')}</h3>
              <ul className="case-study__list">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </>
          )}
          <h3 className="case-study__subhead">{t('caseStudy.techStack')}</h3>
          <ul className="tag-list" role="list">
            {project.techStack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <section className="case-study__section" aria-labelledby="cs-problem">
          <h2 id="cs-problem">{t('caseStudy.problem')}</h2>
          <p>{cs.problem}</p>
          <h3 className="case-study__subhead">{t('caseStudy.users')}</h3>
          <p>{cs.users}</p>
        </section>

        <section className="case-study__section" aria-labelledby="cs-built">
          <h2 id="cs-built">{t('caseStudy.built')}</h2>
          <ul className="case-study__list">
            {cs.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {cs.architecture && cs.architecture.length > 0 && (
          <section className="case-study__section" aria-labelledby="cs-architecture">
            <h2 id="cs-architecture">{t('caseStudy.architecture')}</h2>
            <ol className="flow" role="list">
              {cs.architecture.map((step, i) => (
                <li key={step.step} className="flow__step">
                  <span className="flow__index mono" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flow__name">{step.step}</span>
                  <span className="flow__detail">{step.detail}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {cs.challenges && cs.challenges.length > 0 && (
          <section className="case-study__section" aria-labelledby="cs-challenges">
            <h2 id="cs-challenges">{t('caseStudy.challenges')}</h2>
            <div className="case-study__challenges">
              {cs.challenges.map((c) => (
                <div key={c.title} className="challenge">
                  <h3>{c.title}</h3>
                  <p>{c.detail}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.quality && cs.quality.length > 0 && (
          <section className="case-study__section" aria-labelledby="cs-quality">
            <h2 id="cs-quality">{t('caseStudy.quality')}</h2>
            <ul className="case-study__list">
              {cs.quality.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {cs.results && cs.results.length > 0 && (
          <section className="case-study__section" aria-labelledby="cs-results">
            <h2 id="cs-results">{t('caseStudy.results')}</h2>
            <div className="table-scroll">
              <table className="results-table">
                <caption className="visually-hidden">{t('caseStudy.resultsCaption', { name: project.name })}</caption>
                <thead>
                  <tr>
                    <th scope="col">{t('caseStudy.measure')}</th>
                    <th scope="col">{t('caseStudy.value')}</th>
                    <th scope="col">{t('caseStudy.evidence')}</th>
                  </tr>
                </thead>
                <tbody>
                  {cs.results.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td>{r.value}</td>
                      <td>{r.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="case-study__section" aria-labelledby="cs-limitations">
          <h2 id="cs-limitations">{t('caseStudy.limitations')}</h2>
          <ul className="case-study__list">
            {cs.limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <nav className="case-study__pager" aria-label={t('caseStudy.moreProjects')}>
          {prev ? (
            <Link to={projectPath(prev.slug)} className="pager-link">
              <FaArrowLeft aria-hidden="true" />
              <span>
                <span className="pager-link__label">{t('caseStudy.previous')}</span>
                <span className="pager-link__name">{prev.name}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          <Link to={{ pathname: '/', hash: '#projects' }} className="btn btn--secondary btn--small">
            {t('caseStudy.allProjects')}
          </Link>
          {next ? (
            <Link to={projectPath(next.slug)} className="pager-link pager-link--next">
              <span>
                <span className="pager-link__label">{t('caseStudy.next')}</span>
                <span className="pager-link__name">{next.name}</span>
              </span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
};

export default ProjectPage;
