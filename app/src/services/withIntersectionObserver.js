import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { setCurrentSectionByScroll } from '../components/scroll-buttons/actions';

export default function Wrapper(BaseComponent) {
  const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';
  
  function WithIntersectionObserver(props) {
    const [ref, inView] = useInView({ rootMargin: '-10% 0px -55%' });

    function handleChange() {
      const { buttonScroll, setCurrentSectionByScroll } = props;

      if(!buttonScroll) setCurrentSectionByScroll(displayName.toLowerCase());
    };

    if(inView) handleChange();

    return <BaseComponent forwardRef={ref} {...props}/>;
    
  }

  WithIntersectionObserver.displayName = `withIntersectionObserver(${displayName})`;

  return connect(
    ({ buttonScroll }) => ({
      buttonScroll
    }),
    ({ setCurrentSectionByScroll })
  )(WithIntersectionObserver);
};

