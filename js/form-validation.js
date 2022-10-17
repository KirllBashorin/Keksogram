import { checkStringLength, checkStringSymbols } from './util.js';

const Hashtags = {
  MAX_TAGS: 5,
  MAX_LENGTH: 20,
};

const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const hasshtagsInput = imgUploadForm.querySelector('.text__hashtags');
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

hasshtagsInput.addEventListener('input' , () => {
  const inputString = hasshtagsInput.value.toLowerCase().replace(/\s+/g, ' ').trim();
  const hashtags = stringToArray(inputString);
  hashtags.forEach((hashtag) => {
    if (hashtag[0] !== '#') {
      hasshtagsInput.setCustomValidity(
        `Хэштэг должен начинаться с символа #
        Не подходит- ${hashtag}`);
    }
    else if (hashtag.length === 1) {
      hasshtagsInput.setCustomValidity('Хэштэг не может состоять из одного символа #');
    }
    else if (!checkStringSymbols(hashtag.substring(1, hashtag.length))) {
      hasshtagsInput.setCustomValidity(`
        Хэштэг может содержать только # в начале, латинские буквы и цифры
        Не подходит- ${hashtag}`);
    }
    else if (!checkStringLength(hashtag, Hashtags.MAX_LENGTH)) {
      hasshtagsInput.setCustomValidity(`Хэштэг не может содержать больше 20 символов
        Не подходит- ${hashtag}
        Лишних символов- ${hashtag.length - Hashtags.MAX_LENGTH}`);
    }
    else if (hashtags.some((element) => hashtags.indexOf(element) !== hashtags.lastIndexOf(element))){
      hasshtagsInput.setCustomValidity(`Хэштэги не чувствительны к регистру и не должны повторяться
        Повторился - ${hashtag}`);
    }
    else if (hashtags.length > Hashtags.MAX_TAGS) {
      hasshtagsInput.setCustomValidity(`Нельзя указать больше 5 хэштегов
        Лишних хэштегов - ${hashtags.length - Hashtags.MAX_TAGS}`);
    }
    else {
      hasshtagsInput.setCustomValidity('');
    }

    hasshtagsInput.reportValidity();
  });
  addInvalidClass(hasshtagsInput);
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
