import React, { PureComponent } from 'react';
import { scroller } from 'react-scroll';
import Github from '../github/Github';
import Hero from '../hero/Hero';
import Bio from '../bio/Bio';
import Skills from '../skills/Skills';
import Projects from '../projects/Projects';
import Contact from '../contact/Contact';
import Copyright from '../copyright/Copyright';
import ScrollButtons from '../scroll-buttons/ScrollButtons';
import './app.css';

const list = ['hero', 'bio', 'skills', 'github', 'projects', 'contact'];

const config = {
  rootMargin: '0px 0px -55%'
};

export default class App extends PureComponent {

  state = {
    current: 0
  };

  intersectionScrollChange = entry => {
    const { target: { className } } = entry;
    const current = list.indexOf(className);
    console.log(className);
    this.setState({ current });
  };


  changeScrollView = (direction) => {
    const { current } = this.state;
    const { scrollTo } = this;
    //if the current position is at the beginning or the end and the direction wants to go further, dont let it.
    if(current === 0 && !direction || current === 5 && direction) return;
    
    if(direction) {
      const next = current + 1;
      scrollTo(list[next]);
      this.setState({ current: next });
    } else {
      const prev = current - 1;
      scrollTo(list[prev]);
      this.setState({ current: prev });
    }

  };

  scrollTo = (id) => {
    if(!id) return;
    scroller.scrollTo(id, {
      duration: 1000,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  render() {

    const { changeScrollView, intersectionScrollChange } = this;

    console.log(this.state.current);

    return (
      <main role="main">
        <Hero intersectionScrollChange={intersectionScrollChange} config={config} />
        <Bio intersectionScrollChange={intersectionScrollChange} config={config} />
        <Skills intersectionScrollChange={intersectionScrollChange} config={config} />
        <Github intersectionScrollChange={intersectionScrollChange} config={config} />
        <Projects intersectionScrollChange={intersectionScrollChange} config={config} />
        <Contact intersectionScrollChange={intersectionScrollChange} config={config} />
        <Copyright intersectionScrollChange={intersectionScrollChange} config={config} />
        <ScrollButtons changeScrollView={changeScrollView}/>
      </main>
    );
  }
}