import React from 'react';
import { useGithubApi } from '../../services/githubApi/useGithubApi.js';
import { ClipLoader } from 'react-spinners';
import './github.css';
import useIntersectionObserver from '../../services/useIntersectionObserver.js';
import { GITHUB } from '../app-context/actions';

const Github = props => {
  const { loading, languages, libraries, error } = useGithubApi();
  const ref = useIntersectionObserver(GITHUB);

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
            <small>Something went wrong...</small> 
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
};

Github.displayName = GITHUB;
export default Github;