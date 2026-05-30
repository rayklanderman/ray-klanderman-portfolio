import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaEnvelope, FaYoutube, FaTwitter } from 'react-icons/fa';
import './Footer.scss';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('https://formspree.io/f/mnnpbdzv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  interface SocialLink {
    icon: React.ReactElement;
    url: string;
    label: string;
    color: string;
  }

  const socialLinks: SocialLink[] = [
    {
      icon: <FaGithub />,
      url: 'https://github.com/rayklanderman',
      label: 'GitHub',
      color: '#333333'
    },
    {
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/rayklanderman/',
      label: 'LinkedIn',
      color: '#0077B5'
    },
    {
      icon: <FaYoutube />,
      url: 'https://www.youtube.com/@RayKlanderman',
      label: 'YouTube',
      color: '#FF0000'
    },
    {
      icon: <FaTwitter />,
      url: 'https://x.com/rayklanderman',
      label: 'X (Twitter)',
      color: '#000000'
    },
    {
      icon: <FaEnvelope />,
      url: 'mailto:rayklanderman@gmail.com',
      label: 'Email',
      color: '#EA4335'
    }
  ];

  // Add global style for placeholder
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      input::placeholder,
      textarea::placeholder {
        color: rgba(255, 255, 255, 0.6) !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
      return undefined; // Explicitly return void
    };
  }, []);

  return (
    <motion.footer
      id="contact-me"
      className="footer contact-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content">
        <motion.div
          className="contact-form"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="section-title">
            {t('contact.title')}
          </h2>
          <form onSubmit={handleSubmit} className="contact-form-container">
            <div className="form-group">
              <input
                type="text"
                placeholder={t('contact.name')}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="form-input"
                onFocus={(e) => {
                  e.target.classList.add('form-input-focus');
                }}
                onBlur={(e) => {
                  e.target.classList.remove('form-input-focus');
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder={t('contact.email')}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="form-input"
                onFocus={(e) => {
                  e.target.classList.add('form-input-focus');
                }}
                onBlur={(e) => {
                  e.target.classList.remove('form-input-focus');
                }}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder={t('contact.message')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="form-textarea"
                onFocus={(e) => {
                  e.target.classList.add('form-input-focus');
                }}
                onBlur={(e) => {
                  e.target.classList.remove('form-input-focus');
                }}
              />
            </div>
            <motion.button 
              type="submit" 
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            >
              {isSubmitting ? t('contact.sending') : t('contact.send')}
            </motion.button>
          </form>
          {submitStatus === 'success' && (
            <motion.p
              className="success-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t('contact.success')}
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {t('contact.error')}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="social-links"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="social-link"
              style={{ 
                backgroundColor: link.color,
                transition: 'all 0.3s ease'
              }}
            >
              {React.cloneElement(link.icon, { 
                className: 'social-icon',
                size: 24,
                style: { 
                  color: 'white', 
                  fill: 'white',
                  transition: 'all 0.3s ease'
                }
              })}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
