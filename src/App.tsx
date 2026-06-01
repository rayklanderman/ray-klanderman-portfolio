import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CV from './components/CV_new';
const Projects = React.lazy(() => import('./components/Projects'));
const Showcase = React.lazy(() => import('./components/Showcase'));
const Education = React.lazy(() => import('./components/Education_new'));
const Badges = React.lazy(() => import('./components/Badges'));
import Footer from './components/Footer';
import ChatPage from './components/ChatPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import SectionSkeleton from './components/SectionSkeleton';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import './i18n/config';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const HomePage: React.FC = () => (
  <motion.div
    className="app"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <LanguageSwitcher />
    <Header />
    <main>
      <CV />
      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
        <Showcase />
        <Education />
        <Badges />
      </Suspense>
    </main>
    <Footer />
  </motion.div>
);

const AppContent: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <ToastContainerWithTheme />
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
      <ToastContainerWithTheme />
    </ThemeProvider>
  );
};

const ToastContainerWithTheme: React.FC = () => {
  const { theme } = useTheme();
  
  return (
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
      theme={theme === 'dark' ? 'dark' : 'light'}
    />
  );
};

export default App;
