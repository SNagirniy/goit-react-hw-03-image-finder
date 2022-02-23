import propTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  url,
  alt,
  largeImageURL,
  onImageClick,
}) {
  return (
    <li className={s.ImageGalleryItem} onClick={onImageClick}>
      <img
        className={s.ImageGalleryItem_image}
        src={url}
        alt={alt}
        data-source={largeImageURL}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  url: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  largeImageURL: propTypes.string.isRequired,
  onImageClick: propTypes.func.isRequired,
};
