import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Badges.scss';

const Badges: React.FC = () => {
  const { t } = useTranslation();

  const badges = [
    {
      id: 'google_cloud',
      name: t('badges.items.google_cloud.name'),
      url: 'https://www.cloudskillsboost.google/public_profiles/5d88baf2-c5cf-40af-bc9e-e995812ff504/badges/13957857',
      imageUrl: '/badges/google-cloud.svg',
      issuer: t('badges.items.google_cloud.issuer'),
      issueDate: '2024-02-15',
      skills: t('badges.items.google_cloud.skills', { returnObjects: true }) as string[]
    },
    {
      id: 'mlops',
      name: t('badges.items.mlops.name'),
      url: 'https://www.cloudskillsboost.google/public_profiles/5d88baf2-c5cf-40af-bc9e-e995812ff504/badges/12568746',
      imageUrl: '/badges/mlops.svg',
      issuer: t('badges.items.mlops.issuer'),
      issueDate: '2023-11-10',
      skills: t('badges.items.mlops.skills', { returnObjects: true }) as string[]
    },
    {
      id: 'oracle_cloud',
      name: t('badges.items.oracle_cloud.name'),
      url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=1234567',
      imageUrl: '/badges/oracle-cloud.svg',
      issuer: t('badges.items.oracle_cloud.issuer'),
      issueDate: '2023-09-05',
      skills: t('badges.items.oracle_cloud.skills', { returnObjects: true }) as string[]
    },
    {
      id: 'stem',
      name: t('badges.items.stem.name'),
      url: 'https://www.credly.com/badges/12345678',
      imageUrl: '/badges/stem.svg',
      issuer: t('badges.items.stem.issuer'),
      issueDate: '2023-08-20',
      skills: t('badges.items.stem.skills', { returnObjects: true }) as string[]
    },
    {
      id: 'responsible_ai',
      name: t('badges.items.responsible_ai.name'),
      url: 'https://www.cloudskillsboost.google/public_profiles/5d88baf2-c5cf-40af-bc9e-e995812ff504/badges/13899903',
      imageUrl: '/badges/responsible-ai.svg',
      issuer: t('badges.items.responsible_ai.issuer'),
      issueDate: '2023-07-15',
      skills: t('badges.items.responsible_ai.skills', { returnObjects: true }) as string[]
    },
    {
      id: 'prompt_design',
      name: t('badges.items.prompt_design.name'),
      url: 'https://www.cloudskillsboost.google/public_profiles/5d88baf2-c5cf-40af-bc9e-e995812ff504/badges/12560333',
      imageUrl: '/badges/prompt-design.svg',
      issuer: t('badges.items.prompt_design.issuer'),
      issueDate: '2023-06-10',
      skills: t('badges.items.prompt_design.skills', { returnObjects: true }) as string[]
    }
  ];

  return (
    <section id="badges" className="badges-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('badges.title')}
        </motion.h2>

        <motion.div 
          className="badges-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              className="badge-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="badge-header">
                <img 
                  src={badge.imageUrl} 
                  alt={badge.name} 
                  className="badge-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'badge-fallback';
                    fallback.textContent = badge.name.charAt(0).toUpperCase();
                    target.parentNode?.insertBefore(fallback, target.nextSibling);
                  }}
                />
                <h3>{badge.name}</h3>
              </div>
              <div className="badge-issuer">{badge.issuer}</div>
              <div className="badge-date">
                {new Date(badge.issueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </div>
              {badge.skills && badge.skills.length > 0 && (
                <div className="badge-skills">
                  {badge.skills.map((skill, i) => {
                    // Define colors that will work in all browsers
                    const colors = [
                      { bg: '#e0f2fe', text: '#0284c7' }, // Blue
                      { bg: '#dcfce7', text: '#16a34a' }, // Green
                      { bg: '#dbeafe', text: '#3b82f6' }, // Light blue
                      { bg: '#fef9c3', text: '#ca8a04' }, // Yellow
                      { bg: '#f1f5f9', text: '#0f172a' }, // Slate
                      { bg: '#ccfbf1', text: '#0d9488' }, // Teal
                      { bg: '#ffedd5', text: '#c2410c' }, // Orange
                      { bg: '#dcfce7', text: '#15803d' }  // Forest green
                    ];
                    
                    const index = i % colors.length;
                    
                    return (
                      <span 
                        key={i}
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: colors[index].bg,
                          color: colors[index].text,
                          borderRadius: '20px',
                          margin: '0 6px 6px 0',
                          fontSize: '14px',
                          fontWeight: 500,
                          border: `1px solid ${colors[index].text}20`
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              )}
              <a 
                href={badge.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="verify-link"
              >
                {t('badges.verify')}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Badges;
