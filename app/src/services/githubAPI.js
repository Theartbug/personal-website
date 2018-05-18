import { getCORS } from './request';
const BASE_URL = 'https://api.github.com';
const options = {
  Authorization: process.env.GITHUB_TOKEN
};

export const getLanguages = () => {
  return getRepos(options)
    .then(r => findLanguages(r));

};

const getRepos = (options) => {
  const url = `${BASE_URL}/users/theartbug/repos?per_page=100`;
  return getCORS(url, options);
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

  return Promise.all(promises)
    .then(() => seen);

};