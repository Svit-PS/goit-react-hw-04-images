import React, { useEffect } from 'react';
import { BoxImg, BoxOverlay, Img } from './Modal.styles';

const Modal = ({ onClose, url, alt }) => {
  useEffect(() => {
    const handlPress = ({ code }) => {
      console.log('code: ', code);
      if (code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handlPress);

    return () => {
      window.removeEventListener('keydown', handlPress);
    };
  }, [onClose]);

  const clickMouse = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  return (
    <BoxOverlay onClick={clickMouse}>
      <BoxImg>
        <Img src={url} alt={alt} />
      </BoxImg>
    </BoxOverlay>
  );
};

export default Modal;
