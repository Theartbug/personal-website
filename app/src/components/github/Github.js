import React, { PureComponent, Fragment } from 'react';
import { getLanguagesAndLibraries } from '../../services/githubAPI';

export default class Github extends PureComponent {

  state = {
    languages: { 
      JavaScript: 42,
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
      <Fragment>
        <h3>Languages</h3>
        <ul>
          {Object.keys(languages).map((l, i) => <li key={i}><span>{l}</span>: {languages[l]}</li>)}
        </ul>
        <h3>Libraries</h3>        
        <ul>
          {Object.keys(libraries).map((l, i) => <li key={i}><span>{l}</span>: {libraries[l]}</li>)}
        </ul>
      </Fragment>
    );
  }
}