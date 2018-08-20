import React, { PureComponent } from 'react';
import withIntersectionObserver from '../../services/withIntersectionObserver';
import { getLanguagesAndLibraries } from '../../services/githubAPI';
import { ClipLoader } from 'react-spinners';
import './github.css';

class Github extends PureComponent {

  state = {
    loading: true
  };

  componentDidMount() {
    
    getLanguagesAndLibraries()
      .then(result => this.setState({ languages: result.languages, libraries: result.libraries, loading: false }));
  }

  render() {
      
    const { languages, libraries, loading } = this.state;

    return (
      <section className="github" id="github" ref={github => this.github = github}>
        <h2 className="lines">App Stats</h2>
        {loading && 
          <div className='loader'>
            <ClipLoader loading={loading} color={'#d40b0b'} />
            <small>Fetching data...</small> 
          </div>
        }
        <ul className="languages">
          {!loading && Object.keys(languages).map((l, i) => <li key={i}><h3>{l}</h3><span>{languages[l]}</span></li>)}
        </ul>
        <hr/>       
        <ul className="libraries">
          {!loading && Object.keys(libraries).map((l, i) => <li key={i}><h3>{l}</h3><span>{libraries[l]}</span></li>)}
        </ul>
        <small>*Powered by Github API</small>
      </section>
    );
  }
}

export default withIntersectionObserver(Github);