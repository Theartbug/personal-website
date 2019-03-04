import { SECTION_CHANGE, BUTTON_PRESS } from './reducers';
import { scroller } from 'react-scroll';

const list = ['hero', 'bio', 'skills', 'github', 'projects', 'contact'];

export const setCurrentSectionByButtons = section => dispatch => {
  scrollTo(list[section]);
  dispatch(setButtonScroll(true));
  dispatch(setCurrentSection(section));
};

export const setCurrentSectionByScroll = (className) => {
  const current = list.indexOf(className);
  return setCurrentSection(current);
};

export const setButtonScroll = bool => ({ type: BUTTON_PRESS, payload: bool });

const setCurrentSection = payload => ({ type: SECTION_CHANGE, payload });

const scrollTo = (id) => {
  if(!id) return;
  scroller.scrollTo(id, {
    duration: 1000,
    delay: 0,
    smooth: 'easeInOutQuart'
  });
};



