import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Badges.scss';

const Badges: React.FC = () => {
  const { t } = useTranslation();

  const platforms = [
    {
      id: 'google_skills',
      platform: t('badges.platforms.google_skills.platform'),
      description: t('badges.platforms.google_skills.description'),
      profileUrl: t('badges.platforms.google_skills.profile_url'),
      badgesCount: t('badges.platforms.google_skills.badges_count'),
      highlightBadges: t('badges.platforms.google_skills.highlight_badges', { returnObjects: true }) as string[],
      logo: '/badges/google-skills.svg'
    },
    {
      id: 'credly',
      platform: t('badges.platforms.credly.platform'),
      description: t('badges.platforms.credly.description'),
      profileUrl: t('badges.platforms.credly.profile_url'),
      highlightBadges: t('badges.platforms.credly.highlight_badges', { returnObjects: true }) as string[],
      logo: '/badges/credly.svg'
    },
    {
      id: 'oracle_cloud',
      platform: t('badges.platforms.oracle_cloud.platform'),
      certification: t('badges.platforms.oracle_cloud.certification'),
      description: t('badges.platforms.oracle_cloud.description'),
      issuedBy: t('badges.platforms.oracle_cloud.issued_by'),
      expiration: t('badges.platforms.oracle_cloud.expiration'),
      badgeUrl: t('badges.platforms.oracle_cloud.badge_url'),
      skills: t('badges.platforms.oracle_cloud.skills', { returnObjects: true }) as string[],
      logo: '/badges/oracle.svg'
    },
    {
      id: 'google_developers',
      platform: t('badges.platforms.google_developers.platform'),
      description: t('badges.platforms.google_developers.description'),
      profileUrl: t('badges.platforms.google_developers.profile_url'),
      logo: '/badges/google-developers.svg'
    },
    {
      id: 'microsoft_learn',
      platform: t('badges.platforms.microsoft_learn.platform'),
      description: t('badges.platforms.microsoft_learn.description'),
      profileUrl: t('badges.platforms.microsoft_learn.profile_url'),
      logo: '/badges/microsoft-learn.svg'
    },
    {
      id: 'parchment',
      platform: t('badges.platforms.parchment.platform'),
      description: t('badges.platforms.parchment.description'),
      profileUrl: t('badges.platforms.parchment.profile_url'),
      logo: '/badges/parchment.svg'
    },
    {
      id: 'alx_data_analytics',
      platform: t('badges.platforms.alx_data_analytics.platform'),
      certification: t('badges.platforms.alx_data_analytics.certification'),
      description: t('badges.platforms.alx_data_analytics.description'),
      issuedBy: t('badges.platforms.alx_data_analytics.issued_by'),
      credentialUrl: t('badges.platforms.alx_data_analytics.credential_url'),
      skills: t('badges.platforms.alx_data_analytics.skills', { returnObjects: true }) as string[],
      logo: '/badges/alx-africa.svg'
    },
    {
      id: 'power_learn_csdp',
      platform: t('badges.platforms.power_learn_csdp.platform'),
      certification: t('badges.platforms.power_learn_csdp.certification'),
      description: t('badges.platforms.power_learn_csdp.description'),
      issuedBy: t('badges.platforms.power_learn_csdp.issued_by'),
      credentialUrl: t('badges.platforms.power_learn_csdp.credential_url'),
      skills: t('badges.platforms.power_learn_csdp.skills', { returnObjects: true }) as string[],
      logo: '/badges/power-learn.svg'
    },
    {
      id: 'worldquant_data_science',
      platform: t('badges.platforms.worldquant_data_science.platform'),
      certification: t('badges.platforms.worldquant_data_science.certification'),
      description: t('badges.platforms.worldquant_data_science.description'),
      issuedBy: t('badges.platforms.worldquant_data_science.issued_by'),
      credentialUrl: t('badges.platforms.worldquant_data_science.credential_url'),
      skills: t('badges.platforms.worldquant_data_science.skills', { returnObjects: true }) as string[],
      logo: '/badges/worldquant.svg'
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
          className="platforms-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              className="platform-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="platform-header">
                <img 
                  src={platform.logo} 
                  alt={platform.platform} 
                  className="platform-logo"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'platform-fallback';
                    fallback.textContent = platform.platform.charAt(0).toUpperCase();
                    target.parentNode?.insertBefore(fallback, target.nextSibling);
                  }}
                />
                <h3>{platform.platform}</h3>
                {platform.certification && (
                  <div className="certification-badge">{platform.certification}</div>
                )}
              </div>

              <p className="platform-description">{platform.description}</p>

              {platform.badgesCount && (
                <div className="badges-count">
                  <span className="count">{platform.badgesCount}</span> badges earned
                </div>
              )}

              {platform.certification && platform.expiration && (
                <div className="certification-details">
                  <div className="issued-by">Issued by: {platform.issuedBy}</div>
                  <div className="expiration">Expires: {platform.expiration}</div>
                </div>
              )}

              {platform.certification && platform.issuedBy && !platform.expiration && (
                <div className="certification-details">
                  <div className="issued-by">Issued by: {platform.issuedBy}</div>
                </div>
              )}

              {platform.highlightBadges && platform.highlightBadges.length > 0 && (
                <div className="highlight-badges">
                  <h4>Highlight Badges:</h4>
                  <div className="badges-list">
                    {platform.highlightBadges.map((badge, i) => (
                      <span key={i} className="badge-item">{badge}</span>
                    ))}
                  </div>
                </div>
              )}

              {platform.skills && platform.skills.length > 0 && (
                <div className="platform-skills">
                  {platform.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className={`skill-tag skill-tag-${(i % 8) + 1}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <a 
                href={platform.badgeUrl || platform.credentialUrl || platform.profileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="platform-link"
              >
                {platform.certification ? 'View Certification' : 'View Profile'} →
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Badges;
