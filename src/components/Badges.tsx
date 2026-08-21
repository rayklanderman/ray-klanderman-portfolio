import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { WaxSeal } from './ui';
import './Badges.scss';

type BadgeTier = 'primary' | 'more';

interface BadgeEntry {
  id: string;
  logo: string;
  tier: BadgeTier;
}

const badgeKeys: BadgeEntry[] = [
  { id: 'oracle_cloud', logo: '/badges/Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate.png', tier: 'primary' },
  { id: 'worldquant_data_science', logo: '/badges/Applied Data Science Lab.png', tier: 'primary' },
  { id: 'google_adk', logo: '/badges/Engineer AI Agents with Agent Development Kit (ADK).png', tier: 'primary' },
  { id: 'linux_kcna', logo: '/badges/KCNA-Kubernetes and Cloud Native Associate.png', tier: 'primary' },
  { id: 'google_skills', logo: '/badges/Google skills.gif', tier: 'more' },
  { id: 'aws_educate_genai', logo: '/badges/AWS Educate Introduction to Generative AI - Training Badge.png', tier: 'more' },
  { id: 'aws_educate_ml', logo: '/badges/AWS Educate Machine Learning Foundations - Training Badge.png', tier: 'more' },
  { id: 'ibm_granite', logo: '/badges/Code Generation and Optimization Using IBM Granite.png', tier: 'more' },
  { id: 'bcs_generative_ai', logo: '/badges/BCS Generative AI.jpg', tier: 'more' },
  { id: 'anthropic_fluency', logo: '/badges/AI Fluency-Framework & Foundations.jpg', tier: 'more' },
  { id: 'power_learn_csdp', logo: '/badges/Power Learn Project Africa Certificate.png', tier: 'more' },
  { id: 'google_security', logo: '/badges/Implement Cloud Security Fundamentals on Google Cloud Skill Badge.png', tier: 'more' },
  { id: 'google_load_balancing', logo: '/badges/Implement Load Balancing on Compute Engine Skill Badge.png', tier: 'more' },
  { id: 'google_serverless', logo: '/badges/Develop Serverless Applications on Cloud Run Skill Badge.png', tier: 'more' },
  { id: 'google_prompt_design', logo: '/badges/Prompt Design in Vertex AI Skill Badge.png', tier: 'more' },
  { id: 'alx_data_analytics', logo: '/badges/Data-analytics-certificate-raymond-klanderman(ALX).png', tier: 'more' },
  { id: 'alx_machine_learning', logo: '/badges/Machine-learning-certificate-raymond-klanderman(ALX).png', tier: 'more' },
  { id: 'alx_data_science', logo: '/badges/Data-science-certificate-raymond-klanderman(ALX).png', tier: 'more' }
];

interface Platform {
  id: string;
  platform: string;
  certification: string;
  description: string;
  issuedBy: string;
  expiration: string;
  badgeUrl: string;
  credentialUrl: string;
  profileUrl: string;
  badgesCount: string;
  skills: string[];
  logo: string;
  tier: BadgeTier;
}

const resolvePlatform = (badge: BadgeEntry, t: TFunction): Platform => ({
  id: badge.id,
  platform: t(`badges.platforms.${badge.id}.platform`, { defaultValue: '' }) || badge.id,
  certification: t(`badges.platforms.${badge.id}.certification`, { defaultValue: '' }),
  description: t(`badges.platforms.${badge.id}.description`, { defaultValue: '' }),
  issuedBy: t(`badges.platforms.${badge.id}.issued_by`, { defaultValue: '' }),
  expiration: t(`badges.platforms.${badge.id}.expiration`, { defaultValue: '' }),
  badgeUrl: t(`badges.platforms.${badge.id}.badge_url`, { defaultValue: '' }),
  credentialUrl: t(`badges.platforms.${badge.id}.credential_url`, { defaultValue: '' }),
  profileUrl: t(`badges.platforms.${badge.id}.profile_url`, { defaultValue: '' }),
  badgesCount: t(`badges.platforms.${badge.id}.badges_count`, { defaultValue: '' }),
  skills: t(`badges.platforms.${badge.id}.skills`, { returnObjects: true, defaultValue: [] }) as string[],
  logo: badge.logo,
  tier: badge.tier
});

const renderLogo = (platform: Platform) => (
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
);

const ALXSummaryCard: React.FC<{ t: TFunction }> = ({ t }) => {
  const links = [
    { id: 'alx_data_analytics', name: 'Data Analytics' },
    { id: 'alx_machine_learning', name: 'Machine Learning' },
    { id: 'alx_data_science', name: 'Data Science' }
  ];

  return (
    <div className="platform-card platform-card--alx">
      <div className="platform-header">
        {renderLogo({
          id: 'alx',
          platform: 'ALX Africa',
          logo: badgeKeys.find((b) => b.id === 'alx_data_analytics')?.logo || ''
        } as Platform)}
        <h3>ALX Africa</h3>
        <div className="platform-certification">
          {t('badges.alx_summary.certification')}
        </div>
      </div>
      <p className="platform-description">{t('badges.alx_summary.description')}</p>
      <ul className="alx-links">
        {links.map((link) => {
          const url = t(`badges.platforms.${link.id}.credential_url`, { defaultValue: '' });
          if (!url) return null;
          return (
            <li key={link.id}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {link.name} <FaExternalLinkAlt />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Badges: React.FC = () => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  const platforms = badgeKeys.map((badge) => resolvePlatform(badge, t));
  const primary = platforms.filter((p) => p.tier === 'primary');
  const more = platforms.filter((p) => p.tier === 'more');
  const moreCount = more.length;

  const toggle = () => setIsExpanded((prev) => !prev);

  const moreGrid = (
    <div id="more-certs" className="platforms-grid platforms-grid--dense">
      {more.map((platform) => (
        <div key={platform.id} className="platform-card platform-card--dense">
          <div className="platform-header">
            {renderLogo(platform)}
            <div className="dense-info">
              <h3>{platform.platform}</h3>
              {platform.issuedBy && <div className="dense-issuer">{platform.issuedBy}</div>}
            </div>
          </div>
          <a
            href={platform.badgeUrl || platform.credentialUrl || platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dense-link"
            aria-label={`View ${platform.platform} credential`}
          >
            <FaExternalLinkAlt />
          </a>
        </div>
      ))}
    </div>
  );

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

        <div className="platforms-grid">
          <ALXSummaryCard t={t} />
          {primary.map((platform, index) => (
            <motion.div
              key={platform.id}
              className="platform-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
            >
              <WaxSeal size="sm" title={platform.certification} className="platform-card__seal">
                {t('badges.certified')}
              </WaxSeal>
              <div className="platform-header">
                {renderLogo(platform)}
                <h3>{platform.platform}</h3>
              </div>

              {platform.certification && (
                <div className="platform-certification">{platform.certification}</div>
              )}

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

              {platform.skills && platform.skills.length > 0 && (
                <div className="platform-skills">
                  {platform.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">
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
        </div>

        {moreCount > 0 && (
          <>
            <div className="badges-toggle-wrap">
              <button
                className="badges-toggle"
                onClick={toggle}
                aria-expanded={isExpanded}
                aria-controls="more-certs"
              >
                <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                {isExpanded
                  ? t('badges.showLess')
                  : `${t('badges.showMore')} (${moreCount})`}
              </button>
            </div>

            {reduceMotion ? (
              isExpanded && moreGrid
            ) : (
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="more-certs-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    {moreGrid}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Badges;
