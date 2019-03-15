import { useDataApi } from './useDataApi.js';
import { useState, useEffect } from 'react';
import { getCORS } from './request.js';

const LANGUAGES_AND_LIBRARIES = 'languagesAndLibraries';

const BASE_URL = 'https://api.github.com';
const options = {
  withCredentials: true,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};

// const githubReducer = (state, { type, payload }) => {
//   switch (type) {
//     case 'FETCH_INIT':
//       return {
//         ...state,
//         isLoading: true,
//         isError: false
//       };
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         isLoading: false,
//         isError: false,
//         data: payload,
//       };
//     case 'FETCH_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };
//     default:
//       throw new Error();
//   }
// };

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
  localStorage.setItem(LANGUAGES_AND_LIBRARIES, JSON.stringify(storage)); //set the item into storage for next time
}

export const useGithubApi = () => {
  const [repos, setRepos] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [libraries, setLibraries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const storage = checkCache();

  useEffect(() => {
    if(storage) {
      setLanguages(storage.languages);
      setLibraries(storage.libraries);
      setLoading(false);
    } else {
      async function getRepos() {
        const url = `${BASE_URL}/users/theartbug/repos?per_page=100`;
        try {
          const data = await getCORS(url, options)
          setRepos(data);
        } catch(e) {
          setError(true);
        }
      };
      getRepos(); // let the async functions manipulate the data
    }
  }, []);

  useEffect(() => {
    async function getLanguagesAndLibraries(data) {
      try {
        const [returnedLanguages, returnedLibraries] = await Promise.all([
          findLanguages(data),
          findLibraries(data),
        ]);
        setLanguages(returnedLanguages);
        setLibraries(returnedLibraries);
        setStorage({ languages: returnedLanguages, libraries: returnedLibraries }); // set storage for next time
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    } 
    if(repos) getLanguagesAndLibraries(repos);
  }, [repos]);

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