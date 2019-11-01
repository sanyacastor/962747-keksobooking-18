'use strict';
(function () {
  var typeInput = document.getElementById('housing-type');

  typeInput.addEventListener('change', function () {
    window.map.updatePlaces(typeInput.value);
  });

  function sortByType(data, type) {
    if (type !== 'any') {
      var filtred = data.filter(function (el) {
        return el.offer.type === type;
      });
      return filtred;
    }
    return data;
  }


  window.filter = {
    sortByType: sortByType
  };
})();
