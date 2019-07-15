import React, { useState, useCallback } from 'react';
import PhotoGallery from 'react-photo-gallery';
import useIntersectionObserver from '../../services/useIntersectionObserver.js';
import Carousel, { Modal, ModalGateway } from "react-images";
import photos from '../../assets/photos/photos.js';
import { GALLERY } from '../app-context/actions.js';

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
      <h2 className="lines">Photos</h2>
      <PhotoGallery 
        photos={ photos }
        onClick={ openModal } />
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
    </section>
  );
};

Gallery.displayName = GALLERY;
export default Gallery;