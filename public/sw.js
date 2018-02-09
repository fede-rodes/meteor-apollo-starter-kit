/* eslint-disable */
// From https://github.com/VeliovGroup/Meteor-Files-Demos/blob/master/demo/public/sw.js

// self refers to the service worker implicitly
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

  /*
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
  self.addEventListener('push', function(e) {
    clients.matchAll().then(function(c) {
      if (c.length === 0) {
        // Show notification
        e.waitUntil(
          self.registration.showNotification('Push notification')
        );
      } else {
        // Send a message to the page to update the UI
        console.log('Application is already open!');
      }
    });
  });
  */

  // SOURCE: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
  self.addEventListener('push', function(evt) {
    console.log('[Service Worker] Push Received.');
    // console.log(`[Service Worker] Push had this data: "${evt && evt.data && evt.data.text()}"`);
    console.log(`[Service Worker] Push had this data: "${evt && evt.data}"`);

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
      'actions': [
        { "action": "yes", "title": "I ♥ this app!"},
        { "action": "no", "title": "I don\'t like this app"}
      ]
    };

    evt.waitUntil(self.registration.showNotification(title, options));
  });

  /*
  // The code below looks for the first window with 'visibilityState' set to
  // 'visible'. If one is found it navigates that client to the correct URL and
  // focuses the window. If a window that suits our needs is not found, it
  // opens a new window.
  // Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
  self.addEventListener('notificationclick', function(e) {
    clients.matchAll().then(function(clis) {
      var client = clis.find(function(c) {
        c.visibilityState === 'visible';
      });
      if (client !== undefined) {
        client.navigate('some_url');
        client.focus();
      } else {
        // there are no visible windows. Open one.
        clients.openWindow('some_url');
        notification.close();
      }
    });
  });
  */

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

    // close all (other) notifications
    // Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
    self.registration.getNotifications().then(function(notifications) {
      notifications.forEach(function(notification) {
        notification.close();
      });
    });
  });
})(this);
