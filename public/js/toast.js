/* eslint-disable */
// Source: https://dzone.com/articles/introduction-to-progressive-web-apps-offline-first
(function (exports) {
  'use strict';
  var toastContainer = document.querySelector('.toast__container');

  // To show notification
  function toast(msg, options) {
    if (!msg) return;
    options = options || 3000;
    var toastMsg = document.createElement('div');
    toastMsg.className = 'flex justify-between items-center toast__msg';
    toastMsg.textContent = msg;
    toastContainer.appendChild(toastMsg);

    // Show toast for 3secs and hide it
    setTimeout(function () {
      toastMsg.classList.add('toast__msg--hide');
    }, options);

    // Remove the element after hiding
    toastMsg.addEventListener('transitionend', function (event) {
      event.target.parentNode.removeChild(event.target);
    });
  }

  // Make this method available in global
  exports.toast = toast;
})(typeof window === 'undefined' ? module.exports : window);
