'use strict';

(function () {

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomInRange(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function getRandomFromList(arr) {
    var newList = [];

    var iterator = Math.floor(Math.random() * arr.length);

    for (var i = 0; i < iterator; i++) {
      newList.push(getRandom(arr));
    }
    return newList;
  }

  window.random = {
    get: getRandom,
    getInRange: getRandomInRange,
    getFromList: getRandomFromList
  };

})();
