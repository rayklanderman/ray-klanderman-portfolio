import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaCode, FaServer, FaBrain } from 'react-icons/fa';
import './CV_new.scss';

const SkillsCloud = () => {
  const { t } = useTranslation();
  const skillCategories = [
    {
      title: t('skills.aiData'),
      icon: <FaBrain />,
      skills: ["Python", "FastAPI", "Streamlit", "Pandas", "Pinecone", "Weaviate", "LangChain", "LlamaIndex", "OpenAI", "Anthropic", "Groq"]
    },
    {
      title: t('skills.frontendMobile'),
      icon: <FaCode />,
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Flutter", "Dart", "PWA"]
    },
    {
      title: t('skills.backendCloud'),
      icon: <FaServer />,
      skills: ["Node.js", "SQL", "NoSQL", "Firebase", "Supabase", "Google Cloud", "Docker", "REST APIs"]
    }
  ];

  return (
    <div className="skills-cloud-container">
      {skillCategories.map((category, idx) => (
        <motion.div 
          key={idx} 
          className="skill-category"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + (idx * 0.1) }}
        >
          <h4 className="category-title">
            {category.icon} {category.title}
          </h4>
          <div className="skills-list">
            {category.skills.map((skill, i) => (
              <span key={i} className="skill-badge">{skill}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const CV: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section 
      id="profile"
      className="cv-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cv-content">
        <motion.div 
          className="profile-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title">{t('profile.title')}</h2>
          <div className="profile-content">
            <p>{t('profile.description')}</p>
            
            <SkillsCloud />

            <div style={{ marginTop: '2rem' }}>
              <a 
                href="https://www.linkedin.com/in/raymondklanderman/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-button"
              >
                <FaLinkedin /> {t('skills.viewLinkedIn')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CV;
