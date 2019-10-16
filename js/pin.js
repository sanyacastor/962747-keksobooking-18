'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  function getPlaceDomElement(place) {

    var pin = similarPinTemplate.cloneNode(true);
    var avatar = pin.querySelector('img');

    pin.style.left = place.location.x + 'px';
    pin.style.top = place.location.y + 'px';
    avatar.src = place.author.avatar;
    avatar.alt = place.offer.title;

    return pin;
  }

  window.pin = {
    getPlaceDomElement: getPlaceDomElement
  };
})();
