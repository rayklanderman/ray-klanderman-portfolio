import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Badges.scss';

const Badges: React.FC = () => {
  const { t } = useTranslation();

  const badgeKeys = [
    { id: 'alx_data_analytics', logo: '/badges/Data-analytics-certificate-raymond-klanderman(ALX).png' },
    { id: 'alx_data_science', logo: '/badges/Data-science-certificate-raymond-klanderman(ALX).png' },
    { id: 'alx_machine_learning', logo: '/badges/Machine-learning-certificate-raymond-klanderman(ALX).png' },
    { id: 'worldquant_data_science', logo: '/badges/Applied Data Science Lab.png' },
    { id: 'linux_kcna', logo: '/badges/KCNA-Kubernetes and Cloud Native Associate.png' },
    { id: 'google_adk', logo: '/badges/Engineer AI Agents with Agent Development Kit (ADK).png' },
    { id: 'google_security', logo: '/badges/Implement Cloud Security Fundamentals on Google Cloud Skill Badge.png' },
    { id: 'google_load_balancing', logo: '/badges/Implement Load Balancing on Compute Engine Skill Badge.png' },
    { id: 'google_serverless', logo: '/badges/Develop Serverless Applications on Cloud Run Skill Badge.png' },
    { id: 'anthropic_fluency', logo: '/badges/AI Fluency-Framework & Foundations.jpg' },
    { id: 'oracle_cloud', logo: '/badges/Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate.png' },
    { id: 'bcs_generative_ai', logo: '/badges/BCS Generative AI.jpg' },
    { id: 'google_skills', logo: '/badges/Google skills.gif' },
    { id: 'google_prompt_design', logo: '/badges/Prompt Design in Vertex AI Skill Badge.png' },
    { id: 'aws_educate_genai', logo: '/badges/AWS Educate Introduction to Generative AI - Training Badge.png' },
    { id: 'aws_educate_ml', logo: '/badges/AWS Educate Machine Learning Foundations - Training Badge.png' },
    { id: 'ibm_granite', logo: '/badges/Code Generation and Optimization Using IBM Granite.png' },
    { id: 'power_learn_csdp', logo: '/badges/power-learn.png' }
  ];

  const platforms = badgeKeys.map(badge => {
    const pPlatform = t(`badges.platforms.${badge.id}.platform`, { defaultValue: '' });
    // If the platform name isn't found, default it to just the ID or omit it if we want.
    // However, if we know it's missing entirely in some languages, fallback to English or hide it.
    // But mostly we just want to avoid rendering raw i18n keys for optional fields.
    return {
      id: badge.id,
      platform: pPlatform || badge.id,
      certification: t(`badges.platforms.${badge.id}.certification`, { defaultValue: '' }),
      description: t(`badges.platforms.${badge.id}.description`, { defaultValue: '' }),
      issuedBy: t(`badges.platforms.${badge.id}.issued_by`, { defaultValue: '' }),
      expiration: t(`badges.platforms.${badge.id}.expiration`, { defaultValue: '' }),
      badgeUrl: t(`badges.platforms.${badge.id}.badge_url`, { defaultValue: '' }),
      credentialUrl: t(`badges.platforms.${badge.id}.credential_url`, { defaultValue: '' }),
      profileUrl: t(`badges.platforms.${badge.id}.profile_url`, { defaultValue: '' }),
      badgesCount: t(`badges.platforms.${badge.id}.badges_count`, { defaultValue: '' }),
      highlightBadges: t(`badges.platforms.${badge.id}.highlight_badges`, { returnObjects: true, defaultValue: [] }) as string[],
      skills: t(`badges.platforms.${badge.id}.skills`, { returnObjects: true, defaultValue: [] }) as string[],
      logo: badge.logo
    };
  });

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
