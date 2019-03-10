import React, { useEffect } from 'react';
import { Events } from 'react-scroll';
import { setCurrentSectionByButtons, setButtonScroll } from '../appContext/actions.js';
import { useMyContext } from '../appContext/AppContext.js';
import UpAngleIcon from 'react-icons/lib/fa/caret-up';
import DownAngleIcon from 'react-icons/lib/fa/caret-down';
import './scroll-buttons.css';

export default function ScrollButtons(props) {
  // const { setButtonScroll, currentSection, setCurrentSectionByButtons } = props;
  const { currentSection: { currentSection }, dispatch } = useMyContext();
  
  useEffect(setScrollListener, []);

  function setScrollListener() {
    //so the intersection observer does not interfere with react-scroll, must keep track in state
    Events.scrollEvent.register('end', () => dispatch(setButtonScroll(false)));

    // return the removal of the scrollEvent for hook
    return () => Events.scrollEvent.remove('end');
  }

  function handleDownClick() {
  //if the currentSection position is at the end and the direction wants to go further, dont let it.
    if(currentSection === 5) return;
    const next = currentSection + 1;
    dispatch(setCurrentSectionByButtons(next));
  };

  function handleUpClick() {
  //if the currentSection position is at the beginning the direction wants to go further, dont let it.
    if(currentSection === 0) return;
    const prev = currentSection - 1;
    dispatch(setCurrentSectionByButtons(prev));
  };

  return (
    <div className="scroll-buttons">
      <button 
        className="up reset-button" 
        onClick={ handleUpClick }>
        <UpAngleIcon/>
      </button>
      <button 
        className="down reset-button" 
        onClick={ handleDownClick }>
        <DownAngleIcon/>
      </button>
    </div>
  );
}