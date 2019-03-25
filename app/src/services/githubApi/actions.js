import { 
  FETCH_INIT,
  FETCH_REPOS,
  FETCH_LANGUAGES_AND_LIBRARIES,
  FETCH_FAILURE, 
} from './reducers.js';

export const setLanguagesAndLibraries = ({ languages, libraries }) => ({ 
  type: FETCH_LANGUAGES_AND_LIBRARIES, 
  payload: { 
    languages, 
    libraries,
  }
});

export const setRepos = (payload) => ({
  type: FETCH_REPOS,
  payload
});

export const setFailure = () => ({
  type: FETCH_FAILURE
});

export const setInit = () => ({
  type: FETCH_INIT
})