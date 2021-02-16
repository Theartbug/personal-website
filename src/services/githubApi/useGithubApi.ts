import { useEffect, useReducer } from 'react';
import {
  getStorage,
  setStorage,
  findLibraries,
  findLanguages,
  fetchRepos,
} from './useGithubApiHelpers';
import {
  githubReducer,
  initialState,
  State,
  Repo,
} from './reducers';
import {
  setLanguagesAndLibraries,
  setRepos,
  Action,
  FETCH_FAILURE,
} from './actions';

export const useGithubApi = () => {
  const [{
    loading,
    languages,
    libraries,
    error,
    repos,
  }, dispatch] = useReducer<React.Reducer<State, Action>>(githubReducer, initialState);

  const storage = getStorage();

  useEffect(() => {
    // useEffect cannot be async, must have a function async inside of it
    async function fetchGithubData() {
      if(!repos) await getRepos();
      else await getLanguagesAndLibraries(repos);
    }
    if(storage) {
      dispatch(setLanguagesAndLibraries({
        languages: storage.languages,
        libraries: storage.libraries,
      }));
    } else {
      fetchGithubData();
    }
  }, [repos]);

  async function getRepos(): Promise<void> {
    try {
      const repos = await fetchRepos();
      dispatch(setRepos(repos));
    } catch(e) {
      dispatch({ type: FETCH_FAILURE });
      console.log('Error', e);
    }
  };

  async function getLanguagesAndLibraries(repos: Repo[]): Promise<void> {
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
      dispatch({ type: FETCH_FAILURE });
      console.log('Error', e);
    }
  }

  return { loading, languages, libraries, error };
}


