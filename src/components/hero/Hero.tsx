import React from 'react';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import { HERO } from '../app-context/actions';
import laptopImage from '../../assets/profile_laptop.jpg';
import mobileImage from '../../assets/profile_mobile.jpg';
import './hero.css';

const Hero: React.FC = (): JSX.Element => {
  const ref = useIntersectionObserver(HERO);

  return (
    <figure
      ref={ ref }
      className={ HERO }
      id={ HERO }>
      <h1><span>This is</span> Ash Provost</h1>
      <picture>
        <source srcSet={laptopImage} media="(min-width: 800px)"/>
        <img srcSet={mobileImage} alt="photo of Ash"/>
      </picture>
    </figure>
  );
};

Hero.displayName = HERO;
export default Hero;