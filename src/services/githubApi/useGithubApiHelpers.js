import { getCORS } from '../request.js';

const LANGUAGES_AND_LIBRARIES = 'languagesAndLibraries';
export const BASE_URL = 'https://api.github.com';
export const options = {
  withCredentials: true,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};

export function checkCache() {
  const storage = localStorage.getItem(LANGUAGES_AND_LIBRARIES);
  if(!storage) return false;
  const convertedStorage = JSON.parse(storage);
  const { date } = convertedStorage;
  //if the storage was fetched in the past month (below in milliseconds), return it, else fetch it again
  return (new Date() - new Date(date) < 454305569297142.8125) && convertedStorage;
};

export function setStorage({ languages, libraries }) {
  const date = new Date();
  const storage = { 
    languages, 
    libraries, 
    date 
  }; 
  //set the item into storage for next time
  localStorage.setItem(LANGUAGES_AND_LIBRARIES, JSON.stringify(storage)); 
}

export const getRepoContent = (repoName) => getCORS(`${BASE_URL}/repos/theartbug/${repoName}/git/trees/master?recursive=1`, options);

export const getPackage = (url) => getCORS(url, options);

export const findLibraries = async (repos) => {
  const seen = {
    react: 0,
    webpack: 0,
    express: 0,
    redux: 0,
    firebase: 0,
    node: 0,
    spring: 0,
    mysql: 0,
    hibernate: 0,
    maven: 0,
  };

  try {
    const promises = repos.map(async repo => {
      //fetch content list for each repo
      const list = await getRepoContent(repo.name);

      //find the index of the package.json or pom.xml in the tree
      const packageJSONIndex = list.tree.findIndex(item => item.path.includes('package.json'));
      const pomXMLIndex = list.tree.findIndex(item => item.path.includes('pom.xml'));
  
      //if there is no neither, end
      if(packageJSONIndex === -1 && pomXMLIndex === -1) return repo; 

      let packages;

      //if we found a package.json
      if (packageJSONIndex > -1) {
        seen.node++;
        //get the contents of the package.json
        const encoded = await getPackage(list.tree[packageJSONIndex].url);
        //convert from base64 then stringify
        packages = JSON.stringify(window.atob(encoded.content));
      }
      // if we found a pom.xml
      if (pomXMLIndex > -1) {
        //get the contents of the pom.xml
         const encoded = await getPackage(list.tree[pomXMLIndex].url);
        //convert from base64 then stringify
        packages = window.atob(encoded.content);
      }

      if(packages.includes('express')) seen.express++;
      if(packages.includes('webpack')) seen.webpack++;
      if(packages.includes('react')) seen.react++;
      if(packages.includes('redux')) seen.redux++;
      if(packages.includes('firebase')) seen.firebase++;
      if(packages.includes('spring')) seen.spring++;
      if(packages.includes('mysql')) seen.mysql++;
      if(packages.includes('hibernate')) seen.hibernate++;
      if(packages.includes('maven')) seen.maven++;
      

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