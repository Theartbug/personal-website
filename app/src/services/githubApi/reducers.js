export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_REPOS = 'FETCH_REPOS';
export const FETCH_LANGUAGES_AND_LIBRARIES = 'FETCH_LANGUAGES_AND_LIBRARIES';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const githubReducer = (state, { type, payload }) => {
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
      throw new Error();
  }
};