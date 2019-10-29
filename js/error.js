'use strict';


(function () {
  function errorDataLoadHandler(err) {
    var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    var errtext = error.querySelector('.error__message');
    errtext.textContent = err;
    document.querySelector('main').appendChild(error);
  }

  window.error = {
    dataLoadHandler: errorDataLoadHandler,
  };
})();
