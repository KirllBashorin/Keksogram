const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadIinput = document.querySelector('.img-upload__input');
const previewImage = document.querySelector('.img-upload__preview').querySelector('img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const showUploadedFile = () => {
  const file = uploadIinput.files[0];
  const fileType = file.type;
  const matches = FILE_TYPES.some((it) => {
    return fileType.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
      effectsPreviews.forEach(preview => preview.style.backgroundImage = `url('${reader.result}')`);
    });
    reader.readAsDataURL(file);
  }
};

export { showUploadedFile };
