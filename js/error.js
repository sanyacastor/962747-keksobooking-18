'use strict';


(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var error = errorTemplate.cloneNode(true);
  var errtext = error.querySelector('.error__message');

  function dataLoadErrorHandler(err) {
    errtext.textContent = err;
    main.appendChild(error);
    var btn = error.querySelector('.error__button');
    error.classList.remove('hidden');

    btn.addEventListener('click', buttonClickHandler);
    document.addEventListener('keydown', escClickHandler);
    document.addEventListener('click', buttonClickHandler);
  }

  function hideError() {
    var btn = error.querySelector('.error__button');
    error.classList.add('hidden');

    btn.removeEventListener('click', buttonClickHandler);
    document.removeEventListener('keydown', escClickHandler);
    document.removeEventListener('click', buttonClickHandler);
  }

  function buttonClickHandler() {
    hideError();
  }

  function escClickHandler(evt) {
    if (evt.keyCode === window.keyCode.esc) {
      hideError();
    }
  }

  window.error = {
    data: dataLoadErrorHandler
  };
})();
