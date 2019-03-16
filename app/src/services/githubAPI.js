import { useEffect, useReducer } from 'react';
import { getCORS } from './request.js';

const LANGUAGES_AND_LIBRARIES = 'languagesAndLibraries';
const FETCH_INIT = 'FETCH_INIT';
const FETCH_REPOS = 'FETCH_REPOS';
const FETCH_LANGUAGES_AND_LIBRARIES = 'FETCH_LANGUAGES_AND_LIBRARIES';
const FETCH_FAILURE = 'FETCH_FAILURE';
const BASE_URL = 'https://api.github.com';

const options = {
  withCredentials: true,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};

const initialState = {
  loading: true,
  error: null,
  repos: null,
  languages: null,
  libraries: null,
};

const githubReducer = (state, { type, payload }) => {
  switch (type) {
    case FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_REPOS:
      return {
        ...state,
        repos: payload,
      };
    case FETCH_LANGUAGES_AND_LIBRARIES:
      return {
        ...state,
        languages: payload.languages,
        libraries: payload.libraries,
        loading: false,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      throw new Error();
  }
};

function checkCache() {
  const storage = localStorage.getItem(LANGUAGES_AND_LIBRARIES);
  if(!storage) return false;
  const convertedStorage = JSON.parse(storage);
  const { date } = convertedStorage;
  //if the storage was fetched in the past month (below in milliseconds), return it, else fetch it again
  return (new Date() - new Date(date) < 454305569297142.8125) && convertedStorage;
};

function setStorage({ languages, libraries }) {
  const date = new Date();
  const storage = { 
    languages, 
    libraries, 
    date 
  }; 
  //set the item into storage for next time
  localStorage.setItem(LANGUAGES_AND_LIBRARIES, JSON.stringify(storage)); 
}

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
      dispatch({ type: FETCH_LANGUAGES_AND_LIBRARIES, payload: { 
        languages: storage.languages, 
        libraries: storage.libraries,
      }})
    } else {
      async function getRepos() {
        const url = `${BASE_URL}/users/theartbug/repos?per_page=100`;
        try {
          const payload = await getCORS(url, options)
          dispatch({ type: FETCH_REPOS, payload });
        } catch(e) {
          dispatch({ type: FETCH_FAILURE });
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
        dispatch({ type: FETCH_LANGUAGES_AND_LIBRARIES, payload: { 
          languages: returnedLanguages, 
          libraries: returnedLibraries 
        }})
        setStorage({ languages: returnedLanguages, libraries: returnedLibraries }); // set storage for next time
      } catch (e) {
        dispatch({ type: FETCH_FAILURE });
      }
    } 
    if(repos) getLanguagesAndLibraries(repos);
  }, [repos]); // run again if repos changes

  return { loading, languages, libraries, error };
}

export const findLibraries = async(repos) => {

  const seen = {
    react: 0,
    webpack: 0,
    express: 0,
    redux: 0,
    firebase: 0,
    node: 0
  };

  const promises = repos.map(repo => 
    //fetch content list for each repo
    getRepoContent(repo.name)
      .then(list => {
        //find the index of the package.json in the tree
        const packageJSONIndex = list.tree.findIndex(item => item.path.includes('package.json'));

        if(packageJSONIndex === -1) return repo; //if there is no package.json, end

        seen.node++;

        //get the contents of the package.json
        return getPackageJson(list.tree[packageJSONIndex].url)
          .then(encoded => {

            //convert from base64 then stringify
            const packageJSON = JSON.stringify(window.atob(encoded.content));

            if(packageJSON.includes('express')) seen.express++;
            if(packageJSON.includes('webpack')) seen.webpack++;
            if(packageJSON.includes('react')) seen.react++;
            if(packageJSON.includes('redux')) seen.redux++;
            if(packageJSON.includes('firebase')) seen.firebase++;

            return repo; //return the repo to indicate done
          });
      })
  ); //promises

  await Promise.all(promises);
  return seen;
  
};

export const getRepoContent = (repoName) => getCORS(`${BASE_URL}/repos/theartbug/${repoName}/git/trees/master?recursive=1`, options)
  .catch(err => console.log(err));

export const getPackageJson = (url) => getCORS(url, options)
  .catch(err => console.log(err));

export const findLanguages = async(repos) => {
  const seen = {};
  const promises = repos.map(repo => 
    getCORS(repo.languages_url, options)
      .then(languages => {
        const languagesArr = Object.keys(languages);
        if(languagesArr.length < 1) return;
        
        languagesArr.forEach(language => 
          seen[language] ? seen[language]++ : seen[language] = 1);
      })
      .catch(err => console.log(err))
  );

  await Promise.all(promises);
  return seen;

};