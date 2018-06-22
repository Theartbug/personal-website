import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Github from '../github/Github';
import Hero from '../hero/Hero';
import Bio from '../bio/Bio';
import Skills from '../skills/Skills';
import './App.css';

export default class App extends PureComponent {

  render() {

    return (
      <Router>
        <main role="main">
          <Hero/>
          <Bio/>
          <Skills/>
          <Github/>
        </main>
      </Router>
    );
  }
}