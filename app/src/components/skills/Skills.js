import React, { PureComponent } from 'react';
import express from '../../assets/express.png';
import firebase from '../../assets/firebase.png';
import node from '../../assets/node.png';
import react from '../../assets/react.png';
import sass from '../../assets/sass.png';
import redux from '../../assets/redux.png';
import webpack from '../../assets/webpack.png';
import './skills.css';

export default class Hero extends PureComponent {

  componentDidMount() {
    const { intersectionScrollChange, config } = this.props;

    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          intersectionScrollChange(entry); 
        }
      });
    }, config);
    
    observer.observe(this.skills);
  }

  render() {

    return (
      <section className="skills" id="skills" ref={skills => this.skills = skills}>
        <div className="max-width">
          <div>
            <img src={express} alt="express logo"/>
          </div>
          <div>
            <img src={firebase} alt="firebase logo"/>
          </div>
          <div>
            <img src={node} alt="node logo"/>
          </div>
          <div>
            <img src={react} alt="react logo"/>
          </div>
          <div>
            <img src={redux} alt="redux logo"/>
          </div>
          <div>
            <img src={sass} alt="sass logo"/>
          </div>
          <div>
            <img src={webpack} alt="webpack logo"/>
          </div>
        </div>
      </section>
    );
  }
}