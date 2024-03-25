import { useState } from 'react';
import { ImageList } from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from 'components/Modal/Modal';

const ImageGallery = ({ cards }) => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  const onClickImg = (largeImageURL, tags) => {
    setShowModal(true);
    setUrl(largeImageURL);
    setAlt(tags);
  };

  const onCloseImg = () => {
    setShowModal(false);
  };

  return (
    <>
      <ImageList>
        {cards.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClickImg={onClickImg}
          />
        ))}
      </ImageList>
      {showModal && <Modal url={url} alt={alt} onClose={onCloseImg} />}
    </>
  );
};

export default ImageGallery;
