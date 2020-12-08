import React, { useState } from 'react';
import PhotoGallery, { PhotoClickHandler } from 'react-photo-gallery';
import useIntersectionObserver from '../../services/useIntersectionObserver';
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos, galleryPhotos } from '../../assets/photos/photos';
import { GALLERY } from '../app-context/actions';
import './gallery.css';

const Gallery: React.FC = (): JSX.Element => {
  const ref = useIntersectionObserver(GALLERY);
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal: PhotoClickHandler = (_e, { index }) => {
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
    className={ GALLERY }
    id={ GALLERY }>
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
                views={ galleryPhotos }
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