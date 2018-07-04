import React, { PureComponent } from 'react';
import './copyright.css';

export default class Copyright extends PureComponent {

  render() {

    return (
      <section className="copyright">
        <small>&copy; Grace Provost 2018</small>
      </section>
    );
  }
}