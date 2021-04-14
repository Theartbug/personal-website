import React from 'react';
import { render } from '@testing-library/react';
import './mocks/intersectionObserver';
import App from '../components/app/App';

jest.mock('../services/githubApi/useGithubApi', () => ({
  useGithubApi: () => ({ loading: true }),
}));

describe('Whole App Tests', () => {
  test('renders whole page', () => {
      const { getByRole, container } = render(<App/>);
      expect(container).toMatchSnapshot();

      // Splash
      expect(getByRole('heading', { level: 1 })).toHaveTextContent('This is Ash Provost');
      expect(getByRole('img', { name: 'photo of Ash' })).toBeInTheDocument();

      // BIO

      expect()


  });
});