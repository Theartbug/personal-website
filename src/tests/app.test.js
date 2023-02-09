import React from 'react';
import { render, within } from '@testing-library/react';
import './mocks/intersectionObserver';
import App from '../components/app/App';
import { BIO, SKILLS, GITHUB, PROJECTS, GALLERY, CONTACT } from '../components/app-context/actions';
import { useGithubApi } from '../services/githubApi/useGithubApi';

jest.mock('../services/githubApi/useGithubApi', () => ({
  useGithubApi: jest.fn(),
}));

describe('Whole App Tests', () => {
  test('renders whole page in default', () => {
    useGithubApi.mockImplementation(() => ({ loading: true }));
    const { getAllByRole, getByRole } = render(<App/>);

    // Splash
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('This is Ash Provost');
    expect(getByRole('img', { name: 'photo of Ash' })).toBeInTheDocument();

    // SECTIONS ORDER
    const sectionHeadings = [
      'About',
      'Skills',
      'Projects',
      'Gallery',
      'Contact',
      '© Ash Provost 2023',
    ];
    const sections = getAllByRole('region');
    expect(sections).toHaveLength(6);
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
      'cat-icon',
      'code-icon',
    ];
    const bioIcons = bioSection.getAllByRole('graphics-document');

    expect(bioIcons).toHaveLength(5);
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
      'docker'
    ];
    const skillImgs = skillsSection.getAllByRole('img');

    expect(skillImgs).toHaveLength(skills.length);
    skillImgs.forEach((skill, i) => {
      expect(skill).toHaveAttribute('alt', expect.stringContaining(skills[i]));
    });

    // GITHUB
    // const githubSection = within(getByRole('region', { name: GITHUB }));

    // expect(githubSection.getByRole('heading', { name: 'App Stats' })).toBeInTheDocument();
    // const smalls = [
    //   'Fetching data...',
    //   '*Powered by Github API',
    // ]
    // const smallTexts = githubSection.getAllByRole('presentation');
    // expect(smallTexts).toHaveLength(2);
    // smallTexts.forEach((small, i) => {
    //   expect(small).toHaveTextContent(smalls[i]);
    // });

    // PROJECTS
    const projectSection = within(getByRole('region', { name: PROJECTS }));

    expect(projectSection.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    const projectNames = [
      'Zoom',
      'Personal Website',
      'Adobe',
      'U-Gyde',
    ];
    const projectImgs = [
      'Zoom logo',
      'personal website',
      'Adobe logo',
      'U-Rate logo',
    ]
    const projects = projectSection.getAllByRole('group');
    expect(projects).toHaveLength(projectNames.length);
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

    // CONTACT
    const contactSection = within(getByRole('region', { name: CONTACT }));

    expect(contactSection.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
    expect(contactSection.getByRole('img')).toHaveAttribute('alt', 'bug logo');
    const icons = [
      'mail',
      'github',
      'linkedin',
    ];
    const hrefs = [
      'mailto:ash.g.provost@gmail.com',
      'https://github.com/Theartbug',
      'https://www.linkedin.com/in/ashprovost',
    ];
    const links = contactSection.getAllByRole('link');
    expect(links).toHaveLength(3);
    links.forEach((link, i) => {
      expect(link).toHaveAttribute('href', hrefs[i]);
      expect(link).toHaveTextContent(icons[i]);
    });

    // BUTTONS
    expect(getByRole('button', { name: 'up-button' })).toBeInTheDocument();
    expect(getByRole('button', { name: 'down-button' })).toBeInTheDocument();
  });
});

describe.skip('Github data tests', () => {
  test('renders github with error', () => {
    useGithubApi.mockImplementation(() => ({ error: true }));
    const { getByRole } = render(<App/>);

    const githubSection = within(getByRole('region', { name: GITHUB }));
    const smalls = [
      'Something went wrong...',
      '*Powered by Github API',
    ]
    const smallTexts = githubSection.getAllByRole('presentation');
    expect(smallTexts).toHaveLength(2);
    smallTexts.forEach((small, i) => {
      expect(small).toHaveTextContent(smalls[i]);
    });
  });
  test('renders github with data', () => {
    useGithubApi.mockImplementation(() => ({
      languages: {
        JavaScript: 39,
        HTML: 40,
        CSS: 38,
        TypeScript: 1,
        Java: 1,
      },
      libraries:{
        react: 10,
        webpack: 22,
        express: 8,
        redux: 5,
        firebase: 4,
        node: 33,
      },
    }));
    const { getByRole } = render(<App/>);
    const githubSection = within(getByRole('region', { name: GITHUB }));
    const languagesAndLibraries = githubSection.getAllByRole('list');
    expect(languagesAndLibraries).toHaveLength(2);
    const listSections = [
      'languages',
      'libraries',
    ];
    const languages = [
      'JavaScript',
      'HTML',
      'CSS',
      'TypeScript',
      'Java',
    ];
    const libraries = [
      'react',
      'webpack',
      'express',
      'redux',
      'firebase',
      'node',
    ];
    const llContents = {
      languages,
      libraries,
    }
    languagesAndLibraries.forEach((list, i) => {
      const listType = listSections[i];
      expect(list).toHaveClass(listType);
      const listItems = within(list).getAllByRole('listitem');

      listItems.forEach((content, j) => {
        const listItemHeader = within(content).getByRole('heading');
        const listItemHeaderContent = llContents[listType][j];
        expect(listItemHeader).toHaveTextContent(listItemHeaderContent);
      });
    });
  });
})