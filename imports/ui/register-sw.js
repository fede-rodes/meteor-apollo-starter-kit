//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const updateReady = () => {
  // At this point, registration has taken place. The service worker will not
  // handle requests until this page and any other instances of this page
  // (in other tabs, etc.) have been closed/reloaded.
  alert('New version available, please reload.'); // eslint-disable-line no-alert
  // TODO: use a confirm instead and reload on ok
};
//------------------------------------------------------------------------------
const trackInstalling = (worker) => {
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      updateReady();
    }
  });
};
//------------------------------------------------------------------------------
// MAIN FUNCTION:
//------------------------------------------------------------------------------
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((reg) => {
      // If there is not controller, this page wasn't loaded via a service
      // worker, so they are looking at the latest version. In that case exit
      // early.
      if (!navigator.serviceWorker.controller) {
        console.log('no controller found');
        return;
      }

      // If there is an updated service worker already waiting, call
      // updateReady().
      if (reg.waiting) {
        console.log('waiting');
        updateReady();
        return;
      }

      // If there is an updated worker installed, track it's progress. If it
      // becomes 'installed', call updateReady().
      if (reg.installing) {
        console.log('installing');
        trackInstalling(reg.installing);
        return;
      }

      // Otherwise, listen for new installing workers arriving. If one arrives,
      // track its progress. If it becomes 'installed', call updateReady().
      reg.addEventListener('updateFound', () => {
        console.log('update found');
        trackInstalling(reg.installing);
      });

      console.log('service worker installed');
    })
    .catch(err => (
      // Something went wrong during registration. The sw.js file might be
      // unavailable or contain a syntax error.
      console.info('servicecworker registration failed', err)
    ));
} else {
  console.log('the current browser doesn\'t support service workers.');
}
