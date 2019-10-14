'use strict';

var TITLE = [
  'Комната',
  'Квартира',
  'Отель'
];

var DESCRIPTION = [
  'Я не гонюсь за деньгами, поэтому, признаюсь, хочется делить свою уютную квартиру с позитивными гостями!',
  'Каждый элемент интерьера продуман и сделан со вкусом.',
  'Для комфортного сна в квартире повешены шторы блек-аут которые плотно закрывают окна.'
];

var CHECKTIME = [
  '12:00',
  '13:00',
  '14:00'
];

var PLACE_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var X_MIN = 50;
var X_MAX = 1150;
var Y_MIN = 165;
var Y_MAX = 595;

var ENTER_KEYCODE = 13;
var PIN_POINTER_HEIGHT = 22;

// var PIN_OFFSET_X = 25;
// var PIN_OFFSET_Y = 35;

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInRange(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getRandomFromList(arr) {
  var newList = [];

  var iteratior = Math.floor(Math.random() * arr.length);

  for (var i = 0; i < iteratior; i++) {
    newList.push(getRandom(arr));
  }
  return newList;
}


function generatePlaces() {

  var places = [];

  for (var i = 1; i < 9; i++) {

    var place = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },

      location: {
        x: getRandomInRange(X_MIN, X_MAX),
        y: getRandomInRange(Y_MIN, Y_MAX)
      },

      offer: {
        title: getRandom(TITLE),
        address: location.x + ', ' + location.y,
        price: getRandomInRange(100, 5000),
        type: getRandom(PLACE_TYPE),
        rooms: getRandomInRange(1, 3),
        guests: getRandomInRange(1, 5),
        checkin: getRandom(CHECKTIME),
        checkout: getRandom(CHECKTIME),
        features: getRandomFromList(FEATURES),
        description: getRandom(DESCRIPTION),
        photos: getRandomFromList(PHOTOS)
      }
    };

    places.push(place);
  }
  return places;
}

function getPlaceDomElement(place) {

  var pin = similarPinTemplate.cloneNode(true);
  var avatar = pin.querySelector('img');

  pin.style.left = place.location.x + 'px';
  pin.style.top = place.location.y + 'px';
  avatar.src = place.author.avatar;
  avatar.alt = place.offer.title;

  return pin;
}

function renderPlaces(places) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < places.length; i++) {
    var place = places[i];
    var element = getPlaceDomElement(place);
    fragment.appendChild(element);
  }
  return fragment;
}

var form = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('.ad-form__element');
var mainPin = document.querySelector('.map__pin--main');
var adressInput = document.querySelector('#address');
var roomInput = document.querySelector('#room_number');
var guestInput = document.querySelector('#capacity');

var map = document.querySelector('.map');
var similarPinElements = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

function setDisabled(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = value;
  }
}

function activateMap(arr) {

  map.classList.remove('map--faded');

  setDisabled(arr, false);

  form.classList.remove('ad-form--disabled');

  var places = generatePlaces();
  similarPinElements.appendChild(renderPlaces(places));
  checkGuests();
}

function setCenterCoordinates() {
  var yOffset = mainPin.offsetHeight / 2;
  var xOffset = mainPin.offsetWidth / 2;

  adressInput.value = (mainPin.offsetLeft + xOffset) + ', ' + (mainPin.offsetTop + yOffset);
}

function setOffsetCoordinates() {
  var yOffset = mainPin.offsetHeight;
  var xOffset = mainPin.offsetWidth / 2;

  adressInput.value = (mainPin.offsetLeft + xOffset) + ', ' + (mainPin.offsetTop + yOffset + PIN_POINTER_HEIGHT);
}

mainPin.addEventListener('mousedown', function () {
  activateMap(fieldsets);
  setOffsetCoordinates(mainPin);
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap(fieldsets);
  }
});

// Custom rooms and Guests validation

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


setCenterCoordinates();
setDisabled(fieldsets, true);

