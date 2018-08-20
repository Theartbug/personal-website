import React, { Component } from 'react';
import { connect } from 'react-redux';
import Observer from 'react-intersection-observer';
import { setCurrentSectionByScroll } from '../components/scroll-buttons/actions';

export default BaseComponent => {
  const displayName = BaseComponent.displayName || BaseComponent.name || 'Component';

  class WithIntersectionObserver extends Component {
    static displayName = `withIntersectionObserver(${displayName})`;

    state = {
      isIntersecting: false,
    };

    handleChange = (isIntersecting) => {

      const { buttonScroll, setCurrentSectionByScroll } = this.props;

      if(!buttonScroll && isIntersecting) setCurrentSectionByScroll(displayName.toLowerCase());
    };

    render() {

      const options = {
        onChange: this.handleChange,
        rootMargin: '-10% 0px -55%',
      };
      return (
        <Observer {...options}>
          <BaseComponent {...this.props} isVisible={this.state.isIntersecting} />
        </Observer>
      );
    }
  }

  return connect(
    ({ buttonScroll }) => ({
      buttonScroll
    }),
    ({ setCurrentSectionByScroll })
  )(WithIntersectionObserver);
};

