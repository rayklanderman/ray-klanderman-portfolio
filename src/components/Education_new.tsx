import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Education.scss';

const Education: React.FC = () => {
  const { t } = useTranslation();

  const educationItems = [
    {
      id: 'alx',
      name: t('education.items.alx.name', 'ALX Data Analytics Program'),
      institution: t('education.items.alx.institution', 'Data Analytics Cohort 2025'),
      period: t('education.items.alx.period', '2025 - Present'),
      status: t('education.ongoing', 'Ongoing'),
      description: [
        t('education.items.alx.description1', 'Gaining expertise in data cleaning, visualization, and interpretation using SQL, Power BI, and Tableau.'),
        t('education.items.alx.description2', 'Applying Agile methodologies for collaborative problem-solving.')
      ],
      skills: [
        t('skills.sql', 'SQL'), 
        t('skills.powerbi', 'Power BI'), 
        t('skills.tableau', 'Tableau'), 
        t('skills.agile', 'Agile')
      ]
    },
    {
      id: 'worldquant_cv',
      name: t('education.items.worldquant_cv.name', 'Applied AI Lab: Deep Learning for Computer Vision'),
      institution: t('education.items.worldquant_cv.institution', 'WorldQuant University'),
      period: t('education.items.worldquant_cv.period', '2025'),
      status: t('education.ongoing', 'Ongoing'),
      description: [
        t('education.items.worldquant_cv.description1', 'Mastering deep learning frameworks and computer vision techniques'),
        t('education.items.worldquant_cv.description2', 'Building and deploying real-world AI applications')
      ],
      skills: [
        t('skills.deepLearning', 'Deep Learning'), 
        t('skills.computerVision', 'Computer Vision'), 
        t('skills.ai', 'AI')
      ]
    },
    {
      id: 'worldquant_ds',
      name: t('education.items.worldquant_ds.name', 'Applied Data Science Lab'),
      institution: t('education.items.worldquant_ds.institution', 'WorldQuant University'),
      period: t('education.items.worldquant_ds.period', '2025'),
      status: t('education.ongoing', 'Ongoing'),
      description: [
        t('education.items.worldquant_ds.description1', 'Advanced data analysis and machine learning techniques'),
        t('education.items.worldquant_ds.description2', 'Real-world data science project implementation')
      ],
      skills: [
        t('skills.dataScience', 'Data Science'), 
        t('skills.machineLearning', 'Machine Learning'), 
        t('skills.analytics', 'Analytics')
      ]
    },
    {
      id: 'code_in_place',
      name: t('education.items.code_in_place.name', 'Code in Place: Introduction to Programming with Python'),
      institution: t('education.items.code_in_place.institution', 'Stanford University'),
      period: t('education.items.code_in_place.period', '2024'),
      status: t('education.completed', 'Completed'),
      description: [
        t('education.items.code_in_place.description1', 'Intensive Python programming course from Stanford University'),
        t('education.items.code_in_place.description2', 'Completed diagnostic assessment and final project with distinction')
      ],
      skills: [
        t('skills.python', 'Python'), 
        t('skills.programmingFundamentals', 'Programming Fundamentals'), 
        t('skills.diagnosticBadge', 'Diagnostic Badge'), 
        t('skills.finalProjectBadge', 'Final Project Badge')
      ]
    },
    {
      id: 'mua_diploma',
      name: t('education.items.mua_diploma.name', 'Diploma in Information Communication Technology'),
      institution: t('education.items.mua_diploma.institution', 'Management University of Africa (MUA)'),
      period: t('education.items.mua_diploma.period', '2021-2024'),
      status: t('education.completed', 'Completed'),
      description: [
        t('education.items.mua_diploma.description1', 'Graduated with Distinction'),
        t('education.items.mua_diploma.description2', 'Focus on modern software development and IT infrastructure')
      ],
      skills: [
        t('skills.softwareDevelopment', 'Software Development'), 
        t('skills.itInfrastructure', 'IT Infrastructure'), 
        t('skills.projectManagement', 'Project Management')
      ]
    }
  ];

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
