import React, { PureComponent } from 'react';
import { getLanguages } from '../../services/githubAPI';

export default class Github extends PureComponent {

  state = {
    languages: null
  };

  componentDidMount() {
    getLanguages()
      .then(result => this.setState({ languages: result }));
  }

  render() {
      
    const { languages } = this.state;

    if(!languages) return null;

    return (
      <div>
        {Object.keys(languages).map((l, i) => <pre key={i}>{l}: {languages[l]}</pre>)}
      </div>
    );
  }
}