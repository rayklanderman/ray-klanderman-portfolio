import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Projects.scss';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  featured?: boolean;
  image?: string;
  github?: string;
  shortDescription?: string;
}

const Projects: FC = () => {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) as Record<string, Project>;

  // Project URLs and images
  const projectData: Record<string, { image: string; github: string; url: string }> = {
    aiHealth: {
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com/rayklanderman/ai-health-chat',
      url: 'https://ai-health-chat.vercel.app/'
    },
    sauti: {
      image: 'https://images.unsplash.com/photo-1522071820081-009c5fdc0a27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com/rayklanderman/civic-engagement-fabric',
      url: 'https://civic-engagement-fabric-one.vercel.app/'
    },
    dutch: {
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80',
      github: 'https://github.com/rayklanderman/dutchlearning',
      url: 'https://dutchlearning.vercel.app/'
    },
    civic: {
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com/rayklanderman/civic-alert-lite',
      url: 'https://civic-alert-lite.web.app/'
    },
    kpesa: {
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com/rayklanderman/k-pesa',
      url: '#'
    },
    kaziConnect: {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      github: 'https://github.com/rayklanderman/kazi-connect',
      url: 'https://kazi-connect.vercel.app/'
    }
  };

  const getProjectImage = (projectKey: string) => {
    return projectData[projectKey]?.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
  };

  // Get GitHub URL from project data
  const getGitHubUrl = (projectKey: string) => {
    return projectData[projectKey]?.github || null;
  };

  // Get project URL
  const getProjectUrl = (project: Project, projectKey: string) => {
    return project.url || projectData[projectKey]?.url || '#';
  };

  // Get short description or truncate the main description
  const getShortDescription = (project: Project) => {
    if (project.shortDescription) return project.shortDescription;
    // Truncate description if it's too long (more than 120 chars)
    return project.description.length > 120 
      ? `${project.description.substring(0, 120)}...` 
      : project.description;
  };

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
        
        <div className="projects-grid">
          {Object.entries(projects).map(([key, project]) => {
            const isFeatured = project.featured === true;
            const githubUrl = getGitHubUrl(key);
            const projectUrl = getProjectUrl(project, key);
            const shortDescription = getShortDescription(project);
            
            return (
              <article 
                key={key} 
                className={`project-card${isFeatured ? ' featured' : ''}`}
                data-key={key}
                onClick={() => projectUrl !== '#' && window.open(projectUrl, '_blank')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && projectUrl !== '#') {
                    window.open(projectUrl, '_blank');
                  }
                }}
              >
                {isFeatured && (
                  <span className="featured-badge">
                    {t('projects.featured') || 'Featured'}
                  </span>
                )}
                
                <h3 className="project-title">
                  <a 
                    href={projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.name}
                  </a>
                </h3>
                
                <p className="project-description">{shortDescription}</p>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-technologies">
                    {project.technologies.map((tech: string, idx: number) => (
                      <span 
                        className="project-technology" 
                        key={idx} 
                        data-tech={tech}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="project-actions">
                  {projectUrl !== '#' && (
                    <a
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {t('projects.viewProject') || 'View Live'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                  
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn secondary"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View ${project.name} on GitHub`}
                      title="View on GitHub"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="sr-only">GitHub</span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
