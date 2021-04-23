import React from 'react';
import { render, within } from '@testing-library/react';
import './mocks/intersectionObserver';
import App from '../components/app/App';
import { BIO } from '../components/app-context/actions';

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
      const bioSection = within(getByRole('region', { name: BIO }));
      expect(bioSection.getByRole('heading', { name: 'About' })).toBeInTheDocument();

      const iconTitles = [
        'bike-icon',
        'book-icon',
        'plant-icon',
        'code-icon',
      ];
      const bioIcons = bioSection.getAllByRole('graphics-document');

      expect(bioIcons).toHaveLength(4);
      bioIcons.forEach((icon, i) => {
        expect(icon).toHaveTextContent(iconTitles[i]);
        expect(icon.parentElement.querySelector('p')).toBeInTheDocument();
      });

      // expect(getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
      // expect(getByRole('heading', { name: 'App Stats' })).toBeInTheDocument();
      // expect(getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
      // expect(getByRole('heading', { name: 'Gallery' })).toBeInTheDocument();
      // expect(getByRole('heading', { name: 'Contact' })).toBeInTheDocument();


  });
});