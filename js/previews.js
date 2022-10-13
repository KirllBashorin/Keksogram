import { photos } from './data.js';
import { openBigPicture } from './big-picture.js'

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const createPicturePreview = (photo) => {
  const photoPreview = photoTemplate.cloneNode(true);
  photoPreview.querySelector('.picture__img').src = photo.url;
  photoPreview.querySelector('.picture__likes').textContent = photo.likes;
  photoPreview.querySelector('.picture__comments').textContent = photo.comments.length;
  photoPreview.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  });
  return photoPreview;
};

const renderPicturesPreview = () => {
  const picturesListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    picturesListFragment.appendChild(createPicturePreview(photo));
  });
  picturesList.appendChild(picturesListFragment);
};

export { renderPicturesPreview };
