'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('.ad-form__element');
  var adressInput = document.querySelector('#address');
  var roomInput = document.querySelector('#room_number');
  var guestInput = document.querySelector('#capacity');

  function setDisabled(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = value;
    }
  }

  function checkGuests() {

    var rooms = parseInt(roomInput.value, 10);
    var guests = parseInt(guestInput.value, 10);

    if (rooms === 100 && guests !== 0) {
      roomInput.setCustomValidity('Сто комнат не для гостей');
      return false;
    }

    if (guests === 0 && rooms !== 100) {
      guestInput.setCustomValidity('Не для гостей сто комнат');
      return false;
    }

    if (rooms < guests) {
      roomInput.setCustomValidity('Нужно больше комнат');
      return false;
    }

    roomInput.setCustomValidity('');
    guestInput.setCustomValidity('');

    return true;
  }

  roomInput.addEventListener('change', function () {
    checkGuests();
  });

  guestInput.addEventListener('change', function () {
    checkGuests();
  });

  window.form = {
    setDisabled: setDisabled,
    checkGuests: checkGuests,
    form: form,
    fieldsets: fieldsets,
    adressInput: adressInput,
    roomInput: roomInput,
    guestInput: guestInput
  };

})();
