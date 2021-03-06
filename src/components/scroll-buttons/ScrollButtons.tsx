import React, { useEffect } from 'react';
import { Events } from 'react-scroll';
import { setCurrentSectionByButtons, setButtonScroll } from '../app-context/actions';
import { useMyContext } from '../app-context/AppContext';
import { FaCaretUp as UpAngleIcon } from 'react-icons/fa';
import { FaCaretDown as DownAngleIcon } from 'react-icons/fa';
import './scroll-buttons.css';

const ScrollButtons: React.FC = (): JSX.Element => {
  const { currentSection, dispatch } = useMyContext();

  useEffect(setScrollListener, []);

  function setScrollListener() {
    //so the intersection observer does not interfere with react-scroll, must keep track in state
    Events.scrollEvent.register('end', () => dispatch(setButtonScroll(false)));

    // return the removal of the scrollEvent for hook
    return () => Events.scrollEvent.remove('end');
  }

  function handleDownClick() {
  //if the currentSection position is at the end and the direction wants to go further, dont let it.
    if(currentSection === 6) return;
    const next = currentSection + 1;
    dispatch(setCurrentSectionByButtons(next));
  }

  function handleUpClick() {
  //if the currentSection position is at the beginning and the direction wants to go further, dont let it.
    if(currentSection === 0) return;
    const prev = currentSection - 1;
    dispatch(setCurrentSectionByButtons(prev));
  }

  return (
    <div className='scroll-buttons'>
      <button
        aria-label='up-button'
        className='up reset-button'
        onClick={ handleUpClick }>
        <UpAngleIcon/>
      </button>
      <button
        aria-label='down-button'
        className='down reset-button'
        onClick={ handleDownClick }>
        <DownAngleIcon/>
      </button>
    </div>
  );
}

export default ScrollButtons;