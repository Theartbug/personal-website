import React, { PureComponent } from 'react';
import Github from '../github/Github';
import Hero from '../hero/Hero';
import Bio from '../bio/Bio';
import Skills from '../skills/Skills';
import Projects from '../projects/Projects';
import Contact from '../contact/Contact';
import Copyright from '../copyright/Copyright';
import './app.css';

export default class App extends PureComponent {

  render() {

    return (
      <main role="main">
        <Hero/>
        <Bio/>
        <Skills/>
        <Github/>
        <Projects/>
        <Contact/>
        <Copyright/>
      </main>
    );
  }
}