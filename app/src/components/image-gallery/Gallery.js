import React, { useState, useCallback } from 'react';
import PhotoGallery from 'react-photo-gallery';
import useIntersectionObserver from '../../services/useIntersectionObserver.js';
import Carousel, { Modal, ModalGateway } from "react-images";
import photos from '../../assets/photos/photos.js';
import { GALLERY } from '../app-context/actions.js';
import './gallery.css';

function Gallery(props) {
  const ref = useIntersectionObserver(GALLERY);
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (e, { photo, index }) => {
    setCurrentImage(index);
    setModalOpen(true);
  }

  const closeModal = () => {
    setCurrentImage(0);
    setModalOpen(false);
  }

  return (
    <section 
    ref={ ref }
    className="gallery"
    id="gallery"
    { ...props }>
      <div>
        <h2 className="lines">Gallery</h2>
        <p>Snaps from my life</p>
        <PhotoGallery 
          photos={ photos }
          onClick={ openModal } 
          targetRowHeight={ 100 } />
          <ModalGateway>
          { modalOpen && 
            <Modal onClose={ closeModal }>
              <Carousel
                currentIndex={ currentImage }
                views={ photos.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          }
        </ModalGateway>
      </div>
    </section>
  );
};

Gallery.displayName = GALLERY;
export default Gallery;