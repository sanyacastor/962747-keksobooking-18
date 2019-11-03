'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_POINTER_HEIGHT = 22;

  var offers = [];
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
    window.form.enable();
    window.load.getData(sucessDataLoadHadler, window.error.dataLoadHandler);
    window.form.checkGuests();
  }

  function setCenterCoordinates() {
    var yOffset = mainPin.offsetHeight / 2;
    var xOffset = mainPin.offsetWidth / 2;
    var addressString = (mainPin.offsetLeft + xOffset) + ', ' + (mainPin.offsetTop + yOffset);

    window.form.setAddress(addressString);
  }

  function setOffsetCoordinates() {
    var yOffset = mainPin.offsetHeight;
    var xOffset = mainPin.offsetWidth / 2;
    var addressString = window.form.adressInput.value = (mainPin.offsetLeft + xOffset) + ', ' + (mainPin.offsetTop + yOffset + PIN_POINTER_HEIGHT);

    window.form.setAddress(addressString);
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

  function sucessDataLoadHadler(data) {
    offers = data.slice();
    var filtredData = data.splice(0, 5);
    similarPinElements.appendChild(renderPlaces(filtredData));

  }

  function updateData(param) {
    similarPinElements.innerHTML = '';
    var offersCopy = offers;
    var filtredData = window.filter.byType(offersCopy, param).splice(0, 5);
    similarPinElements.appendChild(mainPin);
    similarPinElements.appendChild(renderPlaces(filtredData));
  }

  window.map = {
    activate: setCenterCoordinates,
    updatePlaces: updateData,
  };

})();


