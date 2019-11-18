'use strict';


(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var error = errorTemplate.cloneNode(true);
  var errorText = error.querySelector('.error__message');

  function onDataLoadError(err) {
    errorText.textContent = err;
    main.appendChild(error);
    var btn = error.querySelector('.error__button');
    error.classList.remove('hidden');

    btn.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onEscClick);
    document.addEventListener('click', onButtonClick);
  }

  function hideError() {
    var btn = error.querySelector('.error__button');
    error.classList.add('hidden');

    btn.removeEventListener('click', onButtonClick);
    document.removeEventListener('keydown', onEscClick);
    document.removeEventListener('click', onButtonClick);
  }

  function onButtonClick() {
    hideError();
  }

  function onEscClick(evt) {
    if (evt.keyCode === window.KEYCODE.ESC) {
      hideError();
    }
  }

  window.error = {
    data: onDataLoadError
  };
})();
