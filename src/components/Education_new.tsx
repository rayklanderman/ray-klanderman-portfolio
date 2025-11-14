import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Education_new.scss';

const Education: React.FC = () => {
  const { t } = useTranslation();

  const educationData = t('education.items', { returnObjects: true }) as Record<string, {
    name: string;
    institution: string;
    period: string;
    status: string;
    description: string[];
    skills: string[];
  }>;

  const educationItems = Object.keys(educationData).map(key => ({
    id: key,
    name: educationData[key].name,
    institution: educationData[key].institution,
    period: educationData[key].period,
    status: educationData[key].status,
    description: educationData[key].description || [],
    skills: educationData[key].skills || []
  }));

  return (
    <section id="education" className="container education-section">
      <motion.h2
        className="section-title"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        {t('education.title', 'Education')}
      </motion.h2>
      
      <div className="education-timeline">
        {educationItems.map((edu, index) => (
          <motion.div
            key={edu.id}
            className="education-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
          >
            <h3 className="title">{edu.name}</h3>
            <div className="institution">{edu.institution}</div>
            <div className="status-period">
              <span className={`status ${edu.status.toLowerCase()}`}>{edu.status}</span>
              <span className="period">{edu.period}</span>
            </div>
            <ul className="description">
              {edu.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            <div className="skills">
              {edu.skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="skill-tag"
                  data-tech={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
