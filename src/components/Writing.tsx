import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Writing.scss';

interface WritingItem {
  title: string;
  venue: string;
  date: string;
  teaser: string;
  url: string;
}

const Writing: FC = () => {
  const { t } = useTranslation();
  const items = t('writing.items', { returnObjects: true }) as WritingItem[];

  return (
    <section id="writing" className="writing-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t('writing.title')}
        </motion.h2>

        {t('writing.subtitle') && (
          <motion.p
            className="section-subtitle"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('writing.subtitle')}
          </motion.p>
        )}

        <div className="writing-grid">
          {items.map((item, idx) => (
            <motion.article
              key={idx}
              className="writing-card"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.05 * idx }}
              viewport={{ once: true }}
            >
              <span className="writing-card__quote" aria-hidden="true">
                &ldquo;
              </span>
              <p className="writing-card__meta mono">
                {item.venue} — {item.date}
              </p>
              <h3 className="writing-card__title">{item.title}</h3>
              <p className="writing-card__teaser">{item.teaser}</p>
              {item.url && item.url !== '#' && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="writing-card__link"
                >
                  {t('writing.readMore')} <span aria-hidden="true">→</span>
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writing;
