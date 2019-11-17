'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var typeInput = document.getElementById('housing-type');
  var priceInput = document.getElementById('housing-price');
  var roomsInput = document.getElementById('housing-rooms');
  var guestInput = document.getElementById('housing-guests');
  var featuresInput = document.getElementById('housing-features');
  var features = featuresInput.querySelectorAll('input');

  function filterByType(data) {
    return data.filter(function (el) {
      return (typeInput.value === 'any') ? true : el.offer.type === typeInput.value;
    });
  }

  function filterByRooms(data) {
    return data.filter(function (el) {
      return (roomsInput.value === 'any') ? true : el.offer.rooms.toString() === roomsInput.value;
    });
  }

  function filterByGuests(data) {
    return data.filter(function (el) {
      return (guestInput.value === 'any') ? true : el.offer.guests.toString() === guestInput.value;
    });
  }

  function filterByPrice(data) {
    return data.filter(function (el) {
      switch (priceInput.value) {
        case 'any':
          return true;
        case 'middle':
          return el.offer.price > 10000 && el.offer.price < 50000;
        case 'low':
          return el.offer.price <= 10000;
        case 'high':
          return el.offer.price >= 50000;
        default:
          return false;
      }
    });
  }

  function filterByFeatures(data) {
    var chekkedFeatures = [];

    features.forEach(function (el) {
      if (el.checked) {
        chekkedFeatures.push(el.value);
      }
      return chekkedFeatures;
    });

    return data.filter(function (el) {
      return chekkedFeatures.every(function (feat) {
        return el.offer.features.includes(feat);
      });
    });

  }

  var filterChangeHandler = window.debounce(function () {
    window.map.updatePlaces();
  });

  filterForm.addEventListener('change', filterChangeHandler);


  window.filter = {
    byType: filterByType,
    byRooms: filterByRooms,
    byGuests: filterByGuests,
    byPrice: filterByPrice,
    byFeatures: filterByFeatures
  };
})();
