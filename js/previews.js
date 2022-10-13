import { photos } from './data.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const createPicturePreview = ({url, likes, comments}) => {
  const photoPreview = photoTemplate.cloneNode(true);
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__likes').textContent = likes;
  photoPreview.querySelector('.picture__comments').textContent = comments.length;
  return photoPreview;
};

const renderPicturesPreview = () => {
  const picturesListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    picturesListFragment.appendChild(createPicturePreview(photo));
  });
  picturesList.appendChild(picturesListFragment);
};

export {renderPicturesPreview};
