import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modall, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');



export default function Modal({ onClose, children }) {
 

  const handleKeyDown = useCallback(e => {
    if (e.code === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown); //componentWillUnmount()
    };
  }, [handleKeyDown]);


  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modall>{children}</Modall>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  handleKeyDown: PropTypes.func,
  handleBackdropClick: PropTypes.func,
  useEffect: PropTypes.func,
};
