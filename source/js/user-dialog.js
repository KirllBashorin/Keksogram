import { isEscKeyDown } from './util.js';
import { onEffectChange, resetUploadForm, scaling } from './upload-editor.js';
import { shwoMoreComments } from './big-picture.js';
import { request } from './api.js';
import { showUploadMessage } from './upload-message.js';
import { showUploadedFile } from './upload-file.js';

const ALERT_SHOW_TIME = 5000;
const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const uploadModal = body.querySelector('.img-upload__overlay');
const imageUploadForm = body.querySelector('.img-upload__form');
const uploadClose = uploadModal.querySelector('.img-upload__cancel');
const effectsList = uploadModal.querySelector('.effects__list');
const effectLevel = uploadModal.querySelector('.img-upload__effect-level');
const scaleControlsContainer = uploadModal.querySelector('.img-upload__scale');
const uploadIinput = body.querySelector('.img-upload__input');
const commentLoader = bigPicture.querySelector('.social__comments-loader');
const successUploadMessage = body.querySelector('#success').content.querySelector('.success');
const errorUploadMessage = body.querySelector('#error').content.querySelector('.error');

// Полноразмерное фото

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', onBigPictureCloseClick);
  document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
  bigPicture.querySelector('.social__comments-loader').classList.remove('hidden');
  commentLoader.removeEventListener('click', shwoMoreComments);
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
  showUploadedFile();
  effectLevel.classList.add('hidden');
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

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  request(showUploadMessage(successUploadMessage), showUploadMessage(errorUploadMessage), 'POST', new FormData(document.getElementById('upload-select-image')));
});

const onUploadOverlayEscapeDown = (evt) => {
  if (
    !(evt.target.classList.contains('text__hashtags')
    ||
    evt.target.classList.contains('text__description'))
  ) {
    if (isEscKeyDown(evt)) {
      evt.preventDefault();
      closeUploadOverlay();
    }
  }
};

uploadIinput.addEventListener('change', openUploadModal);

// Алерт загрузки фото

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'black';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export { onBigPictureCloseClick, onBigPictureEscapeKeyDown, showAlert, closeUploadOverlay };
