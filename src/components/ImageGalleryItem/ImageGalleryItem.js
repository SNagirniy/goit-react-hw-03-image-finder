import react from 'react';

export default function ImageGalleryItem({
  url,
  alt,
  largeImageURL,
  onImageClick,
}) {
  return (
    <li>
      <img
        src={url}
        alt={alt}
        data-source={largeImageURL}
        onClick={onImageClick}
      />
    </li>
  );
}
