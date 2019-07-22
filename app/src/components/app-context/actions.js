import { SECTION_CHANGE, BUTTON_PRESS } from './reducers';
import { scroller } from 'react-scroll';

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

export const setCurrentSectionByButtons = section => dispatch => {
  scrollTo(list[section]);
  dispatch(setButtonScroll(true));
  dispatch(setCurrentSection(section));
};

export const setCurrentSectionByScroll = section => {
  const current = list.indexOf(section);
  return setCurrentSection(current);
};

export const setButtonScroll = payload => ({ 
  type: BUTTON_PRESS, 
  payload
});

const setCurrentSection = payload => ({ 
  type: SECTION_CHANGE, 
  payload 
});



