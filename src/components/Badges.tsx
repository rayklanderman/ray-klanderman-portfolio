import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Badges.scss';

const Badges: React.FC = () => {
  const { t } = useTranslation();

  const badgeKeys = [
    { id: 'alx_data_analytics', logo: '/badges/alx-data-analytics.png' },
    { id: 'alx_machine_learning', logo: '/badges/alx-machine-learning.png' },
    { id: 'alx_data_science', logo: '/badges/alx-data-science.png' },
    { id: 'worldquant_data_science', logo: '/badges/worldquant.png' },
    { id: 'linux_kcna', logo: '/badges/linux-kcna.png' },
    { id: 'google_adk', logo: '/badges/google-cloud.png' },
    { id: 'google_security', logo: '/badges/google-cloud.png' },
    { id: 'google_load_balancing', logo: '/badges/google-cloud.png' },
    { id: 'google_serverless', logo: '/badges/google-cloud.png' },
    { id: 'anthropic_fluency', logo: '/badges/anthropic.png' },
    { id: 'oracle_cloud', logo: '/badges/oracle.png' },
    { id: 'power_learn_csdp', logo: '/badges/power-learn.png' }
  ];

  const platforms = badgeKeys.map(badge => ({
    id: badge.id,
    platform: t(`badges.platforms.${badge.id}.platform`),
    certification: t(`badges.platforms.${badge.id}.certification`),
    description: t(`badges.platforms.${badge.id}.description`),
    issuedBy: t(`badges.platforms.${badge.id}.issued_by`),
    expiration: t(`badges.platforms.${badge.id}.expiration`),
    badgeUrl: t(`badges.platforms.${badge.id}.badge_url`),
    credentialUrl: t(`badges.platforms.${badge.id}.credential_url`),
    profileUrl: t(`badges.platforms.${badge.id}.profile_url`),
    badgesCount: t(`badges.platforms.${badge.id}.badges_count`),
    highlightBadges: t(`badges.platforms.${badge.id}.highlight_badges`, { returnObjects: true, defaultValue: [] }) as string[],
    skills: t(`badges.platforms.${badge.id}.skills`, { returnObjects: true, defaultValue: [] }) as string[],
    logo: badge.logo
  }));

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
