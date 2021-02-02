import {
  FETCH_INIT,
  FETCH_REPOS,
  FETCH_LANGUAGES_AND_LIBRARIES,
  FETCH_FAILURE,
  Action,
} from './actions';

export const initialState = {
  loading: true,
  error: false,
};

export type Repo = {
  name: string,
  languages_url: string,
};

export type Libraries = {
  react: number;
  webpack: number;
  express: number;
  redux: number;
  firebase: number;
  node: number;
  mysql: number;
};

export type Languages = Record<string,number>;

export type State = {
  loading: boolean;
  error: boolean;
  repos: Repo[];
  languages: Languages;
  libraries: Libraries;
}

export const githubReducer = (state: State, { type, payload }: Action): State => {
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
      return state;
  }
};