import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import express from '../../assets/express.png';
import firebase from '../../assets/firebase.png';
import node from '../../assets/node.png';
import react from '../../assets/react.png';
import sass from '../../assets/sass.png';
import redux from '../../assets/redux.png';
import webpack from '../../assets/webpack.png';
import jest from '../../assets/jest.svg';
import spring from '../../assets/spring_logo.png';
import { SKILLS } from '../app-context/actions';
import './skills.css';

const Skills: React.FC = (): JSX.Element => {
  const ref = useIntersectionObserver(SKILLS);

  return (
    <section
      ref={ ref }
      className={ SKILLS }
      id={ SKILLS }>
      <div>
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
          <div>
            <img className="logo" src={spring} alt="spring logo"/>
          </div>
        </div>
      </div>
    </section>
  );
};

Skills.displayName = SKILLS;
export default Skills;
