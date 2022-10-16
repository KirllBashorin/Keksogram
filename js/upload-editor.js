import { effects } from './effects.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const uploadIinput = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const scaleValue = uploadModal.querySelector('.scale__control--value');
const imageUploadPreview = uploadModal.querySelector('.img-upload__preview').querySelector('img');
const effectSlider = uploadModal.querySelector('.img-upload__effect-level');
const effectValueInput = uploadModal.querySelector('.effect-level__value');
let scaleValueInt = Number(scaleValue.value.substring(0, scaleValue.value.length - 1));

const resetUploadForm = () => {
  uploadIinput.value = '';
  scaleValue.value = '100%';
  scaleValueInt = 100;
  imageUploadPreview.style = '';
  imageUploadPreview.classList.remove(imageUploadPreview.classList.item(0));
};

const scaling = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    (scaleValueInt - Scale.STEP >= Scale.MIN) ? scaleValueInt -= Scale.STEP : scaleValueInt = Scale.MIN;
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    (scaleValueInt + Scale.STEP <= Scale.MAX) ? scaleValueInt += Scale.STEP : scaleValueInt = Scale.MAX;
  }
  scaleValue.value = `${scaleValueInt}%`;
  imageUploadPreview.style.transform = `scale(${scaleValueInt / 100})`;
};

window.noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 199,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const switchEffect = (target) => {
  (target.id === 'effect-none') ? effectSlider.classList.add('hidden') : effectSlider.classList.remove('hidden');
  imageUploadPreview.classList.remove(imageUploadPreview.classList.item(0));
  imageUploadPreview.classList.add(`effects__preview--${target.id.substring(6)}`);
};

const updateSliderOptions = (effect) => {
  return effectSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });
};

const setFilterEffectToStyle = (currentEffect) => {
  return (values, handle) => {
    effectValueInput.value = values[handle];
    imageUploadPreview.style.filter = `${currentEffect.filter}(${effectValueInput.value}${currentEffect.unit})`;
  }
};

const onEffectChange = (evt) => {
  const target = evt.target;
  const currentEffect = effects[target.id];
  if (target.matches('input[type="radio"')) {
    if (target.id === 'effect-none') {
      switchEffect(target);
      imageUploadPreview.style.filter = '';
    } else {
      switchEffect(target);
      updateSliderOptions(currentEffect);
      effectSlider.noUiSlider.on('update', setFilterEffectToStyle(currentEffect));
    }
  }
};

export { onEffectChange, resetUploadForm, scaling };
