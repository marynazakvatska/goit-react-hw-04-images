import { ToastContainer } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';
import { Appt } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from 'components/fetchImages';
import Modal from './Modal';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';



const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
export function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState('');
  const prevPhoto = usePrevious(photo) || '';
  const prevPage = usePrevious(page) || 1;
  const [modalPicture, setModalPicture] = useState('');

  useEffect(() => {
    setStatus('pending');
    if (prevPhoto !== photo || prevPage !== page) {
      console.log({
        prevPhoto,
        photo,
        prevPage,
        page,
      });
      fetchImages(photo, page)
        .then(data => {
          if (data) {
            if (data.hits.length > 0) {
              const newImages = data.hits;

              setData(prevState => [...prevState, ...newImages]);
            }
          }
          setStatus('resolved');
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [photo, page, prevPage, prevPhoto]);

  const addPage = () => {
    setPage(prevState => prevState + 1);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const reset = () => {
    setPage(1);
    setData([]);
    setPhoto('');
  };

  const handleFormSubmit = photoName => {
    reset();
    setPhoto(photoName);
  };

  const toggleModal = () => {
    setShowModal(value => !value);
  };

  const setModalPic = img => {
    setModalPicture(img);
    toggleModal();
  };

  return (
    <Appt>
      <Searchbar qwe={handleFormSubmit} searchValeu={photo} />
      <ImageGallery
        addPage={addPage}
        error={error}
        status={status}
        images={data}
        setModalPicture={setModalPic}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalPicture} alt="" />
        </Modal>
      )}
      <ToastContainer />
    </Appt>
  );
}

App.propTypes = {
  toggleModal: PropTypes.func,
  setModalPicture: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  componentDidUpdate: PropTypes.func,
  addPage: PropTypes.func,
};
