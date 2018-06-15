import React, { PureComponent, Fragment } from 'react';
import { getLanguagesAndLibraries } from '../../services/githubAPI';

export default class Github extends PureComponent {

  state = {
    languages: null,
    libraries: null
  };

  componentDidMount() {
    getLanguagesAndLibraries()
      .then(result => this.setState({ languages: result.languages, libraries: result.libraries }));
  }

  render() {
      
    const { languages, libraries } = this.state;

    if(!languages && !libraries) return null;

    return (
      <Fragment>
        <h3>Languages</h3>
        <ul>
          {Object.keys(languages).map((l, i) => <li key={i}>{l}: {languages[l]}</li>)}
        </ul>
        <h3>Libraries</h3>        
        <ul>
          {Object.keys(libraries).map((l, i) => <li key={i}>{l}: {libraries[l]}</li>)}
        </ul>
      </Fragment>
    );
  }
}