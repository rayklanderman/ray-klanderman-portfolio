import React from 'react';
import { useTranslation } from 'react-i18next';
import './Education_new.scss';

interface EducationItem {
  name: string;
  type: string;
  institution: string;
  period: string;
  status: string;
  description: string[];
  skills: string[];
}

const DEGREE_KEYS = ['bachelor_cs', 'diploma_ict'];

const EducationCard: React.FC<{ item: EducationItem }> = ({ item }) => {
  const type = item.type === 'ongoing' ? 'ongoing' : 'completed';
  return (
    <li className={`education-card ${type}`}>
      <span className={`status-badge ${type}`}>{item.status}</span>
      <h4 className="title">{item.name}</h4>
      <p className="institution">{item.institution}</p>
      <p className="period">{item.period}</p>
      {item.description.length > 0 && (
        <ul className="description">
          {item.description.map((desc) => (
            <li key={desc}>{desc}</li>
          ))}
        </ul>
      )}
      {item.skills.length > 0 && (
        <ul className="skills" role="list">
          {item.skills.map((skill) => (
            <li key={skill} className="skill-tag">
              {skill}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Education: React.FC = () => {
  const { t } = useTranslation();
  const raw = t('education.items', { returnObjects: true });
  const data = (raw && typeof raw === 'object' ? raw : {}) as Record<string, Partial<EducationItem>>;

  const toItem = (key: string): EducationItem => ({
    name: data[key].name ?? '',
    type: data[key].type ?? 'completed',
    institution: data[key].institution ?? '',
    period: data[key].period ?? '',
    status: data[key].status ?? '',
    description: Array.isArray(data[key].description) ? data[key].description! : [],
    skills: Array.isArray(data[key].skills) ? data[key].skills! : [],
  });

  const keys = Object.keys(data);
  const degrees = keys.filter((k) => DEGREE_KEYS.includes(k));
  const programmes = keys.filter((k) => !DEGREE_KEYS.includes(k));

  return (
    <section id="education" className="section section--alt education-section" aria-labelledby="education-title">
      <div className="container">
        <h2 id="education-title" className="section-title">
          {t('education.title')}
        </h2>

        <h3 className="education-group-title">{t('education.degrees')}</h3>
        <ul className="education-timeline" role="list">
          {degrees.map((key) => (
            <EducationCard key={key} item={toItem(key)} />
          ))}
        </ul>

        <h3 className="education-group-title">{t('education.programmes')}</h3>
        <ul className="education-timeline" role="list">
          {programmes.map((key) => (
            <EducationCard key={key} item={toItem(key)} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Education;
