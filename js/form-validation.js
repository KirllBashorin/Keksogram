import { checkStringLength, checkStringSymbols } from './util.js';

const Hashtags = {
  MAX_TAGS: 5,
  MAX_LENGTH: 20,
};

const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const commentInput = imgUploadForm.querySelector('.text__description');

const stringToArray = (string) => {
  return string.split(' ');
}

const addInvalidClass = (input) => {
  if (input.validity.customError) {
    input.classList.add('input-invalid');
  } else {
    input.classList.remove('input-invalid');
  }
};

hashtagsInput.addEventListener('input' , () => {
  const inputString = hashtagsInput.value.toLowerCase().replace(/\s+/g, ' ').trim();
  const hashtags = stringToArray(inputString);
  hashtags.forEach((hashtag) => {
    if (hashtags.length === 1 && hashtags[0].length === 0) {
      hashtagsInput.setCustomValidity('');
    }
    else if (hashtag[0] !== '#') {
      hashtagsInput.setCustomValidity(
        `Хэштэг должен начинаться с символа #
        Не подходит- ${hashtag}`);
    }
    else if (hashtag.length === 1) {
      hashtagsInput.setCustomValidity('Хэштэг не может состоять из одного символа #');
    }
    else if (!checkStringSymbols(hashtag.substring(1, hashtag.length))) {
      hashtagsInput.setCustomValidity(`
        Хэштэг может содержать только # в начале, латинские буквы и цифры
        Не подходит- ${hashtag}`);
    }
    else if (!checkStringLength(hashtag, Hashtags.MAX_LENGTH)) {
      hashtagsInput.setCustomValidity(`Хэштэг не может содержать больше 20 символов
        Не подходит- ${hashtag}
        Лишних символов- ${hashtag.length - Hashtags.MAX_LENGTH}`);
    }
    else if (hashtags.some((element) => hashtags.indexOf(element) !== hashtags.lastIndexOf(element))){
      hashtagsInput.setCustomValidity(`Хэштэги не чувствительны к регистру и не должны повторяться
        Повторился - ${hashtag}`);
    }
    else if (hashtags.length > Hashtags.MAX_TAGS) {
      hashtagsInput.setCustomValidity(`Нельзя указать больше 5 хэштегов
        Лишних хэштегов - ${hashtags.length - Hashtags.MAX_TAGS}`);
    }
    else {
      hashtagsInput.setCustomValidity('');
    }
    addInvalidClass(hashtagsInput);
    hashtagsInput.reportValidity();
  });
})

commentInput.addEventListener('input', () => {
  const commentInputValue = commentInput.value.toString();
  if (!checkStringLength(commentInputValue, MAX_COMMENT_LENGTH)) {
    commentInput.setCustomValidity(`Максимальная длина комментари - ${MAX_COMMENT_LENGTH}
    Необходимо удалить ${commentInputValue.length - MAX_COMMENT_LENGTH}`);
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
  addInvalidClass(commentInput);
});
