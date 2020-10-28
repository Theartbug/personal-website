import { useInView } from 'react-intersection-observer';
import { useMyContext } from '../components/app-context/AppContext.js';
import { setCurrentSectionByScroll } from '../components/app-context/actions.js';

export default function useIntersectionObserver(displayName) {
  const [ref, inView] = useInView({ 
    //shrink the size of the root intersecting area to limit the amount that will be in view for currentSection
    rootMargin: '-10% 0px -65%',
  });

  const { buttonScroll, dispatch } = useMyContext();

  function handleChange() {
    // if we aren't currently scrolling from the buttons, change the current section in the store
    if(!buttonScroll) dispatch(setCurrentSectionByScroll(displayName));
  };

  if(inView) handleChange();
  
  return ref;
}
