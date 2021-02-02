import { useEffect, useReducer } from 'react';
import { getCORS } from '../request.js';
import {
  getStorage,
  setStorage,
  findLibraries,
  findLanguages,
  BASE_URL,
  options,
} from './useGithubApiHelpers.js';
import { githubReducer, initialState } from './reducers';
import {
  setLanguagesAndLibraries,
  setRepos,
} from './actions';

const URL = `${BASE_URL}/users/theartbug/repos?per_page=100`;

export const useGithubApi = () => {
  const [{
    loading,
    languages,
    libraries,
    error,
    repos
  }, dispatch] = useReducer(githubReducer, initialState);

  const storage = getStorage();

  useEffect(() => {
    if(storage) {
      dispatch(setLanguagesAndLibraries({
        languages: storage.languages,
        libraries: storage.libraries,
      }));
    } else {
      async function fetchGithubData() {
        if(!repos) await getRepos();
        else if(repos) await getLanguagesAndLibraries(repos);
      }
      fetchGithubData();
    }
  }, [repos]);

  async function getRepos() {
    try {
      const repos = await getCORS(URL, options);
      dispatch(setRepos(repos));
    } catch(e) {
      dispatch(setFailure());
      console.log('Error', e);
    }
  };

  async function getLanguagesAndLibraries(repos) {
    try {
      const [languages, libraries] =
      await Promise.all([
        findLanguages(repos),
        findLibraries(repos),
      ]);
      dispatch(setLanguagesAndLibraries({
        languages,
        libraries,
      }))
      setStorage({
        languages,
        libraries
      }); // set storage for next time
    } catch (e) {
      dispatch(setFailure());
      console.log('Error', e);
    }
  }

  return { loading, languages, libraries, error };
}


