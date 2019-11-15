'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('.ad-form__element');
  var title = document.querySelector('#title');
  var adressInput = document.querySelector('#address');
  var roomInput = document.querySelector('#room_number');
  var guestInput = document.querySelector('#capacity');
  var priceInput = document.querySelector('#price');
  var typeInput = document.querySelector('#type');
  var timeinInput = document.querySelector('#timein');
  var timeoutInput = document.querySelector('#timeout');
  var descInput = document.querySelector('#description');
  var featuresInputList = form.querySelectorAll('input[type="checkbox"]');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    send(new FormData(form), resetForm, window.error.dataSendHandler);
  });


  function send(data, onLoad, onError) {

    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking+';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }

  function resetForm() {
    title.value = '';
    roomInput.value = '1';
    guestInput.value = '3';
    priceInput.value = '';
    priceInput.placeholder = '5000';
    typeInput.value = 'flat';
    descInput.value = '';
    timeinInput.value = '12:00';
    timeoutInput.value = '12:00';

    featuresInputList.forEach(function (el) {
      el.checked = false;
    });

    disable();
    window.map.deactivate();
  }

  function activate() {
    setDisabled(fieldsets, true);
  }

  function enable() {
    form.classList.remove('ad-form--disabled');
  }

  function disable() {
    form.classList.add('ad-form--disabled');
  }

  function setAddress(addressString) {
    adressInput.value = addressString;
  }

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

  function checkPrice(min) {

    var price = parseInt(priceInput.value, 10);

    if (price > min && price < 1000000) {
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
        if (!checkPrice(0)) {
          priceInput.setCustomValidity('Неподходящая цена для бунгало');
        }
        break;
      case 'flat':
        priceInput.placeholder = '1000';
        if (!checkPrice(1000)) {
          priceInput.setCustomValidity('Цена на квартиру должна быть в промежутке от 1000 до 1000000');
        }
        break;
      case 'house':
        priceInput.placeholder = '5000';
        if (!checkPrice(5000)) {
          priceInput.setCustomValidity('Цена на дом должна быть в промежутке от 5000 до 1000000');
        }
        break;
      case 'palace':
        priceInput.placeholder = '10000';
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
    setDisabled: setDisabled,
    setAddress: setAddress,
    checkGuests: checkGuests,
    enable: enable,
    fieldsets: fieldsets,
    adressInput: adressInput,
    roomInput: roomInput,
    guestInput: guestInput
  };

})();
