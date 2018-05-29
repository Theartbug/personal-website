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

const getRepos = (options) => {
  const url = `${BASE_URL}/users/theartbug/repos?per_page=100`;
  return getCORS(url, options);
};

const findLibraries = async(repos) => {
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
    getCORS(`${BASE_URL}/repos/theartbug/${repo.name}/git/trees/master?recursive=1`, options)
      .then(list => {
        //find the index of the package.json in the tree
        const packageJSONIndex = list.tree.findIndex(item => item.path.includes('package.json'));

        if(packageJSONIndex === -1) return repo; //if there is no package.json, end

        seen.node++;

        //get the contents of the package.json
        return getCORS(list.tree[packageJSONIndex].url, options)
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

const findLanguages = async(repos) => {
  const seen = {};
  const promises = repos.map(repo => 
    getCORS(repo.languages_url, options)
      .then(languages => {
        const languagesArr = Object.keys(languages);
        if(languagesArr.length < 1) return;
        
        languagesArr.forEach(language => 
          seen[language] ? seen[language]++ : seen[language] = 1);
      })
  );

  await Promise.all(promises);
  return seen;

};