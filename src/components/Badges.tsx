import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { WaxSeal } from './ui';
import './Badges.scss';

// 'grouped' badges are summarised inside another card (e.g. ALX) and not listed on their own.
type BadgeTier = 'primary' | 'more' | 'grouped';

const MAX_SKILLS = 4;

interface BadgeEntry {
  id: string;
  logo: string;
  tier: BadgeTier;
}

const badgeKeys: BadgeEntry[] = [
  { id: 'google_pca', logo: '/badges/Professional Cloud Architect Certification.png', tier: 'primary' },
  { id: 'oracle_cloud', logo: '/badges/Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate.png', tier: 'primary' },
  { id: 'linux_kcna', logo: '/badges/KCNA-Kubernetes and Cloud Native Associate.png', tier: 'primary' },
  { id: 'worldquant_data_science', logo: '/badges/Applied Data Science Lab.png', tier: 'primary' },
  { id: 'google_adk', logo: '/badges/Engineer AI Agents with Agent Development Kit (ADK).png', tier: 'primary' },
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
  { id: 'alx_data_analytics', logo: '/badges/Data-analytics-certificate-raymond-klanderman(ALX).png', tier: 'grouped' },
  { id: 'alx_machine_learning', logo: '/badges/Machine-learning-certificate-raymond-klanderman(ALX).png', tier: 'grouped' },
  { id: 'alx_data_science', logo: '/badges/Data-science-certificate-raymond-klanderman(ALX).png', tier: 'grouped' }
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

const targetUrl = (platform: Platform) =>
  platform.badgeUrl || platform.credentialUrl || platform.profileUrl;

const renderLogo = (platform: Pick<Platform, 'platform' | 'logo'>) => (
  <span className="logo-box">
    <img
      src={platform.logo}
      alt={platform.platform}
      className="platform-logo"
      loading="lazy"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallback = document.createElement('span');
        fallback.className = 'platform-fallback';
        fallback.textContent = platform.platform.charAt(0).toUpperCase();
        target.parentNode?.appendChild(fallback);
      }}
    />
  </span>
);

const ALXSummaryCard: React.FC<{ t: TFunction }> = ({ t }) => {
  const links = [
    { id: 'alx_data_analytics', name: 'Data Analytics' },
    { id: 'alx_machine_learning', name: 'Machine Learning' },
    { id: 'alx_data_science', name: 'Data Science' }
  ];

  return (
    <>
      <header className="card-head">
        {renderLogo({
          platform: 'ALX Africa',
          logo: badgeKeys.find((b) => b.id === 'alx_data_analytics')?.logo || ''
        })}
        <div className="card-titles">
          <span className="card-eyebrow">ALX Africa</span>
          <h3>{t('badges.alx_summary.certification')}</h3>
        </div>
      </header>
      <p className="platform-description">{t('badges.alx_summary.description')}</p>
      <ul className="alx-links">
        {links.map((link) => {
          const url = t(`badges.platforms.${link.id}.credential_url`, { defaultValue: '' });
          if (!url) return null;
          return (
            <li key={link.id}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <span>{link.name}</span>
                <FaExternalLinkAlt aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </>
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

  const cardMotion = (index: number) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, delay: 0.05 * index }
  });

  const moreGrid = (
    <div id="more-certs" className="platforms-grid platforms-grid--dense">
      {more.map((platform) => {
        const title = platform.certification || platform.platform;
        const subtitle = platform.certification
          ? platform.platform
          : platform.badgesCount
            ? `${platform.badgesCount} ${t('badges.badgesEarned', { defaultValue: 'badges earned' })}`
            : '';
        return (
          <a
            key={platform.id}
            href={targetUrl(platform)}
            target="_blank"
            rel="noopener noreferrer"
            className="platform-card platform-card--dense"
            aria-label={`${title} — ${platform.platform}`}
          >
            {renderLogo(platform)}
            <div className="dense-info">
              <h3>{title}</h3>
              {subtitle && <div className="dense-issuer">{subtitle}</div>}
            </div>
            <FaExternalLinkAlt className="dense-icon" aria-hidden="true" />
          </a>
        );
      })}
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
          {primary.map((platform, index) => {
            const title = platform.certification || platform.platform;
            const visibleSkills = platform.skills.slice(0, MAX_SKILLS);
            const hiddenSkills = platform.skills.slice(MAX_SKILLS);
            return (
              <motion.article
                key={platform.id}
                className="platform-card"
                {...cardMotion(index)}
              >
                <header className="card-head">
                  {renderLogo(platform)}
                  <div className="card-titles">
                    <span className="card-eyebrow">{platform.platform}</span>
                    <h3>{title}</h3>
                  </div>
                </header>

                <p className="platform-description">{platform.description}</p>

                {visibleSkills.length > 0 && (
                  <ul className="platform-skills" aria-label="Skills">
                    {visibleSkills.map((skill) => (
                      <li key={skill} className="skill-tag">
                        {skill}
                      </li>
                    ))}
                    {hiddenSkills.length > 0 && (
                      <li
                        className="skill-tag skill-tag--more"
                        title={hiddenSkills.join(', ')}
                      >
                        +{hiddenSkills.length} {t('badges.moreSkills', { defaultValue: 'more' })}
                      </li>
                    )}
                  </ul>
                )}

                <div className="card-footer">
                  <dl className="card-meta">
                    {platform.issuedBy && (
                      <div>
                        <dt>{t('badges.issuedBy', { defaultValue: 'Issued by' })}</dt>
                        <dd>{platform.issuedBy}</dd>
                      </div>
                    )}
                    {platform.expiration && (
                      <div>
                        <dt>{t('badges.expires', { defaultValue: 'Expires' })}</dt>
                        <dd>{platform.expiration}</dd>
                      </div>
                    )}
                  </dl>
                  <WaxSeal size="sm" title={title} className="card-footer__seal">
                    {t('badges.certified')}
                  </WaxSeal>
                </div>

                <a
                  href={targetUrl(platform)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-link"
                >
                  {platform.certification
                    ? t('badges.viewCertification', { defaultValue: 'View Certification' })
                    : t('badges.viewProfile', { defaultValue: 'View Profile' })}{' '}
                  →
                </a>
              </motion.article>
            );
          })}

          <motion.article className="platform-card platform-card--alx" {...cardMotion(primary.length)}>
            <ALXSummaryCard t={t} />
          </motion.article>
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
