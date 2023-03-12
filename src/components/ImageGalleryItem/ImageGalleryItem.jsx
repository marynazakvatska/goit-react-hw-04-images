import {
  ImageGalleryItemm,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ photos, setModalPicture }) => {
 /*  console.log(photos); */
  
  return photos.map(({ id, webformatURL, tag }) => {
    return (
      <ImageGalleryItemm key={id} onClick={() => setModalPicture(webformatURL)}>
        <ImageGalleryItemImage src={webformatURL} alt={tag} />
      </ImageGalleryItemm>
    );
  });
};

export default ImageGalleryItem;

 ImageGalleryItem.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
      webformatURL: PropTypes.string,
    tag: PropTypes.string,
})),
   setModalPicture: PropTypes.func,
};
