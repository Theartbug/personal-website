import basinHike from './lakes_basin.jpg';
import catStretch from './city_cat_pets_stretches.jpg';
import catPets from './city_cat_pets.jpg';
import mushroom from './mushroom_hike.jpg';
import angelsRest from './rainy_hike.jpg';
import smithRock from './smith_rock_climbing.jpg';
import snowshoeing from './snowshoeing.jpg';
import { ViewType } from 'react-images';


type photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const photos: photo[] = [
  {
    src: basinHike,
    width: 900,
    height: 675,
    alt: '7 Lakes Basin of Olympic National Forest',
  },
  {
    src: catStretch,
    width: 960,
    height: 720,
    alt: 'Some good city cat pets',

  },
  {
    src: mushroom,
    width: 960,
    height: 720,
    alt: 'Wet mushroom whilst hiking',

  },
  {
    src: smithRock,
    width: 667,
    height: 500,
    alt: 'Climbing at Smith Rock',

  },
  {
    src: angelsRest,
    width: 960,
    height: 720,
    alt: 'Angels Rest after 2017 fire',
  },
  {
    src: catPets,
    width: 960,
    height: 720,
    alt: 'Getting some good kitty pets',
  },
  {
    src: snowshoeing,
    width: 720,
    height: 960,
    alt: 'Snowshoeing Elk Lake, Mt. Hood',
  },
];

export const galleryPhotos: ViewType[] = photos.map(photo => ({
  source: photo.src,
  caption: photo.alt,
}));
