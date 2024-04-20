
import react from './react.png';
import redux from './redux.png';
import jest from './jest.png';
import rtl from './RTL.png';
import ts from './TS.png';
import docker from './docker.png';

type Skill = {
  src: string,
  alt: string,
};

export const skills: Skill[] = [
  {
    src: ts,
    alt: 'typescript logo',
  },
  {
    src: react,
    alt: 'react logo',
  },
  {
    src: redux,
    alt: 'redux logo',
  },
  {
    src: jest,
    alt: 'jest logo',
  },
  {
    src: rtl,
    alt: 'react testing library logo',
  },
  {
    src: docker,
    alt: 'docker logo',
  },
];
