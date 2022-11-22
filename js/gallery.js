/* global _:readonly */

import { request } from './api.js';
import { renderPicturesPreview } from './previews.js';
import { showAlert } from './user-dialog.js';
import { shuffleArray } from './util.js';

const DEFAULT_PHOTO_COUNT = 25;
const RANDOM_PHOTO_COUNT = 10;
const DEBOUNCE_DELAY = 500;
const imageFilters = document.querySelector('.img-filters');
const imageFiltersForm = imageFilters.querySelector('.img-filters__form');
let photos = [];

const removeActiveClass = () => {
  imageFiltersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
}

const clearGallery = () => {
  const pictures = document.querySelectorAll('.picture');
  if (pictures) {
    pictures.forEach(element => {
      element.remove();
    });
  }
}

const filters = {
  'filter-default': () => {
    renderPicturesPreview(photos.slice(0, DEFAULT_PHOTO_COUNT));
  },
  'filter-random': () => {
    renderPicturesPreview(shuffleArray(photos.slice()).slice(0, RANDOM_PHOTO_COUNT));
  },
  'filter-discussed': () => {
    renderPicturesPreview(photos.slice().sort((a, b) => {
      return b.comments.length - a.comments.length;
    }));
  },
};

const onFilterClick = (evt) => {
  removeActiveClass();
  evt.target.classList.add('img-filters__button--active');
  clearGallery();
  filters[evt.target.id]();
};

const showFilters = () => {
  imageFilters.classList.remove('img-filters--inactive');
  imageFiltersForm.addEventListener('click', _.debounce(onFilterClick, DEBOUNCE_DELAY));
};

const onSuccess = (data) => {
  photos = data.slice();
  renderPicturesPreview(photos.slice(0, DEFAULT_PHOTO_COUNT));
  showFilters();
}

request (
  onSuccess,
  showAlert,
  'GET',
);
