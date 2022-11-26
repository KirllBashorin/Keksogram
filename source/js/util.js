import _ from 'lodash';

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const createUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = _.random(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = _.random(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const checkStringLength = (text, maxLength) => {
  return (text.length <= maxLength);
};

const checkStringSymbols = (string) => {
  return /^[a-zA-Z0-9]+$/.test(string);
};

const getRandomArrayElement = (array) => {
  return array[_.random(0, array.length - 1)];
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

const createUniqueRandomArrayElementGenerator = (array) => {
  const previousElements = [];
  return () => {
    let currentElement = getRandomArrayElement(array);
    if (previousElements.length >= (array.length)) {
      throw new Error('Перебраны все элементы массива');
    }
    while (previousElements.includes(currentElement)) {
      currentElement = getRandomArrayElement(array);
    }
    previousElements.push(currentElement);
    return currentElement;
  };
};

const isEscKeyDown = (evt) => {
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    return true;
  }
};

export {
  createUniqueRandomIntegerGenerator,
  createUniqueRandomArrayElementGenerator,
  checkStringSymbols,
  checkStringLength,
  getRandomArrayElement,
  isEscKeyDown,
  shuffleArray
};
