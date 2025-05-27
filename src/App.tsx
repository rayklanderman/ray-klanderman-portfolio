import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import CV from './components/CV_new';
import Projects from './components/Projects';
import ElevatorPitch from './components/ElevatorPitch';
import Education from './components/Education_new';
import Badges from './components/Badges';
import Footer from './components/Footer';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n/config';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <motion.div 
        className="app"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LanguageSwitcher />
        <Header />
        <main>
          <CV /> {/* Profile section */}
          <Projects />
          <ElevatorPitch />
          <Education />
          <Badges />
          {/* Contact section is in the Footer component */}
        </main>
        <Footer />
      </motion.div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
