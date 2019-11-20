'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 22;
  var PIN_HEIGHT = 65;
  var PIN_WIDTH = 65;
  var MAP_XPOS_TOP = 630;
  var MAP_XPOS_BOTTOM = 130;

  var offers = [];
  var map = document.querySelector('.map');
  var popup;
  var closeButton;

  var mainPin = document.querySelector('.map__pin--main');
  var similarPinElements = document.querySelector('.map__pins');
  var filterContainer = map.querySelector('.map__filters-container');

  function renderPlaces(places) {
    var fragment = document.createDocumentFragment();

    places.forEach(function (el) {
      var element = window.pin.getPlaceDomElement(el);
      fragment.appendChild(element);
    });

    return fragment;
  }

  function activateMap(arr) {
    map.classList.remove('map--faded');
    window.form.setDisabledFields(arr, false);
    window.form.enable();
    window.filter.enable();
    window.data.get(onSuccessDataLoad, window.error.data);
    window.form.checkGuests();
  }

  function deactivateMap() {
    if (popup) {
      closePopup();
    }
    similarPinElements.innerHTML = '<div class="map__overlay"><h2 class="map__title">И снова Токио!</h2></div>';
    similarPinElements.appendChild(mainPin);
    map.classList.add('map--faded');
    window.success.show();
  }

  function setCenterCoordinates() {
    var yOffset = mainPin.offsetHeight / 2;
    var xOffset = mainPin.offsetWidth / 2;
    var addressString = Math.floor(mainPin.offsetLeft + xOffset) + ', ' + Math.floor(mainPin.offsetTop + yOffset);

    window.form.setAddress(addressString);
  }

  function setOffsetCoordinates() {
    var yOffset = mainPin.offsetHeight;
    var xOffset = mainPin.offsetWidth / 2;
    var addressString = window.form.addressInput.value = Math.floor(mainPin.offsetLeft + xOffset) + ', ' + Math.floor(mainPin.offsetTop + yOffset + PIN_POINTER_HEIGHT);

    window.form.setAddress(addressString);
  }

  function resetMainPinPoition() {
    mainPin.style.left = '570px';
    mainPin.style.top = '375px';
  }

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KEYCODE.ENTER) {
      activateMap(window.form.fieldsets);
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    activateMap(window.form.fieldsets);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      setOffsetCoordinates();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mainPin.offsetLeft - shift.x) >= -(PIN_WIDTH / 2) &&
      (mainPin.offsetLeft - shift.x) <= (map.offsetWidth - PIN_WIDTH / 2)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if ((mainPin.offsetTop - shift.y) >= (MAP_XPOS_BOTTOM - PIN_POINTER_HEIGHT - PIN_HEIGHT) &&
      (mainPin.offsetTop - shift.y) <= (MAP_XPOS_TOP - PIN_POINTER_HEIGHT - PIN_HEIGHT)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setOffsetCoordinates();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  function onSuccessDataLoad(data) {
    offers = data.slice();
    var filteredData = data.splice(0, 5);
    createCard(filteredData[0]);
    similarPinElements.appendChild(renderPlaces(filteredData));
  }

  function updateData() {
    closePopup();
    similarPinElements.innerHTML = '';
    var offersCopy = offers.slice();
    var dataFilteredBytype = window.filter.byType(offersCopy);
    var dataFilteredByPrice = window.filter.byPrice(dataFilteredBytype);
    var dataFilteredbyGuest = window.filter.byGuests(dataFilteredByPrice);
    var dataFilteredbyRooms = window.filter.byRooms(dataFilteredbyGuest);
    var filteredData = window.filter.byFeatures(dataFilteredbyRooms).splice(0, 5);
    similarPinElements.appendChild(mainPin);
    similarPinElements.appendChild(renderPlaces(filteredData));
  }

  var cardTemplate = document.getElementById('card')
  .content
  .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);

  function createCard(data) {

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/Ночь';
    cardElement.querySelector('.popup__type').textContent = typeToText(data.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(getFeatureDomElements(data.offer.features));
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    cardElement.querySelector('.popup__photos').innerHTML = '';
    cardElement.querySelector('.popup__photos').appendChild(getPlacePicDomElements(data.offer.photos));
    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    map.insertBefore(cardElement, filterContainer);

    popup = document.querySelector('.popup');
    closeButton = document.querySelector('.popup__close');
    popup.classList.add('hidden');
  }

  function closePopup() {
    popup.classList.add('hidden');
    closeButton.removeEventListener('click', onPopupClick);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function showPopup() {
    popup.classList.remove('hidden');
    closeButton.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.KEYCODE.ESC) {
      closePopup();
    }
  }

  function onPopupClick() {
    closePopup();
  }

  function getFeatureDomElements(features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (el) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + el);
      fragment.appendChild(li);
    });

    return fragment;
  }

  function getPlacePicDomElements(images) {
    var fragment = document.createDocumentFragment();

    images.forEach(function (image) {
      var img = document.createElement('img');
      img.src = image;
      img.classList.add('popup__photo');
      img.width = '45';
      img.height = '40';
      img.alt = 'Фотография жилья';
      fragment.appendChild(img);
    });

    return fragment;
  }

  function typeToText(type) {
    var types = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };
    return types[type];
  }
  window.map = {
    setPinCoordinates: setCenterCoordinates,
    deactivate: deactivateMap,
    updatePlaces: updateData,
    updateCard: createCard,
    showPopup: showPopup,
    resetMainPin: resetMainPinPoition
  };


})();
