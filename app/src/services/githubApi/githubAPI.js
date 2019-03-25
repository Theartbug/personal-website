import { useEffect, useReducer } from 'react';
import { getCORS } from '../request.js';
import { githubReducer } from './reducers.js';
import {
  setLanguagesAndLibraries,
  setRepos,
  setFailure,
} from './actions.js';

const BASE_URL = 'https://api.github.com';
const LANGUAGES_AND_LIBRARIES = 'languagesAndLibraries';

const options = {
  withCredentials: true,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};

const initialState = {
  loading: true,
  error: false,
  repos: null,
  languages: null,
  libraries: null,
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

export const getRepoContent = (repoName) => getCORS(`${BASE_URL}/repos/theartbug/${repoName}/git/trees/master?recursive=1`, options);

export const getPackageJson = (url) => getCORS(url, options);

export const findLibraries = async (repos) => {
  const seen = {
    react: 0,
    webpack: 0,
    express: 0,
    redux: 0,
    firebase: 0,
    node: 0
  };

  try {
    const promises = repos.map(async repo => {
      //fetch content list for each repo
      const list = await getRepoContent(repo.name);

      //find the index of the package.json in the tree
      const packageJSONIndex = list.tree.findIndex(item => item.path.includes('package.json'));
  
      //if there is no package.json, end
      if(packageJSONIndex === -1) return repo; 

      seen.node++;

      //get the contents of the package.json
      const encoded = await getPackageJson(list.tree[packageJSONIndex].url);
      //convert from base64 then stringify
      const packageJSON = JSON.stringify(window.atob(encoded.content));

      if(packageJSON.includes('express')) seen.express++;
      if(packageJSON.includes('webpack')) seen.webpack++;
      if(packageJSON.includes('react')) seen.react++;
      if(packageJSON.includes('redux')) seen.redux++;
      if(packageJSON.includes('firebase')) seen.firebase++;

      return repo; //return the repo to indicate done
    }); //promises
  
    await Promise.all(promises);
    return seen;

  } catch(e) {
    throw new Error(e);
  }
};

export const findLanguages = async (repos) => {
  const seen = {};
  try {
    const promises = repos.map(async repo => {
      const languages = await getCORS(repo.languages_url, options)
      const languagesArr = Object.keys(languages);
      if(languagesArr.length < 1) return;
      
      languagesArr.forEach(language => 
        seen[language] ? seen[language]++ : seen[language] = 1);
    });

    await Promise.all(promises);
    return seen;
  } catch(e) {
    throw new Error(e);
  }
};