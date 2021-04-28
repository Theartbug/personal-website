import React from 'react';
import { render, within } from '@testing-library/react';
import './mocks/intersectionObserver';
import App from '../components/app/App';
import { BIO, SKILLS, GITHUB, PROJECTS, GALLERY } from '../components/app-context/actions';

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

      // SKILLS
      const skillsSection = within(getByRole('region', { name: SKILLS }));

      expect(skillsSection.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
      const skills = [
        'react',
        'redux',
        'jest',
        'react testing library',
        'typescript',
        'selenium',
        'webpack',
        'node',
        'firebase',
      ];
      const skillImgs = skillsSection.getAllByRole('img');

      expect(skillImgs).toHaveLength(9);
      skillImgs.forEach((skill, i) => {
        expect(skill).toHaveAttribute('alt', expect.stringContaining(skills[i]));
      });

      // GITHUB
      const githubSection = within(getByRole('region', { name: GITHUB }));

      expect(githubSection.getByRole('heading', { name: 'App Stats' })).toBeInTheDocument();
      const smalls = [
        'Fetching data...',
        '*Powered by Github API',
      ]
      const smallTexts = githubSection.getAllByRole('presentation');
      expect(smallTexts).toHaveLength(2);
      smallTexts.forEach((small, i) => {
        expect(small).toHaveTextContent(smalls[i]);
      });

      // PROJECTS
      const projectSection = within(getByRole('region', { name: PROJECTS }));

      expect(projectSection.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
      const projectNames = [
        'Personal Website',
        'Adobe',
        'U-Gyde',
        'ParkPlace',
        'PokeFlip',
      ];
      const projectImgs = [
        'personal website',
        'marketo logo',
        'U-Rate logo',
        'Park Place screenshot',
        'Pokeflip screenshot',
      ]
      const projects = projectSection.getAllByRole('group');
      expect(projects).toHaveLength(5);
      projects.forEach((project, i) => {
        expect(within(project).getByRole('img')).toHaveAttribute('alt', projectImgs[i]);
        expect(within(project).getByRole('heading', { level: 3 })).toHaveTextContent(projectNames[i]);
      });

      // GALLERY
      const gallerySection = within(getByRole('region', { name: GALLERY }));

      expect(gallerySection.getByRole('heading', { name: 'Gallery' })).toBeInTheDocument();
      expect(gallerySection.getByRole('heading', { name: 'Gallery' }).nextElementSibling).toHaveTextContent('Snaps from my life');
      const lifeSnapsAlts = [
        '7 Lakes Basin of Olympic National Forest',
        'Some good city cat pets',
        'Wet mushroom whilst hiking',
        'Climbing at Smith Rock',
        'Angels Rest after 2017 fire',
        'Getting some good kitty pets',
        'Snowshoeing Elk Lake, Mt. Hood'
      ];
      const snaps = gallerySection.getAllByRole('img');
      expect(snaps).toHaveLength(7);
      snaps.forEach((snap, i) => {
        expect(snap).toHaveAttribute('alt', lifeSnapsAlts[i]);
        expect(snap.nextElementSibling).toHaveTextContent(lifeSnapsAlts[i]);
      });

      // expect(getByRole('heading', { name: 'Contact' })).toBeInTheDocument();


  });
});