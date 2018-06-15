import React, { PureComponent } from 'react';
import laptopImage from '../../assets/profile_laptop.jpg';
import tabletImage from '../../assets/profile_tablet.jpg';
import mobileImage from '../../assets/profile_mobile.jpg';

export default class Hero extends PureComponent {

  render() {

    return (
      <picture className="hero-image">

        <source srcSet={laptopImage} media="(min-width: 1200px)"/>

        <source srcSet={tabletImage} media="(min-width: 700px)"/>

        <img srcSet={mobileImage} alt="photo of Grace"/>
      </picture>
      
    );
  }
}