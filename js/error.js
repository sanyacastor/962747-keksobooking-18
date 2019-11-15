'use strict';


(function () {
  var ESC_KEYCODE = 27;

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var error = errorTemplate.cloneNode(true);

  var errtext = error.querySelector('.error__message');

  function dataLoadErrorHandler(err) {
    errtext.textContent = err;
    document.querySelector('main').appendChild(error);
  }

  function dataSendErrorHandler() {
    document.querySelector('main').appendChild(error);
    var btn = error.querySelector('.error__button');

    btn.addEventListener('click', buttonClickHandler);
    document.addEventListener('keydown', escClickHandler);
    document.addEventListener('click', buttonClickHandler);
  }

  function buttonClickHandler() {
    var btn = error.querySelector('.error__button');
    error.style.display = 'none';
    btn.removeEventListener('click', buttonClickHandler);
    document.removeEventListener('keydown', escClickHandler);
  }

  function escClickHandler(evt) {
    var btn = error.querySelector('.error__button');
    if (evt.keyCode === ESC_KEYCODE) {
      error.style.display = 'none';
      btn.removeEventListener('click', buttonClickHandler);
      document.removeEventListener('keydown', escClickHandler);
    }
  }

  window.error = {
    dataLoadHandler: dataLoadErrorHandler,
    dataSendHandler: dataSendErrorHandler
  };
})();
