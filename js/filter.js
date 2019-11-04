'use strict';
(function () {
  var typeInput = document.getElementById('housing-type');

  typeInput.addEventListener('change', function () {
    window.map.updatePlaces(typeInput.value);
  });

  function filterByType(data, type) {
    return data.filter(function (el) {
      return (type === 'any') ? true : el.offer.type === type;
    });
  }

  window.filter = {
    byType: filterByType
  };
})();
