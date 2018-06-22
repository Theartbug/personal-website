import React, { PureComponent } from 'react';
import Github from '../github/Github';
import Hero from '../hero/Hero';
import Bio from '../bio/Bio';
import Skills from '../skills/Skills';
import Projects from '../projects/Projects';
import './App.css';

export default class App extends PureComponent {

  render() {

    return (
      <main role="main">
        <Hero/>
        <Bio/>
        <Skills/>
        <Github/>
        <Projects/>
      </main>
    );
  }
}