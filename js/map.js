'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 22;
  var MAP_XPOS_TOP = 543;
  var MAP_XPOS_BOTTOM = 42.5;

  var offers = [];
  var map = document.querySelector('.map');
  var popup;
  var closeButton;


  var mainPin = document.querySelector('.map__pin--main');
  var similarPinElements = document.querySelector('.map__pins');
  var filterContainer = map.querySelector('.map__filters-container');

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
    window.data.get(sucessDataLoadHadler, window.error.dataLoadHandler);
    window.form.checkGuests();
  }

  function deactivateMap() {
    closePopup();
    similarPinElements.innerHTML = '<div class="map__overlay"><h2 class="map__title">И снова Токио!</h2></div>';
    similarPinElements.appendChild(mainPin);
    map.classList.add('map--faded');
    window.sucess.show();
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

  // mainPin.addEventListener('mousedown', function () {
  //   activateMap(window.form.fieldsets);
  //   setOffsetCoordinates();
  // });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.keyCode.enter) {
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

      mainPin.style.top = getMapPinTop(moveEvt, shift);
      mainPin.style.left = getMapPinLeft(moveEvt, shift);

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

  function getMapPinTop(evt, shift) {
    if (evt.clientY >= MAP_XPOS_TOP) {
      return MAP_XPOS_TOP + 'px';
    }
    if (evt.clientY <= MAP_XPOS_BOTTOM) {
      return MAP_XPOS_BOTTOM + 'px';
    }
    return (mainPin.offsetTop - shift.y) + 'px';
  }

  function getMapPinLeft(evt, shift) {
    if (evt.clientX >= map.offsetWidth) {
      return map.offsetWidth - (mainPin.offsetWidth) + 'px';
    }
    if (evt.clientX <= 0) {
      return '0px';
    }
    return (mainPin.offsetLeft - shift.x) + 'px';
  }


  function sucessDataLoadHadler(data) {
    offers = data.slice();
    var filtredData = data.splice(0, 5);
    createCard(filtredData[0]);
    similarPinElements.appendChild(renderPlaces(filtredData));
  }


  function updateData(param) {
    similarPinElements.innerHTML = '';
    var offersCopy = offers.slice();
    var filtredData = window.filter.byType(offersCopy, param).splice(0, 5);
    similarPinElements.appendChild(mainPin);
    similarPinElements.appendChild(renderPlaces(filtredData));
  }

  var cardTemplate = document.getElementById('card')
  .content
  .querySelector('.map__card');
  var cardEl = cardTemplate.cloneNode(true);


  function createCard(data) {

    cardEl.querySelector('.popup__title').textContent = data.offer.title;
    cardEl.querySelector('.popup__text--address').textContent = data.offer.address;
    cardEl.querySelector('.popup__text--price').textContent = data.offer.price + '₽/Ночь';
    cardEl.querySelector('.popup__type').textContent = typeToText(data.offer.type);
    cardEl.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    cardEl.querySelector('.popup__features').innerHTML = '';
    cardEl.querySelector('.popup__features').appendChild(getFeatureDomElements(data.offer.features));
    cardEl.querySelector('.popup__description').textContent = data.offer.description;
    cardEl.querySelector('.popup__photos').innerHTML = '';
    cardEl.querySelector('.popup__photos').appendChild(getPlacePicDomElements(data.offer.photos));
    cardEl.querySelector('.popup__avatar').src = data.author.avatar;

    map.insertBefore(cardEl, filterContainer);

    popup = document.querySelector('.popup');
    closeButton = document.querySelector('.popup__close');

    showPopup();
  }

  function closePopup() {
    popup.classList.add('hidden');
    closeButton.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function showPopup() {
    popup.classList.remove('hidden');
    closeButton.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.keyCode.esc) {
      closePopup();
    }
  }

  function getFeatureDomElements(featurelist) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < featurelist.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + featurelist[i]);
      fragment.appendChild(li);
    }
    return fragment;
  }

  function getPlacePicDomElements(piclist) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < piclist.length; i++) {
      var img = document.createElement('img');
      img.src = piclist[i];
      img.classList.add('popup__photo');
      img.width = '45';
      img.height = '40';
      img.alt = 'Фотография жилья';
      fragment.appendChild(img);
    }
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
    activate: setCenterCoordinates,
    deactivate: deactivateMap,
    updatePlaces: updateData,
    updateCard: createCard
  };


})();
