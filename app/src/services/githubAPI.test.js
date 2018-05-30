// jest.mock('./request', () => ({
//   getCORS: jest.fn(() => Promise.resolve({}))
// }));
jest.mock('./githubAPI', () => ({
  getRepos: jest.fn(() => Promise.resolve([
    { name: 'one' },
    { name: 'two' },
    { name: 'three' }
  ])),
  getLanguagesAndLibraries: jest.fn(() => Promise.resolve({}))
}));

const mockRepos = [
  { name: 'one' },
  { name: 'two' },
  { name: 'three' }
];

import { getLanguagesAndLibraries } from './githubAPI';
import 'isomorphic-fetch';

describe('languages and libraries async spec', () => {

  const message = 'message';
  const mockResponse = (status, statusText, response) => {
    return new Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  it('succeeds a call', async() => {
    // const fakePromise = Promise.resolve(mockResponse(200, null, JSON.stringify({ message })));
    
    // getLanguagesAndLibraries.mockImplementationOnce(() => fakePromise);

    getLanguagesAndLibraries();

    // await Promise.all([fakePromise]);
    
    expect.assertions(2);

    expect(getLanguagesAndLibraries).toHaveBeenCalled();
    expect(getLanguagesAndLibraries.mock.calls[0]).toBe(mockRepos);
  });



});