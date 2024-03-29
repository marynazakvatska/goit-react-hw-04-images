import { ImageGallerys } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';
import PropTypes from 'prop-types';



export default function ImageGallery({ addPage, status, images, setModalPicture, error }) {
 
  /* console.log(images) */


    if (status === 'idle') {
      return <div>Enter the name of the picture</div>;
    }
    if (status === 'rejected') {
      return <h1>{error?.message}</h1>;
    }
    if (images.length === 0) {
      return <div>Nothing found</div>;
    }

    return (
      <>
        <ImageGallerys>
          <ImageGalleryItem
            photos={images}
            setModalPicture={setModalPicture}
          />
        </ImageGallerys>
        <Button onClick={addPage} />
        {status === 'pending' && <Loader />}
      </>
    );
  }


ImageGallery.propTypes = {
  addPage: PropTypes.func,
  setModalPicture: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tag: PropTypes.string,
    })),
  status: PropTypes.string, 
error: PropTypes.object, 
  
};