import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setCurrentSectionByScroll } from '../scroll-buttons/actions';
import laptopImage from '../../assets/profile_laptop.jpg';
import mobileImage from '../../assets/profile_mobile.jpg';
import './hero.css';

class Hero extends PureComponent {

  componentDidMount() {
    const { config, setCurrentSectionByScroll } = this.props;
    
    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { buttonScroll } = this.props; //needs to be pulled off every time
        const { target: { className }, isIntersecting, intersectionRatio } = entry;

        if(!buttonScroll && (isIntersecting === true || intersectionRatio > 0)) setCurrentSectionByScroll(className); 
      });
    }, config);
    
    observer.observe(this.hero);
  }

  render() {

    return (
      <figure className="hero" id="hero" ref={hero => this.hero = hero}>
        <h1><span>This is</span> Grace Provost</h1>
        <picture>

          <source srcSet={laptopImage} media="(min-width: 1000px)"/>

          <img srcSet={mobileImage} alt="photo of Grace"/>
        </picture>
      </figure>
      
    );
  }
}

export default connect(
  ({ buttonScroll }) => ({
    buttonScroll
  }),
  ({ setCurrentSectionByScroll })
)(Hero);