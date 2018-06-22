import React, { PureComponent } from 'react';
import Github from '../github/Github';
import Hero from '../hero/Hero';
import Bio from '../bio/Bio';
import './App.css';

export default class App extends PureComponent {

  render() {

    return (
      <main role="main">
        <Hero/>
        <Bio/>
        {/* <Github/> */}
      </main>
    );
  }
}