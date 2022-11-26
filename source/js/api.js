const Urls = {
  GET: 'https://23.javascript.pages.academy/kekstagram/data',
  POST: 'https://23.javascript.pages.academy/kekstagram',
}

const checkStatus = (response) => {
  if (response.ok) {
    return response
  }
  const {statusText, status} = response;
  throw new Error(`${status} - ${statusText} - Сообщите администратору сайта об ошибке`);
}

const request = (onSuccess, onFail, method, data) => {
  fetch(Urls[method], {
    method: method,
    body: data,
  })
    .then(checkStatus)
    .then(response => response.json())
    .then(response => onSuccess(response))
    .catch(err => onFail(err))
};

export { request };
