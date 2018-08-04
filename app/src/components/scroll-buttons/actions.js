import { SECTION_CHANGE, BUTTON_PRESS } from './reducers';
import store from '../../store/store';
import { scroller } from 'react-scroll';

const list = ['hero', 'bio', 'skills', 'github', 'projects', 'contact'];

export const setCurrentSectionByButtons = (direction) => {
  const { current } = store.getState();
  //if the current position is at the beginning or the end and the direction wants to go further, dont let it.
  if(current === 0 && !direction || current === 5 && direction) return;
  
  const section = direction ? current + 1 : current - 1;
  scrollTo(list[section]);
  return setCurrentSection(section);
};

export const setCurrentSectionByScroll = entry => {
  const { buttonScroll } = store.getState();
  if(buttonScroll) return; //if we are scrolling via react-scroll, don't proceed

  const { target: { className }, isIntersecting, intersectionRatio } = entry;
  const current = list.indexOf(className);

  if(isIntersecting === true || intersectionRatio > 0) setCurrentSection(current); 
};

export const setButtonScroll = (bool) => 
  ({
    type: BUTTON_PRESS,
    payload: bool
  });

const setCurrentSection = payload => dispatch => {
  dispatch({
    type: SECTION_CHANGE,
    payload
  });
  dispatch(setButtonScroll(true));
};

const scrollTo = (id) => {
  if(!id) return;
  scroller.scrollTo(id, {
    duration: 1000,
    delay: 0,
    smooth: 'easeInOutQuart'
  });
};



