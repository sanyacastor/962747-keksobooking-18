'use strict';

(function () {

  var X_MIN = 50;
  var X_MAX = 1150;
  var Y_MIN = 165;
  var Y_MAX = 595;

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

  function generatePlaces() {

    var places = [];

    for (var i = 1; i < 9; i++) {

      var place = {
        author: {
          avatar: 'img/avatars/user0' + i + '.png'
        },

        location: {
          x: window.random.getRandomInRange(X_MIN, X_MAX),
          y: window.random.getRandomInRange(Y_MIN, Y_MAX)
        },

        offer: {
          title: window.random.getRandom(TITLE),
          address: location.x + ', ' + location.y,
          price: window.random.getRandomInRange(100, 5000),
          type: window.random.getRandom(PLACE_TYPE),
          rooms: window.random.getRandomInRange(1, 3),
          guests: window.random.getRandomInRange(1, 5),
          checkin: window.random.getRandom(CHECKTIME),
          checkout: window.random.getRandom(CHECKTIME),
          features: window.random.getRandomFromList(FEATURES),
          description: window.random.getRandom(DESCRIPTION),
          photos: window.random.getRandomFromList(PHOTOS)
        }
      };

      places.push(place);
    }
    return places;
  }

  window.data = {
    generatePlaces: generatePlaces
  };


})();
