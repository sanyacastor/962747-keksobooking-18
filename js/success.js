'use strict';

(function () {
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var success = successTemplate.cloneNode(true);

  function successShow() {
    document.querySelector('main').appendChild(success);
    success.classList.remove('hidden');
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentEscPress);
  }

  function onDocumentEscPress(evt) {
    if (evt.keyCode === window.KEYCODE.ESC) {
      successClose();
    }
  }

  function onDocumentClick() {
    successClose();
  }

  function successClose() {
    success.classList.add('hidden');
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentClick);
  }

  window.success = {
    show: successShow
  };
})();


