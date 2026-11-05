import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { WaxSeal } from './ui';
import './Badges.scss';

/**
 * Credentials are grouped by what they are, so a skill badge is never presented
 * as a professional certification:
 * - professional: proctored or assessed industry certifications
 * - programme: certificates for completing a multi-week training programme
 * - badge: course completions and digital learning badges (collapsed by default)
 */
type CredentialKind = 'professional' | 'programme' | 'badge';

interface BadgeEntry {
  id: string;
  logo: string;
  kind: CredentialKind;
}

const MAX_SKILLS = 4;

const badgeKeys: BadgeEntry[] = [
  { id: 'google_pca', logo: '/badges/Professional Cloud Architect Certification.png', kind: 'professional' },
  { id: 'oracle_cloud', logo: '/badges/Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate.png', kind: 'professional' },
  { id: 'linux_kcna', logo: '/badges/KCNA-Kubernetes and Cloud Native Associate.png', kind: 'professional' },
  { id: 'bcs_generative_ai', logo: '/badges/BCS Generative AI.jpg', kind: 'professional' },
  { id: 'alx_data_science', logo: '/badges/Data-science-certificate-raymond-klanderman(ALX).png', kind: 'programme' },
  { id: 'alx_machine_learning', logo: '/badges/Machine-learning-certificate-raymond-klanderman(ALX).png', kind: 'programme' },
  { id: 'alx_data_analytics', logo: '/badges/Data-analytics-certificate-raymond-klanderman(ALX).png', kind: 'programme' },
  { id: 'power_learn_csdp', logo: '/badges/Power Learn Project Africa Certificate.png', kind: 'programme' },
  { id: 'worldquant_data_science', logo: '/badges/Applied Data Science Lab.png', kind: 'programme' },
  { id: 'google_adk', logo: '/badges/Engineer AI Agents with Agent Development Kit (ADK).png', kind: 'badge' },
  { id: 'google_skills', logo: '/badges/Google skills.webp', kind: 'badge' },
  { id: 'google_serverless', logo: '/badges/Develop Serverless Applications on Cloud Run Skill Badge.png', kind: 'badge' },
  { id: 'google_security', logo: '/badges/Implement Cloud Security Fundamentals on Google Cloud Skill Badge.png', kind: 'badge' },
  { id: 'google_load_balancing', logo: '/badges/Implement Load Balancing on Compute Engine Skill Badge.png', kind: 'badge' },
  { id: 'google_prompt_design', logo: '/badges/Prompt Design in Vertex AI Skill Badge.png', kind: 'badge' },
  { id: 'google_app_dev_env', logo: '/badges/Set Up an App Dev Environment on Google Cloud Skill Badge.png', kind: 'badge' },
  { id: 'linux_lfs250', logo: '/badges/LFS250 Kubernetes and Cloud Native Essentials.png', kind: 'badge' },
  { id: 'aws_educate_genai', logo: '/badges/AWS Educate Introduction to Generative AI - Training Badge.png', kind: 'badge' },
  { id: 'aws_educate_ml', logo: '/badges/AWS Educate Machine Learning Foundations - Training Badge.png', kind: 'badge' },
  { id: 'ibm_granite', logo: '/badges/Code Generation and Optimization Using IBM Granite.png', kind: 'badge' },
  { id: 'anthropic_fluency', logo: '/badges/AI Fluency-Framework & Foundations.jpg', kind: 'badge' },
  { id: 'microsoft_ai_skills', logo: '/badges/Microsoft Elevate AI Skills Badge 2025-26.png', kind: 'badge' },
  { id: 'mckinsey_forward', logo: '/badges/McKinsey.org Forward Program.png', kind: 'badge' },
  { id: 'ibm_data_fundamentals', logo: '/badges/IBM SkillsBuild Data Fundamentals.png', kind: 'badge' },
  { id: 'ibm_cybersecurity_fundamentals', logo: '/badges/IBM SkillsBuild Cybersecurity Fundamentals.png', kind: 'badge' },
];

interface Credential {
  id: string;
  platform: string;
  certification: string;
  description: string;
  issuedBy: string;
  expiration: string;
  url: string;
  badgesCount: string;
  skills: string[];
  logo: string;
  kind: CredentialKind;
}

const resolve = (badge: BadgeEntry, t: TFunction): Credential => {
  const key = (field: string) => t(`badges.platforms.${badge.id}.${field}`, { defaultValue: '' });
  return {
    id: badge.id,
    platform: key('platform') || badge.id,
    certification: key('certification'),
    description: key('description'),
    issuedBy: key('issued_by'),
    expiration: key('expiration'),
    url: key('badge_url') || key('credential_url') || key('profile_url'),
    badgesCount: key('badges_count'),
    skills: t(`badges.platforms.${badge.id}.skills`, { returnObjects: true, defaultValue: [] }) as string[],
    logo: badge.logo,
    kind: badge.kind,
  };
};

