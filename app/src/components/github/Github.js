import React, { useState, useEffect, forwardRef } from 'react';
import withIntersectionObserver from '../../services/withIntersectionObserver';
import { getLanguagesAndLibraries } from '../../services/githubAPI';
import { ClipLoader } from 'react-spinners';
import './github.css';

const Github = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState();
  const [libraries, setLibraries] = useState();

  useEffect(() => {
    getLanguagesAndLibraries()
      .then(({ languages, libraries })=> {
        setLanguages(languages);
        setLibraries(libraries);
        setLoading(false);
      });
  }, []) // empty array tells react this code only runs once

  return (
    <section 
      ref={ ref }
      className="github"
      id="github"
      { ...props }>
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
});
Github.displayName = 'Github';
export default withIntersectionObserver(Github);