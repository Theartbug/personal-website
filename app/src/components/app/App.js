import React, { PureComponent } from 'react';
import { Events } from 'react-scroll';
import Github from '../github/Github';
import Hero from '../hero/Hero';
import Bio from '../bio/Bio';
import Skills from '../skills/Skills';
import Projects from '../projects/Projects';
import Contact from '../contact/Contact';
import Copyright from '../copyright/Copyright';
import ScrollButtons from '../scroll-buttons/ScrollButtons';
import './app.css';

// const list = ['hero', 'bio', 'skills', 'github', 'projects', 'contact'];

const config = {
  //give a little wiggle room at the top before jumping to next section as 'current' for intersectionObserver
  rootMargin: '10% 0px -55%',
};

export default class App extends PureComponent {

  // state = {
  //   current: 0,
  //   buttonScroll: false
  // };

  // componentDidMount() {
  //   //so the intersection observer does not interfere with react-scroll, must keep track in state
  //   Events.scrollEvent.register('end', () => {
  //     this.setState({ buttonScroll: false });
  //   });
  // }

  // intersectionScrollChange = entry => {
  //   const { buttonScroll } = this.state;
  //   if(buttonScroll) return; //if we are scrolling via react-scroll, don't proceed

  //   const { target: { className }, isIntersecting, intersectionRatio } = entry;
  //   const current = list.indexOf(className);

  //   if(isIntersecting === true || intersectionRatio > 0) this.setState({ current });

  // };

  // changeScrollView = (direction) => {
  //   const { current } = this.state;
  //   const { scrollTo } = this;
  //   //if the current position is at the beginning or the end and the direction wants to go further, dont let it.
  //   if(current === 0 && !direction || current === 5 && direction) return;
    
  //   if(direction) {
  //     const next = current + 1;
  //     scrollTo(list[next]);
  //     this.setState({ current: next, buttonScroll: true });
  //   } else {
  //     const prev = current - 1;
  //     scrollTo(list[prev]);
  //     this.setState({ current: prev, buttonScroll: true });
  //   }

  // };

  // scrollTo = (id) => {
  //   if(!id) return;
  //   scroller.scrollTo(id, {
  //     duration: 1000,
  //     delay: 0,
  //     smooth: 'easeInOutQuart'
  //   });
  // };

  render() {

    const { changeScrollView, intersectionScrollChange } = this;

    return (
      <main role="main">
        <Hero intersectionScrollChange={intersectionScrollChange} config={config} />
        <Bio intersectionScrollChange={intersectionScrollChange} config={config} />
        <Skills intersectionScrollChange={intersectionScrollChange} config={config} />
        <Github intersectionScrollChange={intersectionScrollChange} config={config} />
        <Projects intersectionScrollChange={intersectionScrollChange} config={config} />
        <Contact intersectionScrollChange={intersectionScrollChange} config={config} />
        <Copyright/>
        <ScrollButtons changeScrollView={changeScrollView}/>
      </main>
    );
  }
}