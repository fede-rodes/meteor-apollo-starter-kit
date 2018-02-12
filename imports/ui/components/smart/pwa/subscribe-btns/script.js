/* eslint-disable */
import { Meteor } from 'meteor/meteor'

// Source: https://github.com/GoogleChrome/samples/blob/gh-pages/push-messaging-and-notifications/main.js
// Learn more at https://www.chromestatus.com/feature/5416033485586432 and https://www.chromestatus.com/feature/5480344312610816
//
// To use this sample please do the following:
//
// 1. Create a project on the Firebase Developer Console.
// 2. Go to Settings (the cog near the top left corner), click the 'Cloud Messaging Tab'.
// 3. Create a copy of config.sample.js called config.js.
// 4. Create a copy of manifest.sample.json called manifest.json.
// 5. Replace <Your Cloud Messaging API Key ...> in your new config.js file with your own API key from your new project on Firebase Developer Console.
// 6. Replace <Your Cloud Sender ID ...> in your new manifest.json with your own sender ID from the Firebase Developer Console project.

// var API_SERVER_PUBLIC_KEY = 'BCqFF7nErtFnD8gyvaEtAjzg8w7Q9tZ0psOIochoiAhrqbz-KMZViBOmOl7piCXLcI6tXFjaj742fcAz9Li9_7Y'; // from https://web-push-codelab.glitch.me/
// var GCM_ENDPOINT = 'https://fcm.googleapis.com/fcm/send'; // 'https://android.googleapis.com/gcm/send';

// var curlCommandDiv = document.querySelector('.js-curl-command');
var isPushEnabled = false;

// When using your VAPID key in your web app, you'll need to convert the URL
// safe base64 string to a Uint8Array to pass into the subscribe call, which you
// can do like so:
// Source: https://www.npmjs.com/package/web-push
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/* function parseSubscription(subscription) {
  // var subscriptionId = subscription.endpoint.split('/').pop();
  /* console.log(
    // '\nsubscriptionId', subscriptionId,
    '\nsubscription', subscription,
    '\nJSON.stringify(subscription)', JSON.stringify(subscription),
    '\nJSON.parse(JSON.stringify(subscription))', JSON.parse(JSON.stringify(subscription)),
  );
  // return subscriptionId;
  return JSON.parse(JSON.stringify(subscription)); //
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.getKey('p256dh'),
      auth: subscription.getKey('auth'),
    },
  };
} */

function saveSubscription(subscription) {
  // var subscriptionId = subscription.endpoint.split('gcm/send/')[1];
  // var subs = parseSubscription(subscription);
  // console.log("Save subscription ID", subscriptionId);
  // console.log("Save subscription", subs);
  // Parse subscription + encode the public key and the shared secret (which are
  // in bytes) into base64 format to transmit over HTTP.
  const parsedSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))),
      auth: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
    },
  };
  console.log("Save subscription", parsedSubscription);

  Meteor.call('User.methods.saveSubscription', parsedSubscription, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('subscription saved successfully');
    }
  });
  /* fetch('http://localhost:3333/api/users', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id : subscriptionId })
  }); */
}
function deleteSubscription(subscription) {
  // var subscriptionId = subscription.endpoint.split('gcm/send/')[1];
  // const subs = parseSubscription(subscription);
  // console.log("Delete subscription ID", subscriptionId);
  // console.log("Delete subscription", subs);
  // Parse subscription
  const { endpoint } = subscription;
  console.log("Delete subscription", endpoint);

  Meteor.call('User.methods.deleteSubscription', { endpoint }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('subscription deleted successfully');
    }
  });
  /* fetch('http://localhost:3333/api/user/' + subscriptionId, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }); */
}

// This method handles the removal of subscriptionId
// in Chrome 44 by concatenating the subscription Id
// to the subscription endpoint
/* function endpointWorkaround(pushSubscription) {
  // Make sure we only mess with GCM
  if (pushSubscription.endpoint.indexOf('https://fcm.googleapis.com/fcm/send') !== 0) {
    return pushSubscription.endpoint;
  }

  var mergedEndpoint = pushSubscription.endpoint;
  // Chrome 42 + 43 will not have the subscriptionId attached
  // to the endpoint.
  if (pushSubscription.subscriptionId &&
    pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
    // Handle version 42 where you have separate subId and Endpoint
    mergedEndpoint = pushSubscription.endpoint + '/' +
      pushSubscription.subscriptionId;
  }
  return mergedEndpoint;
} */

/* function sendSubscriptionToServer(subscription) {
  // TODO: Send the subscription.endpoint
  // to your server and save it to send a
  // push message at a later date
  //
  // For compatibly of Chrome 43, get the endpoint via
  // endpointWorkaround(subscription)
  console.log('TODO: Implement sendSubscriptionToServer()');

  var mergedEndpoint = endpointWorkaround(subscription);

  // This is just for demo purposes / an easy to test by
  // generating the appropriate cURL command
  showCurlCommand(mergedEndpoint);
} */

