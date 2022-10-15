const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
  bigPictureCloseButton.removeEventListener('click', onBigPictureCloseClick);
  document.removeEventListener('keydown', onBigPictureEscapeKeyDown);
  commentsList.innerHTML = '';
};

const onBigPictureCloseClick = () => {
  closeBigPicture();
};

const onBigPictureEscapeKeyDown = (evt) => {
  if (evt.keyCode === 27) {
    closeBigPicture();
  }
};

const renderComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

const renderCommentsList = (comments) => {
  const newCommentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = renderComment(comment)
    newCommentsListFragment.appendChild(newComment);
  })
  commentsList.appendChild(newCommentsListFragment);
}

const openBigPicture = (photo) => {
  body.classList.add('.modal-open');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden'); // Временно
  bigPicture.querySelector('.comments-loader').classList.add('hidden'); // Временно
  bigPicture.querySelector('.big-picture__img > img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  renderCommentsList(photo.comments);
  bigPicture.classList.remove('hidden');
  bigPictureCloseButton.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown', onBigPictureEscapeKeyDown);
};

export { openBigPicture };
