import _ from 'lodash';

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const checkStringLength = (text, maxLength) => {
  return (text.length <= maxLength);
};

const checkStringSymbols = (string) => {
  return /^[a-zA-Z0-9]+$/.test(string);
};

const shuffleArray = (array) => {
  const newArray = array.slice();
  let currentIndex = newArray.length - 1;
  while (currentIndex != 0) {
    const randomIndex = _.random(0, currentIndex);
    [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    currentIndex--;
  }
  return newArray;
};

const isEscKeyDown = (evt) => {
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    return true;
  }
};

export {
  checkStringSymbols,
  checkStringLength,
  isEscKeyDown,
  shuffleArray
};
