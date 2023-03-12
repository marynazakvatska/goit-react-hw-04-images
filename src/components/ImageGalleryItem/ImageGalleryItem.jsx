import {
  ImageGalleryItemm,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ photos, setModalPicture }) => {

  return photos.map(({ id, webformatURL, tag }) => {
    return (
      <ImageGalleryItemm key={`image-${id}`} onClick={() => setModalPicture(webformatURL)}>
        <ImageGalleryItemImage src={webformatURL} alt={tag} />
      </ImageGalleryItemm>
    );
  });
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tag: PropTypes.string,
    })
  ),
  setModalPicture: PropTypes.func,
};
