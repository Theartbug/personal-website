import React from 'react';
import { useGithubApi } from '../../services/githubApi/useGithubApi';
import { ClipLoader } from 'react-spinners';
import './github.css';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import { GITHUB } from '../app-context/actions';

const Github: React.FC = (): JSX.Element => {
  const { loading, languages, libraries, error } = useGithubApi();
  const ref = useIntersectionObserver(GITHUB);

  return (
    <section
      role='region'
      aria-label={ GITHUB }
      ref={ ref }
      className={ GITHUB }
      id={ GITHUB }>
      <div>
        <h2 className="lines">App Stats</h2>
        <p>Technologies and the numbers of times I've used them in projects</p>
        {loading &&
          <div className='loader'>
            <ClipLoader loading={loading} color={'#d40b0b'} />
            <small role='presentation'>Fetching data...</small>
          </div>
        }
        {error &&
          <div className='loader'>
            <small role='presentation'>Something went wrong...</small>
          </div>
        }
        <ul className="languages">
          {languages && Object.keys(languages).map((l, i) => <li key={i}><h3>{l}</h3><span>{languages[l]}</span></li>)}
        </ul>
        <hr/>
        <ul className="libraries">
          {libraries && Object.keys(libraries).map((l, i) => <li key={i}><h3>{l}</h3><span>{libraries[l]}</span></li>)}
        </ul>
        <small role='presentation'>*Powered by Github API</small>
      </div>
    </section>
  );
};

Github.displayName = GITHUB;
export default Github;