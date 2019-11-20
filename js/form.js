'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('.ad-form__element');
  var addressInput = document.querySelector('#address');
  var roomInput = document.querySelector('#room_number');
  var guestInput = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var timeinInput = document.querySelector('#timein');
  var timeoutInput = document.querySelector('#timeout');
  var avatar = document.querySelector('#avatar');
  var formResetButton = document.querySelector('.ad-form__reset');


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.send(new FormData(form), resetForm, window.error.data);
  });

  function resetForm() {
    form.reset();
    disable();
    window.filter.disable();
    window.map.deactivate();
    window.map.resetMainPin();
    window.map.setPinCoordinates();
  }

  function activate() {
    setDisabled(fieldsets, true);
    avatar.disabled = true;
  }

  function enable() {
    form.classList.remove('ad-form--disabled');
    avatar.disabled = false;
    formResetButton.addEventListener('click', onFormReset);
  }

  function onFormReset() {
    resetForm();
  }

  function disable() {
    form.classList.add('ad-form--disabled');
    setDisabled(fieldsets, true);
    avatar.disabled = true;
    formResetButton.removeEventListener('click', onFormReset);
  }

  function setAddress(addressString) {
    addressInput.value = addressString;
  }

  function setDisabled(arr, value) {
    arr.forEach(function (el) {
      el.disabled = value;
    });
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

  function checkPrice(min) {

    var price = parseInt(priceInput.value, 10);

    if (price >= min && price <= 1000000) {
      priceInput.setCustomValidity('');
      return true;
    }

    priceInput.setCustomValidity('Неподходящая цена');
    return false;
  }

  function checkType() {
    switch (typeInput.value) {
      case 'bungalo':
        priceInput.placeholder = '0';
        priceInput.min = '0';
        if (!checkPrice(0)) {
          priceInput.setCustomValidity('Неподходящая цена для бунгало');
        }
        break;
      case 'flat':
        priceInput.placeholder = '1000';
        priceInput.min = '1000';
        if (!checkPrice(1000)) {
          priceInput.setCustomValidity('Цена на квартиру должна быть в промежутке от 1000 до 1000000');
        }
        break;
      case 'house':
        priceInput.placeholder = '5000';
        priceInput.min = '5000';
        if (!checkPrice(5000)) {
          priceInput.setCustomValidity('Цена на дом должна быть в промежутке от 5000 до 1000000');
        }
        break;
      case 'palace':
        priceInput.placeholder = '10000';
        priceInput.min = '10000';
        if (!checkPrice(10000)) {
          priceInput.setCustomValidity('Цена на дворец должна быть в промежутке от 10000 до 1000000');
        }
        break;
      default:
        priceInput.setCustomValidity('');
    }
  }

  timeinInput.addEventListener('change', function () {
    timeoutInput.value = timeinInput.value;
  });

  timeoutInput.addEventListener('change', function () {
    timeinInput.value = timeoutInput.value;
  });

  typeInput.addEventListener('change', function () {
    checkType();
  });

  priceInput.addEventListener('change', function () {
    checkType();
  });

  roomInput.addEventListener('change', function () {
    checkGuests();
  });

  guestInput.addEventListener('change', function () {
    checkGuests();
  });

  window.form = {
    activate: activate,
    setDisabledFields: setDisabled,
    setAddress: setAddress,
    checkGuests: checkGuests,
    enable: enable,
    fieldsets: fieldsets,
    addressInput: addressInput,
    roomInput: roomInput,
    guestInput: guestInput
  };

})();
