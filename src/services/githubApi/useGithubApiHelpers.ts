import { getCORS, Options } from '../request';
import { Repo, Languages, Libraries } from './reducers';

const BASE_URL = 'https://api.github.com';
const URL = `${BASE_URL}/users/theartbug/repos?per_page=100`;
const options: Options = {
  withCredentials: true,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
};

export const fetchRepos = async (): Promise<Repo[]> => await getCORS(URL, options);

const LANGUAGES_AND_LIBRARIES = 'languagesAndLibraries';
type Storage = {
  languages: Languages,
  libraries: Libraries,
  date: number,
};

export function getStorage(): Storage | null {
  const storage = localStorage.getItem(LANGUAGES_AND_LIBRARIES);
  if (storage) {
    const convertedStorage = JSON.parse(storage);
    const { date } = convertedStorage;
    //if the storage was fetched in the past month (in milliseconds), return it, else return null to fetch again
    if (new Date().getTime() - date < 454305569297142.8125) return convertedStorage;
  }
  return null;
};

export function setStorage({ languages, libraries }: { languages: Languages, libraries: Libraries }): void {
  const date = new Date().getTime();
  const storage = {
    languages,
    libraries,
    date
  };
  //set the item into storage for next time
  localStorage.setItem(LANGUAGES_AND_LIBRARIES, JSON.stringify(storage));
}

type RepoItem = {
  path: string;
  url: string;
};

type RepoContent = {
  tree: RepoItem[],
};

export const getRepoContent = (repoName: string): Promise<RepoContent> => getCORS(`${BASE_URL}/repos/theartbug/${repoName}/git/trees/master?recursive=1`, options);

type Package = {
  content: string;
};

export const getPackage = (url: string): Promise<Package> => getCORS(url, options);

export const findLibraries = async (repos: Repo[]): Promise<Libraries> => {
  const seen = {
    react: 0,
    webpack: 0,
    express: 0,
    redux: 0,
    firebase: 0,
    node: 0,
  };

  try {
    const promises = repos.map(async repo => {
      //fetch content list for each repo
      const list = await getRepoContent(repo.name);

      //find the index of the package.json in the tree
      const packageJSONIndex = list.tree.findIndex(item => item.path.includes('package.json'));
      //if there is no package.json, end
      if(packageJSONIndex !== -1) {
        let packages = '';

        //if we found a package.json
        if (packageJSONIndex > -1) {
          seen.node++;
          //get the contents of the package.json
          const encoded = await getPackage(list.tree[packageJSONIndex].url);
          //convert from base64 then stringify
          packages = JSON.stringify(window.atob(encoded.content));
        }

        if(packages.includes('express')) seen.express++;
        if(packages.includes('webpack')) seen.webpack++;
        if(packages.includes('react')) seen.react++;
        if(packages.includes('redux')) seen.redux++;
        if(packages.includes('firebase')) seen.firebase++;
      }

      return repo; //return the repo to indicate done
    }); //promises

    await Promise.all(promises);
    return seen;
  } catch(e) {
    throw new Error(e);
  }
};

export const findLanguages = async (repos: Repo[]): Promise<Languages> => {
  const seen = {};
  try {
    const promises = repos.map(async ({ languages_url }) => {
      const languages = await getCORS(languages_url, options);
      const languagesArr = Object.keys(languages);
      if(languagesArr.length > 1) {
        languagesArr.forEach(language =>
          seen[language] ? seen[language]++ : seen[language] = 1);
      }
    });

    await Promise.all(promises);
    return seen;
  } catch(e) {
    throw new Error(e);
  }
};