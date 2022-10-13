const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const createUniqueRandomIntegerGenerator = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      throw new Error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const testStringLength = (text, maxLength) => {
  return (text.length <= maxLength);
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
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
  if(evt.keyCode === 27) {
    return true;
  }
};

export {
  getRandomInteger,
  createUniqueRandomIntegerGenerator,
  createUniqueRandomArrayElementGenerator,
  testStringLength,
  getRandomArrayElement,
  isEscKeyDown
};
