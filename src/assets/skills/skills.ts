import firebase from './firebase.png';
import node from './node.png';
import react from './react.png';
import redux from './redux.png';
import webpack from './webpack.png';
import jest from './jest.png';
import rtl from './RTL.png';
import ts from './TS.png';
import selenium from './selenium.png';

type Skill = {
  src: string,
  alt: string,
};

export const skills: Skill[] = [
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
    src: ts,
    alt: 'typescript logo',
  },
  {
    src: selenium,
    alt: 'selenium logo',
  },
  {
    src: webpack,
    alt: 'webpack logo',
  },
  {
    src: node,
    alt: 'node logo',
  },
  {
    src: firebase,
    alt: 'firebase logo',
  },
];
