import React, { forwardRef } from 'react';
import withIntersectionObserver from '../../services/withIntersectionObserver';
import laptopImage from '../../assets/profile_laptop.jpg';
import mobileImage from '../../assets/profile_mobile.jpg';
import './hero.css';

const Hero = forwardRef((props, ref) => {
  return (
    <figure 
      ref={ ref }
      className="hero" 
      id="hero"
      { ...props }>
      <h1><span>This is</span> Grace Provost</h1>
      <picture>

        <source srcSet={laptopImage} media="(min-width: 1000px)"/>

        <img srcSet={mobileImage} alt="photo of Grace"/>
      </picture>
    </figure>
  );
});
Hero.displayName = 'hero';
export default withIntersectionObserver(Hero);