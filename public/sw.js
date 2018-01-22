/* eslint-disable */
// From https://github.com/VeliovGroup/Meteor-Files-Demos/blob/master/demo/public/sw.js

;(function (self) {
  'use strict';
  var CACHE_NAME = 'meteor_apollo_starter_v1';
  var pages      = ['/', '/sw.js', '/manifest-pwa.json'];
  var origin     = self.location.origin;
  var RE         = {
    method: /GET/i,
    static: /\.(?:png|jpe?g|css|js|gif|webm|webp|eot|svg|ttf|woff|woff2)(?:\?[a-zA-Z0-9-._~:/#\[\]@!$&'()*+,;=]*)?$|(?:fonts\.googleapis\.com|gstatic\.com)/i,
    sockjs: /\/sockjs\//
  };

  self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
      cache.addAll(pages);
    }));
  });

  self.addEventListener('fetch', function (event) {
    self.clients.claim();
    if (RE.method.test(event.request.method) && !RE.sockjs.test(event.request.url)) {
      var req = event.request.clone();
      var uri = event.request.url.replace(origin, '');

      event.respondWith(fetch(req).then(function (response) {
        if (!!~pages.indexOf(uri) || RE.static.test(event.request.url)) {
          var resp = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(req, resp);
          });
        }
        return response;
      }).catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || caches.match('/').catch(function () {
            return fetch(req);
          });
        }).catch(function () {
          return caches.match('/').catch(function () {
            return fetch(req);
          });
        });
      }));
    }
  });

  self.addEventListener('activate', function (event) {
    event.waitUntil(caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (cacheName) {
        return caches.delete(cacheName).catch(function () {
          return;
        });
      }));
    }));
  });

  // SOURCE: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
  self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Push notification demo';
    const options = {
      body: 'Yay it works.',
      tag: 'demo',
      icon: '/images/apple-touch-icon.png',
      badge: '/images/apple-touch-icon.png',
      // Custom actions buttons
      'actions': [
        { "action": "yes", "title": "I ♥ this app!"},
        { "action": "no", "title": "I don\'t like this app"}
      ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });

  // SOURCE: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    var appURL = new URL('/', location).href;
    console.log('appURL', appURL);

    // Listen to custom action buttons in push notification
    if (event.action === 'yes') {
      console.log('I ♥ this app!');
    }
    else if (event.action === 'no') {
      console.warn('I don\'t like this app');
    }

    event.notification.close();

    event.waitUntil(clients.matchAll({
      type: 'window'
    }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(appURL);
      }
    }));
  });
})(this);
