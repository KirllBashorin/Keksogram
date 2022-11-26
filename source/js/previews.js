import { openBigPicture } from './big-picture.js'

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const createPicturePreview = (photo) => {
  const photoPreview = photoTemplate.cloneNode(true);
  photoPreview.querySelector('.picture__img').src = photo.url;
  photoPreview.querySelector('.picture__img').id = photo.id;
  photoPreview.querySelector('.picture__likes').textContent = photo.likes;
  photoPreview.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoPreview;
};

const renderPicturesPreview = (data) => {
  const picturesListFragment = document.createDocumentFragment();
  data.forEach((photo) => {
    picturesListFragment.appendChild(createPicturePreview(photo));
  });
  picturesList.appendChild(picturesListFragment);
  picturesList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('picture__img')) {
      evt.preventDefault();
      const clickedPreview = data.find(element => element.id === Number(evt.target.id));
      openBigPicture(clickedPreview);
    }
  })
};

export { renderPicturesPreview };
