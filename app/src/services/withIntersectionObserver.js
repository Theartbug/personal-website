import React from 'react';
import { connect } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { setCurrentSectionByScroll } from '../components/scroll-buttons/actions';

export default function Wrapper(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';
  
  function WithIntersectionObserver(props) {
    const [ref, inView] = useInView({ 
      //give a little wiggle room at the top before jumping to next section as 'current' for intersectionObserver
      rootMargin: '-10% 0px -55%',
    });

    function handleChange() {
      const { buttonScroll, setCurrentSectionByScroll } = props;

      if(!buttonScroll) setCurrentSectionByScroll(displayName.toLowerCase());
    };

    if(inView) handleChange();

    return <BaseComponent ref={ref}/>;
  }

  WithIntersectionObserver.displayName = `withIntersectionObserver(${displayName})`;

  return connect(
    ({ buttonScroll }) => ({
      buttonScroll
    }),
    ({ setCurrentSectionByScroll })
  )(WithIntersectionObserver);
};

