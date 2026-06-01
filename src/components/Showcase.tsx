import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Showcase.scss';

const Showcase: FC = () => {
  const { t } = useTranslation();

  return (
    <section id="showcase" className="showcase-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t('showcase.title')}
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {t('showcase.description')}
        </motion.p>
        
        <motion.div 
          className="video-container"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <iframe 
            className="video-iframe"
            src="https://www.youtube.com/embed/videoseries?si=55iPflPwk5-WWJ2g&amp;list=PL6L2igbPbRQjRmYLSaT5QH-lKJhYJsk4G" 
            title="My Showcase Playlist" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
