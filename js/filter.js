'use strict';
(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var filterForm = document.querySelector('.map__filters');
  var typeInput = document.getElementById('housing-type');
  var priceInput = document.getElementById('housing-price');
  var roomsInput = document.getElementById('housing-rooms');
  var guestInput = document.getElementById('housing-guests');
  var featuresInput = document.getElementById('housing-features');
  var features = featuresInput.querySelectorAll('input');


  function setDisabled() {
    window.form.setDisabledFields(filterForm.querySelectorAll('select'), true);
    window.form.setDisabledFields(features, true);
  }

  function setEnabled() {
    window.form.setDisabledFields(filterForm.querySelectorAll('select'), false);
    window.form.setDisabledFields(features, false);
  }


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
          return el.offer.price > MIN_PRICE && el.offer.price < MAX_PRICE;
        case 'low':
          return el.offer.price <= MIN_PRICE;
        case 'high':
          return el.offer.price >= MAX_PRICE;
        default:
          return false;
      }
    });
  }

  function filterByFeatures(data) {
    var checkedFeatures = [];

    features.forEach(function (el) {
      if (el.checked) {
        checkedFeatures.push(el.value);
      }
      return checkedFeatures;
    });

    return data.filter(function (el) {
      return checkedFeatures.every(function (feat) {
        return el.offer.features.includes(feat);
      });
    });

  }

  var onFilterChange = window.debounce(function () {
    window.map.updatePlaces();
  });

  filterForm.addEventListener('change', onFilterChange);


  window.filter = {
    byType: filterByType,
    byRooms: filterByRooms,
    byGuests: filterByGuests,
    byPrice: filterByPrice,
    byFeatures: filterByFeatures,
    enable: setEnabled,
    disable: setDisabled
  };
})();
