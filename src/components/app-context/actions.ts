import { scroller } from 'react-scroll';
import { Middleware } from './AppContext';

export const HERO = 'hero';
export const BIO = 'bio';
export const SKILLS = 'skills';
export const GITHUB = 'github';
export const CONTACT = 'contact';
export const PROJECTS = 'projects';
export const GALLERY = 'gallery';

export type appAreaIds = typeof HERO
  | typeof BIO
  | typeof SKILLS
  | typeof GITHUB
  | typeof PROJECTS
  | typeof GALLERY
  | typeof CONTACT;

type orderedList = [
  typeof HERO,
  typeof BIO,
  typeof SKILLS,
  typeof GITHUB,
  typeof PROJECTS,
  typeof GALLERY,
  typeof CONTACT,
];

const list: orderedList = [HERO, BIO, SKILLS, GITHUB, PROJECTS, GALLERY, CONTACT];

const scrollTo = (id: appAreaIds): void => {
  if(!id) return;
  scroller.scrollTo(id, {
    duration: 1000,
    delay: 0,
    smooth: 'easeInOutQuart'
  });
};

export const setCurrentSectionByButtons = (section: number) => (dispatch: Middleware): void => {
  scrollTo(list[section]);
  dispatch(setButtonScroll(true));
  dispatch(setCurrentSection(section));
};

export const setCurrentSectionByScroll = (section: appAreaIds) => {
  const current = list.indexOf(section);
  return setCurrentSection(current);
};

export const BUTTON_PRESS = 'BUTTON_PRESS';
type buttonScrollAction = {
  type: typeof BUTTON_PRESS;
  payload: boolean;
};
export const setButtonScroll = (payload: boolean): buttonScrollAction => ({
  type: BUTTON_PRESS,
  payload
});

export const SECTION_CHANGE = 'SECTION_CHANGE';
type currentSectionAction = {
  type: typeof SECTION_CHANGE;
  payload: number;
};
const setCurrentSection = (payload: number): currentSectionAction => ({
  type: SECTION_CHANGE,
  payload
});


export type Action = currentSectionAction | buttonScrollAction;


