import { scroller } from 'react-scroll';
import { middlewareType } from './AppContext';

export const HERO = 'hero';
export const BIO = 'bio';
export const SKILLS = 'skills';
export const GITHUB = 'github';
export const CONTACT = 'contact';
export const PROJECTS = 'projects';
export const GALLERY = 'gallery';

const list = [HERO, BIO, SKILLS, GITHUB, PROJECTS, GALLERY, CONTACT];

const scrollTo = (id) => {
  if(!id) return;
  scroller.scrollTo(id, {
    duration: 1000,
    delay: 0,
    smooth: 'easeInOutQuart'
  });
};

export const setCurrentSectionByButtons = (section: number) => (dispatch: middlewareType) => {
  scrollTo(list[section]);
  dispatch(setButtonScroll(true));
  dispatch(setCurrentSection(section));
};

export const setCurrentSectionByScroll = section => {
  const current = list.indexOf(section);
  return setCurrentSection(current);
};

export const BUTTON_PRESS = 'BUTTON_PRESS';
type ButtonScrollType = {
  type: typeof BUTTON_PRESS;
  payload: boolean;
};

export const setButtonScroll = (payload: boolean): ButtonScrollType => ({
  type: BUTTON_PRESS,
  payload
});

export const SECTION_CHANGE = 'SECTION_CHANGE';
type CurrentSectionType = {
  type: typeof SECTION_CHANGE;
  payload: number;
};

const setCurrentSection = (payload: number): CurrentSectionType => ({
  type: SECTION_CHANGE,
  payload
});


export type Action = CurrentSectionType | ButtonScrollType;


