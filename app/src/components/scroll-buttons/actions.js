import { SECTION_CHANGE, BUTTON_PRESS } from './reducers';
import store from '../../store/store';
import { scroller } from 'react-scroll';

const list = ['hero', 'bio', 'skills', 'github', 'projects', 'contact'];

export const setCurrentSectionByButtons = (direction) => {
  const { currentSection } = store.getState();
  //if the currentSection position is at the beginning or the end and the direction wants to go further, dont let it.
  if(currentSection === 0 && !direction || currentSection === 5 && direction) return;
  //may need to pass this check prior to the action creator, may create null
  
  const section = direction ? currentSection + 1 : currentSection - 1;
  scrollTo(list[section]);
  return setCurrentSection(section);
};

export const setCurrentSectionByScroll = entry => {
  const { target: { className }, isIntersecting, intersectionRatio } = entry;
  const current = list.indexOf(className);

  if(isIntersecting === true || intersectionRatio > 0) {
    //may need to pass this check prior to the action creator, may create null
    return {
      type: SECTION_CHANGE,
      payload: current
    };
  }
};

export const setButtonScroll = (bool) => ({ type: BUTTON_PRESS, payload: bool });

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



