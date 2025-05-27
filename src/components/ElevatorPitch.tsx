import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './ElevatorPitch.scss';

const ElevatorPitch: FC = () => {
  const { t } = useTranslation();

  return (
    <section id="elevator" className="elevator-pitch-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t('elevatorPitch.title', 'My Elevator Pitch')}
        </motion.h2>
        
        <div className="elevator-content">
          <motion.div 
            className="video-container"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <iframe 
              className="video-iframe"
              src="https://www.youtube.com/embed/un_eBNkqCRc?rel=0&showinfo=0&controls=1&autoplay=0&mute=0&loop=0&modestbranding=1&fs=1&color=white&hl=en&iv_load_policy=3&quality=hd1080" 
              title="My Elevator Pitch" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
          
          <motion.div 
            className="pitch-content"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3>{t('elevatorPitch.subtitle', 'Why Work With Me?')}</h3>
            
            <div className="pitch-script">
              <p>{t('elevatorPitch.paragraphs.0', 'Did you know many young people in Africa still struggle to access the right jobs, despite being highly skilled?')}</p>
              
              <p>{t('elevatorPitch.paragraphs.1', 'I\'m Raymond Klanderman, a global AI Prompt Engineer, Fullstack Developer, and aspiring Data Analyst. I specialize in building smart digital tools that connect people to real opportunities—through the power of data and AI.')}</p>
              
              <p>{t('elevatorPitch.paragraphs.2', 'I recently led the development of AI Health Chat, a project that won 1st place in an innovation hackathon by using Grok to deliver personalized, privacy-focused health insights.')}</p>
              
              <p>{t('elevatorPitch.paragraphs.3', 'Now, I\'m building Kazi Connect—an AI-powered job-matching platform that uses skill-based logic to pair youth with verified, scam-free jobs.')}</p>
              
              <p>{t('elevatorPitch.paragraphs.4', 'I turn data into decisions, and LLMs into accessible solutions—and I\'m excited to collaborate with mission-driven teams creating real-world impact.')}</p>
            </div>
            
            <motion.a 
              href="https://www.linkedin.com/in/raymondklanderman/" 
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              {t('elevatorPitch.cta', 'Why Work With Me')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ElevatorPitch;
