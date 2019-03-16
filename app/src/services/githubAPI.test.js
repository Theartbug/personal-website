jest.mock('./request', () => ({
  getCORS: jest.fn(() => Promise.resolve({}))
}));

import { repos, repo, listWithPackage, base64, listWithoutPackage } from './mockData.js';
import { useGithubApi, findLibraries, getRepoContent, findLanguages, getPackageJson } from './githubAPI';
import { getCORS } from './request';
import 'isomorphic-fetch';

describe('useGithubAPI tests', () => {
  
  const mockResponse = (status, statusText, response) => {
    return new Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  it('returns repositories', async() => {
    const fakePromise = Promise.resolve(mockResponse(200, null, repos));

    getCORS.mockReturnValueOnce(Promise.resolve(fakePromise));

    const result = await useGithubApi();
    
    expect(result.body).toBe(repos);
    expect(getCORS).toHaveBeenCalledTimes(1);
  });
  
  it('catches errors', async() => {
    const fakePromise = Promise.resolve(mockResponse(400, 'failed', 'this was an error'));
    console.log = jest.fn();

    //for getRepos
    getCORS.mockReturnValueOnce(Promise.reject(fakePromise));
    console.log('getRepos error');

    //for getRepoContent
    getCORS.mockReturnValueOnce(Promise.reject(fakePromise));
    console.log('getRepoContent error');

    //forPackageJson
    getCORS.mockReturnValueOnce(Promise.reject(fakePromise));
    console.log('forPackageJson error');
    
    const result1 = await getRepos();
    const result2 = await getRepoContent();
    const result3 = await getPackageJson();
    
    expect.assertions(6);
    expect(console.log.mock.calls[0][0]).toBe('getRepos error');
    expect(console.log.mock.calls[1][0]).toBe('getRepoContent error');
    expect(console.log.mock.calls[2][0]).toBe('forPackageJson error');

    //undefined as it is console.log
    expect(result1).toBe(undefined);
    expect(result2).toBe(undefined);
    expect(result3).toBe(undefined);
  });

  it('finds libraries', async() => {

    getCORS.mockReturnValueOnce(Promise.resolve(listWithPackage));

    getCORS.mockReturnValueOnce(Promise.resolve(base64));
    
    const result = await findLibraries(repo);

    expect(result).toEqual(
      { react: 0, webpack: 1, express: 0, redux: 0, firebase: 1, node: 1 });
    expect(getCORS).toHaveBeenCalledTimes(6);
  });

  it('does not find libraries', async() => {

    getCORS.mockReturnValueOnce(Promise.resolve(listWithoutPackage));

    const result = await findLibraries(repo);

    expect(result).toEqual(
      { react: 0, webpack: 0, express: 0, redux: 0, firebase: 0, node: 0 });
    expect(getCORS).toHaveBeenCalledTimes(7);
  });

  it('finds languages', async() => {

    const languages = {
      'JavaScript': 10371,
      'HTML': 7347,
      'CSS': 4677
    };
    
    getCORS.mockReturnValueOnce(Promise.resolve(languages));

    const result = await findLanguages(repo);

    expect(result).toEqual({ 'CSS': 1, 'HTML': 1, 'JavaScript': 1 });

    expect(getCORS).toHaveBeenCalledTimes(8);
    
  });

  it('does not find languages', async() => {

    const result = await findLanguages(repo);

    expect(result).toEqual({});
    expect(getCORS).toHaveBeenCalledTimes(9);
    
  });


});