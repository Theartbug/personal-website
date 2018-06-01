import { getCORS } from './request';
const BASE_URL = 'https://api.github.com';
const options = {
  withCredentials: true,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};

export const getLanguagesAndLibraries = () => {
  return getRepos(options)
    .then(async(r) => {
      const contents = await Promise.all([findLanguages(r), findLibraries(r)]);

      return { languages: contents[0], libraries: contents[1] };
    });
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

export const getRepoContent = (repoName) => getCORS(`${BASE_URL}/repos/theartbug/${repoName}/git/trees/master?recursive=1`, options).catch(err => console.log(err));

export const getPackageJson = (url) => getCORS(url, options).catch(err => console.log(err));

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