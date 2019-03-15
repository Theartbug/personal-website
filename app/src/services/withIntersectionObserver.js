import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useMyContext } from '../components/appContext/AppContext.js';
import { setCurrentSectionByScroll } from '../components/appContext/actions.js';

export default function Wrapper(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

  function WithIntersectionObserver() {
    const [ref, inView] = useInView({ 
      //shrink the size of the root intersecting area to limit the amount that will be in view for currentSection
      rootMargin: '-10% 0px -65%',
    });

    const { buttonScroll, dispatch } = useMyContext();
  
    function handleChange() {
      // if we aren't currently scrolling from the buttons, change the current section in the store
      if(!buttonScroll) dispatch(setCurrentSectionByScroll(displayName.toLowerCase()));
    };
  
    if(inView) handleChange();
  
    // each child component will need React.forwardRef() as refs cannot be passed to functions (what BaseComponent is)
    return <BaseComponent ref={ref}/>; 
  }

  WithIntersectionObserver.displayName = `withIntersectionObserver(${displayName})`;

  return WithIntersectionObserver;
}

