import React, { forwardRef } from 'react';
import withIntersectionObserver from '../../services/withIntersectionObserver';
import express from '../../assets/express.png';
import firebase from '../../assets/firebase.png';
import node from '../../assets/node.png';
import react from '../../assets/react.png';
import sass from '../../assets/sass.png';
import redux from '../../assets/redux.png';
import webpack from '../../assets/webpack.png';
import jest from '../../assets/jest.svg';
import './skills.css';

const Skills = forwardRef((props, ref) => {
  return (
    <section 
      ref={ ref } 
      className="skills" 
      id="skills"
      { ...props }>
      <h2 className="lines">Skills</h2>

      <div className="max-width">
        <div>
          <img className="logo" src={express} alt="express logo"/>
        </div>
        <div>
          <img className="logo" src={firebase} alt="firebase logo"/>
        </div>
        <div>
          <img className="logo" src={node} alt="node logo"/>
        </div>
        <div>
          <img className="logo" src={react} alt="react logo"/>
        </div>
        <div>
          <img className="logo" src={redux} alt="redux logo"/>
        </div>
        <div>
          <img className="logo" src={sass} alt="sass logo"/>
        </div>
        <div>
          <img className="logo" src={webpack} alt="webpack logo"/>
        </div>
        <div>
          <img className="text-logo" src={jest} alt="jest logo"/><p>Jest</p>
        </div>
      </div>
    </section>
  );
});
Skills.displayName = 'skills';
export default withIntersectionObserver(Skills);
