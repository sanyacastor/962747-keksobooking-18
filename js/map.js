'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_POINTER_HEIGHT = 22;

  var offers = [];
  var map = document.querySelector('.map');

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
    updatePlaces: updateData,
  };

})();


