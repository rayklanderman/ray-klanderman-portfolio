import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import CV from './components/CV';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n/config';
import './styles/main.scss';

const App: React.FC = () => {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(() => {
            console.log('ServiceWorker registration successful');
          })
          .catch(err => {
            console.log('ServiceWorker registration failed: ', err);
          });
      });
    }
  }, []);

  return (
    <motion.div 
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LanguageSwitcher />
      <Header />
      <CV />
      <Footer />
    </motion.div>
  );
};

export default App;
