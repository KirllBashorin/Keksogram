import { isEscKeyDown } from './util.js';
import { onEffectChange, resetUploadForm, scaling } from './upload-editor.js';

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const uploadModal = body.querySelector('.img-upload__overlay');
const uploadClose = uploadModal.querySelector('.img-upload__cancel');
const effectsList = uploadModal.querySelector('.effects__list');
const effectSlider = uploadModal.querySelector('.img-upload__effect-level');
const scaleControlsContainer = uploadModal.querySelector('.img-upload__scale');
const uploadIinput = body.querySelector('.img-upload__input');
// Полноразмерное фото
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('.modal-open');
  bigPictureCloseButton.removeEventListener('click', onBigPictureCloseClick);
  document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
  commentsList.innerHTML = '';
};

const onBigPictureCloseClick = () => {
  closeBigPicture();
};

const onBigPictureEscapeKeyDown = (evt) => {
  if (isEscKeyDown(evt)) {
    closeBigPicture();
  }
};

// Форма загрузки фото

const openUploadModal = () => {
  effectSlider.classList.add('hidden');
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadIinput.removeEventListener('change', openUploadModal);
  effectsList.addEventListener('change', onEffectChange);
  scaleControlsContainer.addEventListener('click', scaling);
  uploadClose.addEventListener('click', closeUploadOverlay);
  document.addEventListener('keydown', onUploadOverlayEscapeDown);
};

const closeUploadOverlay = () => {
  uploadIinput.addEventListener('change', openUploadModal);
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  resetUploadForm();
  effectsList.removeEventListener('change', onEffectChange)
  uploadClose.removeEventListener('click', closeUploadOverlay);
  scaleControlsContainer.removeEventListener('click', scaling);
  document.removeEventListener('keydown', onUploadOverlayEscapeDown);
};

const onUploadOverlayEscapeDown = (evt) => {
  if (isEscKeyDown(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

uploadIinput.addEventListener('change', openUploadModal);

export { onBigPictureCloseClick, onBigPictureEscapeKeyDown };
