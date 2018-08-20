import React, { PureComponent } from 'react';
import withIntersectionObserver from '../../services/withIntersectionObserver';
import express from '../../assets/express.png';
import firebase from '../../assets/firebase.png';
import node from '../../assets/node.png';
import react from '../../assets/react.png';
import sass from '../../assets/sass.png';
import redux from '../../assets/redux.png';
import webpack from '../../assets/webpack.png';
import './skills.css';

class Skills extends PureComponent {

  render() {
    return (
      <section className="skills" id="skills" ref={skills => this.skills = skills}>
        <h2 className="lines">Skills</h2>

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

export default withIntersectionObserver(Skills);
