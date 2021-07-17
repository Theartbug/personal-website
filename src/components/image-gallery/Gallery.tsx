import React from 'react';
import ImageGallery from 'react-image-gallery';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import { images } from '../../assets/photos/photos';
import { GALLERY } from '../app-context/actions';
import './gallery.css';

const Gallery: React.FC = (): JSX.Element => {
  const ref = useIntersectionObserver(GALLERY);

  return (
    <section
    role='region'
    aria-label={ GALLERY }
    ref={ ref }
    className={ GALLERY }
    id={ GALLERY }>
      <div>
        <h2 className="lines">Gallery</h2>
        <p>Snaps from my life</p>
        <ImageGallery
          showThumbnails={ false }
          showPlayButton={ false }
          autoPlay={ true }
          slideDuration={ 1000 }
          slideInterval={ 5000 }
          items={ images }
        />
      </div>
    </section>
  );
};

Gallery.displayName = GALLERY;
export default Gallery;