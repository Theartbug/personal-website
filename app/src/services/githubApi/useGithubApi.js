import { useEffect, useReducer } from 'react';
import { getCORS } from '../request.js';
import {
  checkCache,
  setStorage,
  findLibraries,
  findLanguages,
  BASE_URL,
  options,
} from './useGithubApiHelpers.js';
import { githubReducer } from './reducers.js';
import {
  setLanguagesAndLibraries,
  setRepos,
  setFailure,
} from './actions.js';

const initialState = {
  loading: true,
  error: false,
  repos: null,
  languages: null,
  libraries: null,
};

export const useGithubApi = () => {
  const [{ 
    loading, 
    languages, 
    libraries, 
    error, 
    repos
  }, dispatch] = useReducer(githubReducer, initialState);

  const storage = checkCache();

  useEffect(() => {
    if(storage) {
      dispatch(setLanguagesAndLibraries({ 
        languages: storage.languages, 
        libraries: storage.libraries,
      }));
    } else {
      async function getRepos() {
        const url = `${BASE_URL}/users/theartbug/repos?per_page=100`;
        try {
          const repos = await getCORS(url, options);
          dispatch(setRepos(repos));
        } catch(e) {
          dispatch(setFailure());
          console.log('Error', e);
        }
      };
      getRepos(); // let the async function manipulate the data
    }
  }, []); // only run once

  useEffect(() => {
    async function getLanguagesAndLibraries(data) {
      try {
        const [returnedLanguages, returnedLibraries] = await Promise.all([
          findLanguages(data),
          findLibraries(data),
        ]);
        dispatch(setLanguagesAndLibraries({ 
          languages: returnedLanguages, 
          libraries: returnedLibraries,
        }))
        setStorage({ 
          languages: returnedLanguages, 
          libraries: returnedLibraries 
        }); // set storage for next time
      } catch (e) {
        dispatch({ type: FETCH_FAILURE });
        console.log('Error', e);
      }
    } 
    if(repos) getLanguagesAndLibraries(repos);
  }, [repos]); // run again if repos changes

  return { loading, languages, libraries, error };
}