export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_LANGUAGES_AND_LIBRARIES = 'FETCH_LANGUAGES_AND_LIBRARIES';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export type Repo = {
  name: string,
  languages_url: string,
};

type LanguagesAndLibrariesAction = {
  type: typeof FETCH_LANGUAGES_AND_LIBRARIES, payload: {
    languages: Record<string,number>,
    libraries: Record<string,number>,
  },
}
export const setLanguagesAndLibraries = ({ languages, libraries }): LanguagesAndLibrariesAction => ({
  type: FETCH_LANGUAGES_AND_LIBRARIES,
  payload: {
    languages,
    libraries,
  }
});

type ReposAction = {
  type: typeof FETCH_REPOS,
  payload: Repo[]
}
export const setRepos = (payload: Repo[]): ReposAction => ({
  type: FETCH_REPOS,
  payload
});

export type Action = { type: typeof FETCH_INIT }
  | { type: typeof FETCH_FAILURE }
  | ReposAction
  | LanguagesAndLibrariesAction;
