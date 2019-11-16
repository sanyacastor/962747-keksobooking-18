'use strict';

(function () {
  var sucessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var sucess = sucessTemplate.cloneNode(true);

  function sucessShow() {
    document.querySelector('main').appendChild(sucess);
    sucess.classList.remove('hidden');
    document.addEventListener('click', documentClickHandler);
    document.addEventListener('keydown', documentEscPressHandler);
  }

  function documentEscPressHandler(evt) {
    if (evt.keyCode === window.keyCode.esc) {
      sucessClose();
    }
  }

  function documentClickHandler() {
    sucessClose();
  }

  function sucessClose() {
    sucess.classList.add('hidden');
    document.removeEventListener('click', documentClickHandler);
    document.removeEventListener('keydown', documentClickHandler);
  }

  window.sucess = {
    show: sucessShow
  };
})();


