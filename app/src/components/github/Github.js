import React, { PureComponent, Fragment } from 'react';
import { getLanguagesAndLibraries } from '../../services/githubAPI';
import './github.css';

export default class Github extends PureComponent {

  state = {
    languages: { 
      JS: 42,
      HTML: 40,
      CSS: 38 },
    libraries: {
      react: 10,
      webpack: 22,
      express: 8,
      redux: 4,
      firebase: 4,
      node: 32
    }
  };

  // componentDidMount() {
  //   getLanguagesAndLibraries()
  //     .then(result => this.setState({ languages: result.languages, libraries: result.libraries }));
  // }

  render() {
      
    const { languages, libraries } = this.state;

    if(!languages && !libraries) return null;

    return (
      <section className="github">
        <h3># of Apps</h3>
        <ul className="languages">
          {Object.keys(languages).map((l, i) => <li key={i}><h4>{l}</h4><span>{languages[l]}</span></li>)}
        </ul>
        <hr/>       
        <ul className="libraries">
          {Object.keys(libraries).map((l, i) => <li key={i}><h4>{l}</h4><span>{libraries[l]}</span></li>)}
        </ul>
      </section>
    );
  }
}