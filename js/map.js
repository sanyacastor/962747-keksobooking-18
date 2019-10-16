'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_POINTER_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var similarPinElements = document.querySelector('.map__pins');

  function renderPlaces(places) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < places.length; i++) {
      var place = places[i];
      var element = window.pin.getPlaceDomElement(place);
      fragment.appendChild(element);
    }
    return fragment;
  }

  function activateMap(arr) {

    map.classList.remove('map--faded');

    window.form.setDisabled(arr, false);

    window.form.form.classList.remove('ad-form--disabled');

    var places = window.data.generatePlaces();
    similarPinElements.appendChild(renderPlaces(places));
    window.form.checkGuests();
  }

  function setCenterCoordinates() {
    var yOffset = mainPin.offsetHeight / 2;
    var xOffset = mainPin.offsetWidth / 2;

    window.form.adressInput.value = (mainPin.offsetLeft + xOffset) + ', ' + (mainPin.offsetTop + yOffset);
  }

  function setOffsetCoordinates() {
    var yOffset = mainPin.offsetHeight;
    var xOffset = mainPin.offsetWidth / 2;

    window.form.adressInput.value = (mainPin.offsetLeft + xOffset) + ', ' + (mainPin.offsetTop + yOffset + PIN_POINTER_HEIGHT);
  }

  mainPin.addEventListener('mousedown', function () {
    activateMap(window.form.fieldsets);
    setOffsetCoordinates(mainPin);
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateMap(window.form.fieldsets);
    }
  });

  window.map = {
    setCenterCoordinates: setCenterCoordinates
  };

})();


