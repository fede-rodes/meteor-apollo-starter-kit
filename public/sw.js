/* global clients */
/* eslint no-undef: "error" */

// Source: https://github.com/VeliovGroup/Meteor-Files-Demos/blob/master/demo/public/sw.js
// self refers to the service worker implicitly
const CACHE_NAME = 'meteor_apollo_starter_v1';
const pages = [
  '/',
  '/sw.js',
  '/manifest-pwa.json',
  '/css/style.css',
  '/js/toast.js',
  '/js/offline.js',
  '/js/menu.js',
];
const origin = self.location.origin;
const RE = {
  method: /GET/i,
  static: /\.(?:png|jpe?g|css|js|gif|webm|webp|eot|svg|ttf|woff|woff2)(?:\?[a-zA-Z0-9-._~:/#\[\]@!$&'()*+,;=]*)?$|(?:fonts\.googleapis\.com|gstatic\.com)/i, // '
  sockjs: /\/sockjs\//,
};

self.addEventListener('install', (evt) => {
  // Allow the service worker to progress from the registration's 'waiting'
  // position to 'active' even while service worker clients are using the
  // registration
  self.skipWaiting();

  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        cache.addAll(pages);
      })
    ,
  );
});

self.addEventListener('fetch', (evt) => {
  // Go through all the clients and attempt to have the currently executing
  // service worker take control
  self.clients.claim();

  // In case it's a GET request or a websocket, skip
  if (!RE.method.test(evt.request.method) || RE.sockjs.test(evt.request.url)) {
    return;
  }

  // Otherwise, process request
  const req = evt.request.clone();
  const uri = evt.request.url.replace(origin, '');

  evt.respondWith(
    fetch(req)
      .then((response) => {
        if (pages.indexOf(uri) !== -1 || RE.static.test(evt.request.url)) {
          const resp = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(req, resp);
            });
        }
        return response;
      })
      .catch(() => (
        caches.match(req)
          .then(cached => cached || caches.match('/').catch(() => fetch(req)))
          .catch(() => caches.match('/').catch(() => fetch(req)))
      ))
    ,
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys()
      .then(cacheNames => (
        Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName).catch(() => {})),
        )
      ))
    ,
  );
});

// Push event listener aux function:
const showNotification = (evt) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const title = 'Push notification demo';
  const options = {
    body: evt.data && evt.data.text() ? evt.data.text() : 'Push message no payload',
    tag: 'demo',
    icon: '/images/apple-touch-icon.png',
    badge: '/images/apple-touch-icon.png',
    // Custom actions buttons
    actions: [
      { action: 'yes', title: 'I ♥ this app!' },
      { action: 'no', title: 'I don\'t like this app' },
    ],
  };

  evt.waitUntil(
    self.registration.showNotification(title, options),
  );
};

// When to Show Notifications:
// If the user is already using your application there is no need to display a
// notification. You can manage this logic on the server, but it is easier to
// do it in the push handler inside your service worker:
// the 'clients' global in the service worker lists all of the active push
// clients on this machine. If there are no clients active, the user must be
// in another app. We should show a notification in this case. If there are
// active clients it means that the user has your site open in one or more
// windows. The best practice is to relay the message to each of those windows.
// Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
// Source: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
self.addEventListener('push', (evt) => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${evt && evt.data}"`);

  // Comment out the following line in case you only want to display
  // notifications when the app isn't open
  showNotification(evt);

  clients.matchAll()
    .then((client) => {
      if (client.length === 0) {
        // Un-comment the following line in case you only want to display
        // notifications when the app isn't open
        // showNotification(evt);
      } else {
        // Send a message to the page to update the UI
        console.log('Application is already open!');
      }
    });
});

// The code below looks for the first window with 'visibilityState' set to
// 'visible'. If one is found it navigates that client to the correct URL and
// focuses the window. If a window that suits our needs is not found, it
// opens a new window.
// Source: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
// Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
self.addEventListener('notificationclick', (evt) => {
  console.log('[Service Worker] Notification click Received.');

  const appUrl = new URL('/', location).href;

  // Listen to custom action buttons in push notification
  if (evt.action === 'yes') {
    console.log('I ♥ this app!');
  } else if (evt.action === 'no') {
    console.log('I don\'t like this app');
  }

  evt.waitUntil(
    clients.matchAll()
      .then((clientsList) => {
        const client = clientsList.find(c => (
          c.visibilityState === 'visible'
        ));

        if (client !== undefined) {
          client.navigate(appUrl);
          client.focus();
        } else {
          // There are no visible windows. Open one.
          clients.openWindow(appUrl);
        }
      })
    ,
  );

  // Close all notifications (thisincludes any other notifications from the
  // same origin)
  // Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
  self.registration.getNotifications()
    .then((notifications) => {
      notifications.forEach((notification) => { notification.close(); });
    });
});
