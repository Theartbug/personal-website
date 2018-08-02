import { getCORS } from './request';
const BASE_URL = 'https://api.github.com';
const options = {
  withCredentials: true,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};

const checkCache = () => {
  const storage = localStorage.getItem('languagesAndLibraries');
  if(!storage) return false;
  const convertedStorage = JSON.parse(storage);
  const { date } = convertedStorage;
  //if the storage was fetched in the past month (below in milliseconds), return it, else fetch it again
  return new Date() - new Date(date) > 454305569297142.8125 ? false : convertedStorage;
  
};

export const getLanguagesAndLibraries = () => {

  const storage = checkCache();

  //must create as promise for .then() in Github.js
  if(storage) return new Promise((resolve) => resolve(storage));
  else {
    return getRepos(options)
      .then(async(r) => {
        const contents = await Promise.all([findLanguages(r), findLibraries(r)]);
        const date = new Date();
        const storage = { languages: contents[0], libraries: contents[1], date }; 
        localStorage.setItem('languagesAndLibraries', JSON.stringify(storage)); //set the item into storage for next time
        return storage;
      });

  }
};

export const getRepos = (options) => {
  const url = `${BASE_URL}/users/theartbug/repos?per_page=100`;
  return getCORS(url, options)
    .catch(err => console.log(err));
};

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