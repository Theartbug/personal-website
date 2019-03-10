import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useMyContext } from '../Components/AppContext/AppContext.js';
import { setCurrentSectionByScroll } from '../components/AppContext/actions';

export default function Wrapper(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

  function WithIntersectionObserver() {
    const [ref, inView] = useInView({ 
      //give a little wiggle room at the top before jumping to next section as 'current' for intersectionObserver
      rootMargin: '-10% 0px -55%',
    });
  
    const { buttonScroll: { buttonScroll }, dispatch } = useMyContext(Context);
  
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

