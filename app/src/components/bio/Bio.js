import React, { PureComponent } from 'react';
import './bio.css';

export default class Hero extends PureComponent {

  render() {

    return (
      <section className="bio">
        <p>She <span>Enjoys Her Work</span>: there is a deep satisfaction to debugging, pushing pixels, and creating elegant logic</p>
        <p>She is <span>Determined</span>: coming from a background in medicine; plunging into the magnificent world of tech.</p>
        <p>She is <span>Curious</span>: perpetually reading, discovering small tidbits of knowledge, and never failing to ask questions.</p>
        <p>She is <span>Active</span>: enjoying bike commuting, regular rock climbing, dancing, hiking, camping, and urban walks.</p>
      </section>
      
    );
  }
}