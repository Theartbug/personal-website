import React from 'react';
import Github from '../github/Github';
import Hero from '../hero/Hero';
import Bio from '../bio/Bio';
import Skills from '../skills/Skills';
import Projects from '../projects/Projects';
import Contact from '../contact/Contact';
import Copyright from '../copyright/Copyright';
import ScrollButtons from '../scroll-buttons/ScrollButtons';
import Gallery from '../image-gallery/Gallery';
import './app.css';

const App: React.FC  = (): JSX.Element => (
  <main id="app" role="main">
    <Hero/>
    <Bio/>
    <Skills/>
    <Github/>
    <Projects/>
    <Gallery/>
    <Contact/>
    <Copyright/>
    <ScrollButtons/>
  </main>
);

export default App;