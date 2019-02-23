import React, { PureComponent } from 'react';
import Github from '../github/Github';
import Hero from '../hero/Hero';
import Bio from '../bio/Bio';
import Skills from '../skills/Skills';
import Projects from '../projects/Projects';
import Contact from '../contact/Contact';
import Copyright from '../copyright/Copyright';
import ScrollButtons from '../scroll-buttons/ScrollButtons';
import './app.css';

const config = {
  //give a little wiggle room at the top before jumping to next section as 'current' for intersectionObserver
  rootMargin: '10% 0px -55%',
};

export default function App() {
  return (
    <main id="app" role="main">
      <Hero config={config} />
      <Bio config={config} />
      <Skills config={config} />
      <Github config={config} />
      <Projects config={config} />
      <Contact config={config} />
      <Copyright/>
      <ScrollButtons/>
    </main>
  );
}