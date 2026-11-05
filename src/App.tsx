import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SiteLayout from './components/SiteLayout';
import ScrollManager from './components/ScrollManager';
import ChatPage from './components/ChatPage';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import NotFoundPage from './pages/NotFoundPage';
import DocumentMeta from './seo/DocumentMeta';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { restoreLanguagePreference } from './i18n/config';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainerWithTheme: FC = () => {
  const { theme } = useTheme();
  return <ToastContainer position="bottom-right" autoClose={5000} newestOnTop={false} theme={theme} />;
};

/** Routes only. The router itself is supplied by main.tsx (browser) or entry-server.tsx (prerender). */
const App: FC = () => {
  useEffect(() => {
    restoreLanguagePreference();
  }, []);

  return (
    <ThemeProvider>
      <ScrollManager />
      <DocumentMeta />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
      <ToastContainerWithTheme />
    </ThemeProvider>
  );
};

export default App;
