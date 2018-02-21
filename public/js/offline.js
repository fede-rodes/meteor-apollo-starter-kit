/* eslint-disable */
(function () {
  'use strict';
  var header = document.querySelector('header');
  var menuHeader = document.querySelector('.menu__header');

  // After DOM Loaded
  document.addEventListener('DOMContentLoaded', function(event) {
    // On initial load to check connectivity
    if (!navigator.onLine) {
      updateNetworkStatus();
    }
    window.addEventListener('online', updateNetworkStatus, false);
    window.addEventListener('offline', updateNetworkStatus, false);
  });

  // To update network status
  function updateNetworkStatus() {
    if (navigator.onLine) {
      header.classList.remove('app__offline');
      menuHeader.style.background = '#1E88E5';
    }
    else {
      toast('You are offline!');
      header.classList.add('app__offline');
      menuHeader.style.background = '#9E9E9E';
    }
  }
})();
