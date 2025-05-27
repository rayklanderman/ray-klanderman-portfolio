import './Header.scss';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import CVRequestModal from './CVRequestModal';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaYoutube, FaTwitter, FaShareAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  // Define menu items
  const menuItems = [
    { id: 'profile', label: t('menu.profile') },
    { id: 'projects', label: t('menu.projects') },
    { id: 'elevator', label: 'Elevator Pitch' },
    { id: 'education', label: t('menu.education') },
    { id: 'badges', label: t('menu.badges') },
    { id: 'contact-me', label: 'Contact Me' }
  ];

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== isScrolled) {
        setIsScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.menu-container') && !target.closest('.hamburger')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);
  
  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      const headerHeight = document.querySelector('.header')?.clientHeight || 0;
      
      // If we're still in the header area, don't highlight any navigation item
      if (scrollPosition < headerHeight - 100) {
        setActiveSection('');
        return;
      }
      
      // Check each section to see if it's in view
      let foundActive = false;
      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          // If scroll position is within this section
          if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100) {
            setActiveSection(item.id);
            foundActive = true;
            return; // Exit once we find the active section
          }
        }
      });
      
      // If no section is active, clear the active section
      if (!foundActive) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Ray Klanderman - Portfolio',
          text: 'Check out my portfolio!',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Close menu when a menu item is clicked
  const handleMenuItemClick = (sectionId: string) => {
    handleScrollTo(sectionId);
    setIsMenuOpen(false);
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
      url: 'https://www.linkedin.com/in/raymondklanderman/',
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

  return (
    <>
      <header className="header">
        <div className="header-content">
        <div className="profile-image-container">
          <img 
            src="/images/profile.png" 
            alt="Raymond Klanderman" 
            className="profile-image"
          />
        </div>
        <div className="text-content">
          <h1>Raymond Klanderman</h1>
          <div className="job-titles">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="job-title"
            >
              {t('header.jobTitles.softwareEngineer', 'Software Engineer')}
            </motion.span>
            <motion.span 
              className="divider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3 }}
            >
              &nbsp;•&nbsp;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="job-title"
            >
              {t('header.jobTitles.dataAnalyst', 'Data Analyst')}
            </motion.span>
            <motion.span 
              className="divider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5 }}
            >
              &nbsp;•&nbsp;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="job-title"
            >
              {t('header.jobTitles.promptEngineer', 'AI Prompt Engineer')}
            </motion.span>
            <motion.span 
              className="divider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.7 }}
            >
              &nbsp;•&nbsp;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="job-title"
            >
              {t('header.jobTitles.creative', 'Creative')}
            </motion.span>
          </div>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="social-link"
                style={{ backgroundColor: link.color }}
              >
                {React.cloneElement(link.icon, { 
                  className: 'social-icon',
                  size: 24,
                  style: { color: 'white', fill: 'white' }
                })}
              </a>
            ))}
          </div>
          <div className={`menu-container ${isScrolled ? 'scrolled' : ''}`}>
            <div className="menu-content">
              {/* Hamburger button for mobile */}
              <button 
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
              </button>
              
              {/* Navigation menu */}
              <nav className={`menu-buttons ${isMenuOpen ? 'open' : ''}`}>
                {menuItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => handleMenuItemClick(item.id)}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>
          <div className="cta-buttons">
            <button className="download-cv" onClick={handleOpenModal}>
              {t('header.downloadCV')}
            </button>
            <button className="share-button" onClick={handleShare}>
              <FaShareAlt /> {t('header.share')}
            </button>
          </div>
          {isModalOpen && <CVRequestModal onClose={handleCloseModal} />}
        </div>
        </div>
      </header>
    </>
  );
};

export default Header;
