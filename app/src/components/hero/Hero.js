import React, { PureComponent } from 'react';
import laptopImage from '../../assets/profile_laptop.jpg';
import mobileImage from '../../assets/profile_mobile.jpg';
import './hero.css';

export default class Hero extends PureComponent {

  render() {

    return (
      <figure className="hero-image">
        <h1><span>This is</span> Grace Provost</h1>
        <picture>

          <source srcSet={laptopImage} media="(min-width: 1000px)"/>

          <img srcSet={mobileImage} alt="photo of Grace"/>
        </picture>
      </figure>
      
    );
  }
}