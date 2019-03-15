import React, { useState, useEffect, forwardRef } from 'react';
import withIntersectionObserver from '../../services/withIntersectionObserver';
import { getLanguagesAndLibraries, useGithubApi } from '../../services/githubAPI';
import { ClipLoader } from 'react-spinners';
import './github.css';

const Github = forwardRef((props, ref) => {
  const { loading, languages, libraries, error } = useGithubApi();

  return (
    <section 
      ref={ ref }
      className="github"
      id="github"
      { ...props }>
      <div>
        <h2 className="lines">App Stats</h2>
        {loading && 
          <div className='loader'>
            <ClipLoader loading={loading} color={'#d40b0b'} />
            <small>Fetching data...</small> 
          </div>
        }
        {error &&
          <div className='loader'>
            <small>{ error }</small> 
          </div>
        }
        <ul className="languages">
          {languages && Object.keys(languages).map((l, i) => <li key={i}><h3>{l}</h3><span>{languages[l]}</span></li>)}
        </ul>
        <hr/>       
        <ul className="libraries">
          {libraries && Object.keys(libraries).map((l, i) => <li key={i}><h3>{l}</h3><span>{libraries[l]}</span></li>)}
        </ul>
        <small>*Powered by Github API</small>
      </div>
    </section>
  );
});
Github.displayName = 'github';
export default withIntersectionObserver(Github);