// NOTE: This code is only suitable for GCM endpoints,
// When another browser has a working version, alter
// this to send a PUSH request directly to the endpoint
/* function showCurlCommand(mergedEndpoint) {
  // The curl command to trigger a push message straight from GCM
  if (mergedEndpoint.indexOf(GCM_ENDPOINT) !== 0) {
    console.log('This browser isn\'t currently supported for this demo');
    return;
  }

  var endpointSections = mergedEndpoint.split('/');
  var subscriptionId = endpointSections[endpointSections.length - 1];

  var curlCommand = 'curl --header "Authorization: key=' + API_SERVER_PUBLIC_KEY +
    '" --header Content-Type:"application/json" ' + GCM_ENDPOINT +
    ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';

  curlCommandDiv.textContent = curlCommand;
} */

function unsubscribe() {
  var pushButton = document.querySelector('.js-push-button');
  pushButton.disabled = true;
  // curlCommandDiv.textContent = '';

  navigator.serviceWorker.ready
    .then(function(serviceWorkerRegistration) {
      // To unsubscribe from push messaging, you need get the
      // subcription object, which you can call unsubscribe() on.
      serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(pushSubscription) {
          // Check we have a subscription to unsubscribe
          if (!pushSubscription) {
            // No subscription object, so set the state
            // to allow the user to subscribe to push
            isPushEnabled = false;
            pushButton.disabled = false;
            pushButton.textContent = 'Enable Push Messages';
            return;
          }

          // TODO: Make a request to your server to remove
          // the users data from your data store so you
          // don't attempt to send them push messages anymore

          // We have a subcription, so call unsubscribe on it
          pushSubscription.unsubscribe()
            .then(function() {
              deleteSubscription(pushSubscription);
              pushButton.disabled = false;
              pushButton.textContent = 'Enable Push Messages';
              isPushEnabled = false;
            }).catch(function(e) {
              // We failed to unsubscribe, this can lead to
              // an unusual state, so may be best to remove
              // the subscription id from your data store and
              // inform the user that you disabled push

              console.log('Unsubscription error: ', e);
              pushButton.disabled = false;
            });
        }).catch(function(e) {
          console.log('Error thrown while unsubscribing from push messaging.', e);
        });
    });
}

function subscribe() {
  const { publicKey: vapidPublicKey } = Meteor.settings.public.vapid;

  // Disable the button so it can't be changed while
  // we process the permission request
  var pushButton = document.querySelector('.js-push-button');
  pushButton.disabled = true;

  navigator.serviceWorker.ready
    .then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true, // always show notification when received
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      })
        .then(function(subscription) {
          // The subscription was successful
          isPushEnabled = true;
          pushButton.textContent = 'Disable Push Messages';
          pushButton.disabled = false;

          // TODO: Send the subscription subscription.endpoint
          // to your server and save it to send a push message
          // at a later date
          /* var clientId = subscription.endpoint.split('/').pop();
          console.log(
            'clientId', clientId,
            'JSON.stringify(subscription)', JSON.stringify(subscription),
          ); */
          saveSubscription(subscription);
          // return sendSubscriptionToServer(subscription);
        })
        .catch(function(e) {
          if (Notification.permission === 'denied') {
            // The user denied the notification permission which
            // means we failed to subscribe and the user will need
            // to manually change the notification permission to
            // subscribe to push messages
            console.log('Permission for Notifications was denied');
            pushButton.disabled = true;
          } else {
            // A problem occurred with the subscription, this can
            // often be down to an issue or lack of the gcm_sender_id
            // and / or gcm_user_visible_only
            console.log('Unable to subscribe to push.', e);
            pushButton.disabled = false;
            pushButton.textContent = 'Enable Push Messages';
          }
        });
  });
}

// Once the service worker is registered set the initial state
function initialiseState() {
  // Are Notifications supported in the service worker?
  if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
    console.log('Notifications aren\'t supported.');
    return;
  }

  // Check the current Notification permission.
  // If its denied, it's a permanent block until the
  // user changes the permission
  if (Notification.permission === 'denied') {
    console.log('The user has blocked notifications.');
    return;
  }

  // Check if push messaging is supported
  if (!('PushManager' in window)) {
    console.log('Push messaging isn\'t supported.');
    return;
  }

  // We need the service worker registration to check for a subscription
  navigator.serviceWorker.ready
    .then(function(serviceWorkerRegistration) {
      // Do we already have a push message subscription?
      serviceWorkerRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          // Enable any UI which subscribes / unsubscribes from
          // push messages.
          var pushButton = document.querySelector('.js-push-button');
          pushButton.disabled = false;

          console.log('subscription exist?', subscription);

          if (!subscription) {
            // We aren’t subscribed to push, so set UI
            // to allow the user to enable push
            return;
          }

          // Keep your server in sync with the latest subscription
          // sendSubscriptionToServer(subscription);
          // saveSubscriptionID(subscription);

          // Set your UI to show they have subscribed for
          // push messages
          pushButton.textContent = 'Disable Push Messages';
          isPushEnabled = true;
        })
        .catch(function(err) {
          console.log('Error during getSubscription()', err);
        });
    });
}

// window.addEventListener('load', function() {
var pushButton = document.querySelector('.js-push-button');
pushButton.addEventListener('click', function() {
  if (isPushEnabled) {
    unsubscribe();
  } else {
    subscribe();
  }
});

// Check that service workers are supported, if so, progressively
// enhance and add push messaging support, otherwise continue without it.
if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register('./service-worker.js')
  navigator.serviceWorker.ready
    .then(initialiseState);
} else {
  window.debug.log('Service workers aren\'t supported in this browser.');
}
// });
