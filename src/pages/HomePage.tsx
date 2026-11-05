import { FC } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Expertise from '../components/Expertise';
import Education from '../components/Education_new';
import Badges from '../components/Badges';
import Writing from '../components/Writing';
import Contact from '../components/Contact';

/** Recruiter journey: who → what I build → evidence → background → contact. */
const HomePage: FC = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Experience />
    <Expertise />
    <Education />
    <Badges />
    <Writing />
    <Contact />
  </>
);

export default HomePage;
