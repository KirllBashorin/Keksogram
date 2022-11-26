import { closeUploadOverlay } from './user-dialog.js'
import { isEscKeyDown } from './util.js';

const body = document.querySelector('body');

const closeUploadMessage = (block) => {
  block.remove();
  document.removeEventListener('keydown', onUploadMessageEscapeDown)
};

const onUploadMessageEscapeDown = (block) => {
  return (evt) => {
    if (isEscKeyDown(evt)) {
      closeUploadMessage(block);
    }
  }
};

const onDocumentClickClose = (block) => {
  return (evt) => {
    const success = body.querySelector('.success__inner');
    const error = body.querySelector('.error__inner');
    if (success === null && error === null) {
      return
    }
    else if (success === null) {
      if (!error.contains(evt.target)) {
        closeUploadMessage(block);
      }
    } else if (error === null) {
      if (!success.contains(evt.target)) {
        closeUploadMessage(block);
      }
    }
  }
};

const showUploadMessage = (templateNode) => {
  return () => {
    closeUploadOverlay();
    const newMessage = templateNode.cloneNode(true);
    const closeButton = newMessage.querySelector('button');
    closeButton.addEventListener('click', () => {
      closeUploadMessage(newMessage)
    });
    document.addEventListener('click', onDocumentClickClose(newMessage))
    document.addEventListener('keydown', onUploadMessageEscapeDown(newMessage));
    body.appendChild(newMessage);
  }
};

export { showUploadMessage };
