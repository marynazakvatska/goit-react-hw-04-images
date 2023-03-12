import { ToastContainer } from 'react-toastify';
import {useState, useEffect} from "react";
import { Appt } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImages from 'components/fetchImages';
import Modal from './Modal';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

/* 
export class App extends Component {
  state = {
    data: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    photo: '',
    modalPicture: '',
  };
  componentDidUpdate(prevProps, prevState) {
    const prevPhoto = prevState.photo;
    const nextPhoto = this.state.photo;
    // console.log(prevPhoto, nextPhoto, 'photoComparing');
    if (prevPhoto !== nextPhoto || prevState.page !== this.state.page) {
      this.setState({
        status: 'pending',
      });
      fetchImages(nextPhoto, this.state.page)
        .then(data => {
          if (data) {
            if (data.hits.length > 0) {
              const newImages = data.hits;
          
              this.setState(prevState => ({
                data: [...prevState.data, ...newImages],
              }));
            }
          }
          this.setState({
            status: 'resolved',
          });
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        )
    }
  }
  addPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };
  handleFormSubmit = photoName => {
    if (photoName === this.state.photo && this.state.page === 1) {
      return;
    }
    this.setState({ data: [], page: 1, photo: photoName });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  setModalPicture = img => {
    this.setState({ modalPicture: img });
    this.toggleModal();
  };
  render() {
    return (
      <Appt>
        <Searchbar qwe={this.handleFormSubmit} searchValeu={this.state.photo} />
        <ImageGallery
          addPage={this.addPage}
          error={this.state.error}
          status={this.state.status}
          images={this.state.data}
          setModalPicture={this.setModalPicture}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.modalPicture} alt="" />
          </Modal>
        )}
        <ToastContainer />
      </Appt>
    );
  }
}

App.propTypes = {
  toggleModal: PropTypes.func,
  setModalPicture: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  componentDidUpdate: PropTypes.func,
   addPage: PropTypes.func,
  
}; */


export function App() {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState('');
  const [modalPicture, setModalPicture] = useState('');


  useEffect(() => {
 
    setStatus('pending')
    fetchImages(photo, page)
      .then(data => {
        if (data) {
          if (data.hits.length > 0) {
            const newImages = data.hits;
          
            setData(prevState => 
                   [...prevState, ...newImages]
            );
          }
        }
        setStatus('resolved');
      })
      .catch(error => {
        setError(error)
        setStatus('rejected')
      }
       
      )
  }, [photo, page]);



 const addPage = () => {
    setPage(prevState => prevState + 1,
    );
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
  setPhoto('')
  }
  
  
  const handleFormSubmit = photoName => {
    reset();
 setPhoto(photoName)
};
  
  
 const toggleModal = () => {
    setShowModal(({ showModal }) => ({
      showModal: !showModal,
    }));
 };
  
 const setModalPic = img => {
    setModalPicture({ modalPicture: img });
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
        {/*     {modalPicture} */}
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