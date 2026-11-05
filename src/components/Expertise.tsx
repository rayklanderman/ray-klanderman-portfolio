import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { EXPERTISE } from '../data/expertise';
import './Expertise.scss';

const Expertise: FC = () => {
  const { t } = useTranslation();
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container">
        <h2 id="expertise-title" className="section-title">
          {t('expertise.title')}
        </h2>
        <p className="section-subtitle">{t('expertise.subtitle')}</p>
        <div className="expertise-grid">
          {EXPERTISE.map((group) => (
            <article key={group.id} className="expertise-card" aria-labelledby={`expertise-${group.id}`}>
              <h3 id={`expertise-${group.id}`}>{group.title}</h3>
              <p>{group.description}</p>
              <ul className="tag-list" role="list">
                {group.skills.map((skill) => (
                  <li key={skill} className="tag">
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
