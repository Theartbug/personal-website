import basinHike from './lakes_basin.jpg';
import catStretch from './city_cat_pets_stretches.jpg';
import catPets from './city_cat_pets.jpg';
import mushroom from './mushroom_hike.jpg';
import angelsRest from './rainy_hike.jpg';
import smithRock from './smith_rock_climbing.jpg';
import snowshoeing from './snowshoeing.jpg';

type Image = {
  original: string;
  originalAlt: string;
  description: string;
}

export const images: Image[] = [
  {
    original: basinHike,
    originalAlt: '7 Lakes Basin of Olympic National Forest',
    description: '7 Lakes Basin of Olympic National Forest',
  },
  {
    original: catStretch,
    originalAlt: 'Some good city cat pets',
    description: 'Some good city cat pets',

  },
  {
    original: mushroom,
    originalAlt: 'Wet mushroom whilst hiking',
    description: 'Wet mushroom whilst hiking',

  },
  {
    original: smithRock,
    originalAlt: 'Climbing at Smith Rock',
    description: 'Climbing at Smith Rock',

  },
  {
    original: angelsRest,
    originalAlt: 'Angels Rest after 2017 fire',
    description: 'Angels Rest after 2017 fire',
  },
  {
    original: catPets,
    originalAlt: 'Getting some good kitty pets',
    description: 'Getting some good kitty pets',
  },
  {
    original: snowshoeing,
    originalAlt: 'Snowshoeing Elk Lake, Mt. Hood',
    description: 'Snowshoeing Elk Lake, Mt. Hood',
  },
];
