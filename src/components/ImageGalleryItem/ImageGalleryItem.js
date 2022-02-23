import react from 'react';

export default function ImageGalleryItem({
  url,
  alt,
  largeImageURL,
  onImageClick,
}) {
  return (
    <li onClick={onImageClick}>
      <img src={url} alt={alt} data-source={largeImageURL} />
    </li>
  );
}
