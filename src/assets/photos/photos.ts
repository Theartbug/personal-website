import climbing from './climbing.jpg';
import ecstaticDance from './ecstatic_dance.jpg';
import journalingCat from './journaling_cat.jpg';
import ladderHike from './ladder_hike.jpg';
import sedonaHike from './sedona_hike.jpg';
import treeThrone from './tree_throne.jpg';

type Image = {
  original: string;
  originalAlt: string;
  description: string;
}

export const images: Image[] = [
  {
    original: climbing,
    originalAlt: 'climbing around Mt.Hood, OR',
    description: 'climbing around Mt.Hood, OR',

  },
  {
    original: ecstaticDance,
    originalAlt: 'Ecstaticly dancing in a park',
    description: 'Ecstaticly dancing in a park',

  },
  {
    original: journalingCat,
    originalAlt: 'Journaling with a feline friend',
    description: 'Journaling with a feline friend',

  },
  {
    original: ladderHike,
    originalAlt: 'Hiking Lava Canyon Mt. St. Helens',
    description: 'Hiking Lava Canyon Mt. St. Helens',
  },
  {
    original: sedonaHike,
    originalAlt: 'Hiking the Cathedral Rock in Sedona, AZ',
    description: 'Hiking the Cathedral Rock in Sedona, AZ',
  },
  {
    original: treeThrone,
    originalAlt: 'Relaxing on a throne of the forest',
    description: 'Relaxing on a throne of the forest',
  },
];