const Logo: React.FC<{ credential: Credential; size?: number }> = ({ credential, size = 72 }) => (
  <span className="logo-box" style={{ width: size, height: size }}>
    <img
      src={credential.logo}
      alt=""
      className="platform-logo"
      loading="lazy"
      decoding="async"
      width={size}
      height={size}
    />
  </span>
);

const ProfessionalCard: React.FC<{ credential: Credential; t: TFunction }> = ({ credential: c, t }) => {
  const title = c.certification || c.platform;
  const skills = Array.isArray(c.skills) ? c.skills : [];
  const hidden = skills.slice(MAX_SKILLS);
  return (
    <article className="platform-card">
      <header className="card-head">
        <Logo credential={c} />
        <div className="card-titles">
          <span className="card-eyebrow">{c.platform}</span>
          <h4>{title}</h4>
        </div>
      </header>
      <p className="platform-description">{c.description}</p>
      {skills.length > 0 && (
        <ul className="platform-skills" aria-label={t('badges.skills')}>
          {skills.slice(0, MAX_SKILLS).map((skill) => (
            <li key={skill} className="skill-tag">
              {skill}
            </li>
          ))}
          {hidden.length > 0 && (
            <li className="skill-tag skill-tag--more">
              +{hidden.length} {t('badges.moreSkills')}
            </li>
          )}
        </ul>
      )}
      <div className="card-footer">
        <dl className="card-meta">
          {c.issuedBy && (
            <div>
              <dt>{t('badges.issuedBy')}</dt>
              <dd>{c.issuedBy}</dd>
            </div>
          )}
          {c.expiration && (
            <div>
              <dt>{t('badges.expires')}</dt>
              <dd>{c.expiration}</dd>
            </div>
          )}
        </dl>
        <WaxSeal size="sm" title={t('badges.certified')} className="card-footer__seal">
          {t('badges.certified')}
        </WaxSeal>
      </div>
      {c.url && (
        <a href={c.url} target="_blank" rel="noopener noreferrer" className="platform-link">
          {t('badges.viewCertification')}
          <span className="visually-hidden">
            : {title} ({t('common.newTab')})
          </span>
        </a>
      )}
    </article>
  );
};

const CompactCard: React.FC<{ credential: Credential; t: TFunction }> = ({ credential: c, t }) => {
  const title = c.certification || c.platform;
  const subtitle = c.certification
    ? c.issuedBy || c.platform
    : c.badgesCount
      ? `${c.badgesCount} ${t('badges.badgesEarned')}`
      : '';
  const body = (
    <>
      <Logo credential={c} size={48} />
      <span className="dense-info">
        <span className="dense-title">{title}</span>
        {subtitle && <span className="dense-issuer">{subtitle}</span>}
      </span>
      {c.url && <FaExternalLinkAlt className="dense-icon" aria-hidden="true" />}
    </>
  );
  return c.url ? (
    <a href={c.url} target="_blank" rel="noopener noreferrer" className="platform-card platform-card--dense">
      {body}
      <span className="visually-hidden"> ({t('common.newTab')})</span>
    </a>
  ) : (
    <div className="platform-card platform-card--dense">{body}</div>
  );
};

const Badges: React.FC = () => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const all = badgeKeys.map((b) => resolve(b, t));
  const professional = all.filter((c) => c.kind === 'professional');
  const programme = all.filter((c) => c.kind === 'programme');
  const badges = all.filter((c) => c.kind === 'badge');

  return (
    <section id="credentials" className="section badges-section" aria-labelledby="credentials-title">
      <span id="badges" className="anchor-alias" aria-hidden="true" />
      <div className="container">
        <h2 id="credentials-title" className="section-title">
          {t('badges.title')}
        </h2>
        <p className="section-subtitle">{t('badges.subtitle')}</p>

        <h3 className="credential-group-title">{t('badges.professional')}</h3>
        <div className="platforms-grid">
          {professional.map((c) => (
            <ProfessionalCard key={c.id} credential={c} t={t} />
          ))}
        </div>

        <h3 className="credential-group-title">{t('badges.programmes')}</h3>
        <ul className="platforms-grid platforms-grid--dense" role="list">
          {programme.map((c) => (
            <li key={c.id}>
              <CompactCard credential={c} t={t} />
            </li>
          ))}
        </ul>

        <h3 className="credential-group-title">{t('badges.digital')}</h3>
        <div className="badges-toggle-wrap">
          <button
            type="button"
            className="badges-toggle"
            onClick={() => setIsExpanded((v) => !v)}
            aria-expanded={isExpanded}
            aria-controls="more-certs"
          >
            <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
            {isExpanded ? t('badges.showLess') : `${t('badges.showMore')} (${badges.length})`}
          </button>
        </div>
        <div id="more-certs">
          {isExpanded && (
            <ul className="platforms-grid platforms-grid--dense" role="list">
              {badges.map((c) => (
                <li key={c.id}>
                  <CompactCard credential={c} t={t} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Badges;
