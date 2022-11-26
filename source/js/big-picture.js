import { onBigPictureCloseClick, onBigPictureEscapeKeyDown } from './user-dialog.js'

const COMMENTS_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentLoader = bigPicture.querySelector('.social__comments-loader');

const renderComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

const checkAndHideCommentsLoader = () => {
  const hiddenComments = bigPicture.querySelector('.social__comments').querySelectorAll('.hidden');
  if (hiddenComments.length === 0) {
    commentLoader.classList.add('hidden');
  }
};

const renderCommentsList = (comments) => {
  const newCommentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = renderComment(comment);
    if (comments.indexOf(comment) > COMMENTS_COUNT - 1) {
      newComment.classList.add('hidden');
    }
    newCommentsListFragment.appendChild(newComment);
  })
  commentsList.appendChild(newCommentsListFragment);
  checkAndHideCommentsLoader();
};

const showCommentsCount = (commentsLength, currentCommentsNumber = COMMENTS_COUNT) => {
  let commentsNumber = COMMENTS_COUNT;
  if (commentsLength < COMMENTS_COUNT) {
    commentsNumber = commentsLength;
    currentCommentsNumber = commentsNumber;
  }
  commentsCount.innerHTML =`${currentCommentsNumber} из <span class="comments-count">${commentsLength}</span> комментариев`;
};

const shwoMoreComments = () => {
  let numberCommentsToShow = COMMENTS_COUNT;
  const hiddenComments = bigPicture.querySelector('.social__comments').querySelectorAll('.hidden');
  const commentsLength = Number(bigPicture.querySelector('.comments-count').textContent);
  if (numberCommentsToShow > hiddenComments.length) {
    numberCommentsToShow = hiddenComments.length;
  }
  for (let i = 0; i < numberCommentsToShow; i++) {
    hiddenComments[i].classList.remove('hidden');
  }
  const showedComments = commentsLength + numberCommentsToShow - hiddenComments.length;
  checkAndHideCommentsLoader();
  showCommentsCount(commentsLength, showedComments);
};

const openBigPicture = (photo) => {
  document.querySelector('body').classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  showCommentsCount(photo.comments.length);
  renderCommentsList(photo.comments);
  commentLoader.addEventListener('click', shwoMoreComments);
  bigPicture.classList.remove('hidden');
  bigPictureCloseButton.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown', onBigPictureEscapeKeyDown);
};

export { openBigPicture, shwoMoreComments };
