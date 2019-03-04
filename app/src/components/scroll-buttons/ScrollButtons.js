import React, { useEffect } from 'react';
import { Events } from 'react-scroll';
import { connect } from 'react-redux';
import { setCurrentSectionByButtons, setButtonScroll } from './actions';
import UpAngleIcon from 'react-icons/lib/fa/caret-up';
import DownAngleIcon from 'react-icons/lib/fa/caret-down';
import './scroll-buttons.css';

export function ScrollButtons(props) {
  const { setButtonScroll, currentSection, setCurrentSectionByButtons } = props;

  useEffect(setScrollListener, []);

  function setScrollListener() {
    //so the intersection observer does not interfere with react-scroll, must keep track in state
    Events.scrollEvent.register('end', () => setButtonScroll(false));

    // return the removal of the scrollEvent for hook
    return () => Events.scrollEvent.remove('end');
  }

  function handleDownClick() {
  //if the currentSection position is at the end and the direction wants to go further, dont let it.
    if(currentSection === 5) return;
    const next = currentSection + 1;
    setCurrentSectionByButtons(next);
  };

  function handleUpClick() {
  //if the currentSection position is at the beginning the direction wants to go further, dont let it.
    if(currentSection === 0) return;
    const prev = currentSection - 1;
    setCurrentSectionByButtons(prev);
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

export default connect(
  ({ currentSection }) => ({
    currentSection
  }),
  ({ setCurrentSectionByButtons, setButtonScroll })
)(ScrollButtons);