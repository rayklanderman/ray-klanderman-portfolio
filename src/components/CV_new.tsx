import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaLinkedin } from 'react-icons/fa';
import './CV_new.scss';

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
            <a 
              href="https://www.linkedin.com/in/raymondklanderman/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-button"
            >
              <FaLinkedin /> View My LinkedIn Profile
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CV;
