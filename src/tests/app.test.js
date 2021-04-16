import React from 'react';
import { render } from '@testing-library/react';
import './mocks/intersectionObserver';
import App from '../components/app/App';

jest.mock('../services/githubApi/useGithubApi', () => ({
  useGithubApi: () => ({ loading: true }),
}));

describe('Whole App Tests', () => {
  test('renders whole page', () => {
      const { getAllByRole, getByRole, container } = render(<App/>);
      expect(container).toMatchSnapshot();

      // Splash
      expect(getByRole('heading', { level: 1 })).toHaveTextContent('This is Ash Provost');
      expect(getByRole('img', { name: 'photo of Ash' })).toBeInTheDocument();

      // SECTIONS ORDER
      const sectionHeadings = [
        'About',
        'Skills',
        'Stats',
        'Projects',
        'Gallery',
        'Contact',
        '© Ash Provost 2021',
      ];
      const sections = getAllByRole('region');
      expect(sections).toHaveLength(7);
      sections.forEach((section, i) => {
        expect(section).toHaveTextContent(sectionHeadings[i]);
      });

      // BIO
      // const bioSection = getByRole('region', { name: 'About' });
      // expect(getByRole('heading', { name: 'About' })).toBeInTheDocument();


      // const iconTitles = [
      //   'bike-icon',
      //   'book-icon',
      //   'plant-icon',
      //   'code-icon',
      // ];
      // const bioIcons = getAllByRole('graphics-document');

      // bioIcons.forEach((icon, i) => {
      //   expect(icon).toHaveTextContent(iconTitles[i]);
      // });

      // expect(getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
      // expect(getByRole('heading', { name: 'App Stats' })).toBeInTheDocument();
      // expect(getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
      // expect(getByRole('heading', { name: 'Gallery' })).toBeInTheDocument();
      // expect(getByRole('heading', { name: 'Contact' })).toBeInTheDocument();


  });
});