import React from 'react';
import PropTypes from 'prop-types';
import SubscribeBtn from './subscribe-btn';
import UnsubscribeBtn from './unsubscribe-btn';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// Source: https://github.com/GoogleChrome/samples/blob/gh-pages/push-messaging-and-notifications/main.js
class SubscribeBtns extends React.PureComponent {
  state = {
    showBtns: false, // show / hide subscribe-unsubscribe buttons
    subscribed: false, // whether or not the user is subscribe to push notifications
  }

  async componentDidMount() {
    // Check that service workers are supported, if so, progressively
    // enhance and add push messaging support, otherwise continue without it
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.ready;
        // Once the service worker is registered set the initial button state
        this.initialiseState();
      } catch (exc) {
        console.log(exc);
      }
    } else {
      console.log('Service workers aren\'t supported in this browser.');
    }
  }

  initialiseState = async () => {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      console.log('Notifications aren\'t supported.');
      return;
    }

    // Check the current Notification permission. If its denied, it's a
    // permanent block until the user changes the permission
    if (Notification.permission === 'denied') {
      console.log('The user has blocked notifications.');
      return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
      console.log('Push messaging isn\'t supported.');
      return;
    }

    try {
      // We need the service worker registration to check for a subscription
      const registration = await navigator.serviceWorker.ready;

      // Do we already have a push message subscription?
      const subscription = await registration.pushManager.getSubscription();

      // Enable any UI which subscribes / unsubscribes from push messages
      this.setState(() => ({ showBtns: true }));

      if (!subscription) {
        // We aren’t subscribed to push, so set UI to allow the user to enable
        // push
        return;
      }

      // Set your UI to show they have subscribed for push messages
      this.setState(() => ({ subscribed: true }));
    } catch (exc) {
      console.log('Error during getSubscription()', exc);
    }
  }

  handleSuccess = ({ subscribed }) => {
    this.setState(() => ({ subscribed }));
    this.props.onSuccessHook();
  }

  render() {
    const { disabled, onBeforeHook, onServerErrorHook } = this.props;
    const { showBtns, subscribed } = this.state;

    if (!showBtns) {
      return null;
    }

    return subscribed ? (
      <UnsubscribeBtn
        disabled={disabled}
        onBeforeHook={onBeforeHook}
        onServerErrorHook={onServerErrorHook}
        onSuccessHook={() => this.handleSuccess({ subscribed: false })}
      />
    ) : (
      <SubscribeBtn
        disabled={disabled}
        onBeforeHook={onBeforeHook}
        onServerErrorHook={onServerErrorHook}
        onSuccessHook={() => this.handleSuccess({ subscribed: true })}
      />
    );
  }
}

SubscribeBtns.propTypes = {
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

SubscribeBtns.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default SubscribeBtns;


/*
import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import saveSubscriptionMutation from './mutations-save-subscription.graphql';
import deleteSubscriptionMutation from './mutations-delete-subscription.graphql';
import Button from '../../../dumb/button';

const { publicKey: vapidPublicKey } = Meteor.settings.public.vapid;

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
// Source: https://www.npmjs.com/package/web-push
// When using your VAPID key in your web app, you'll need to convert the URL
// safe base64 string to a Uint8Array to pass into the subscribe call, which you
// can do like so:
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// Source: https://github.com/GoogleChrome/samples/blob/gh-pages/push-messaging-and-notifications/main.js
class SubscribeBtn extends React.PureComponent {
  state = {
    subscribed: false,
    disabled: true,
  }

  async componentDidMount() {
    // Check that service workers are supported, if so, progressively
    // enhance and add push messaging support, otherwise continue without it
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.ready;
        // Once the service worker is registered set the initial button state
        this.initialiseState();
      } catch (exc) {
        console.log(exc);
      }
    } else {
      console.log('Service workers aren\'t supported in this browser.');
    }
  }

  // Save subscription into user's document (server side)
  saveSubscription = async (subscription) => {
    console.log(subscription);
    const { saveSubscription } = this.props;

    // Parse subscription + encode the public key and the shared secret (which are
    // in bytes) into base64 format to transmit over HTTP.
    const parsedSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))),
        auth: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
      },
    };

    const variables = { subscription: parsedSubscription };

    try {
      await saveSubscription({ variables });
      // onSuccessHook();
      console.log('success');
    } catch (exc) {
      console.log(exc);
      // onServerErrorHook(exc);
    }
  }

  // Delete subscription from user's document (server side)
  deleteSubscription = async (subscription) => {
    const { deleteSubscription } = this.props;

    // Get subscription's enpoint to be able to find the subscription server
    // side
    const { endpoint } = subscription;

    const variables = { endpoint };

    try {
      await deleteSubscription({ variables });
      // onSuccessHook();
      console.log('success');
    } catch (exc) {
      console.log(exc);
      // onServerErrorHook(exc);
    }
  }

  initialiseState = async () => {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      console.log('Notifications aren\'t supported.');
      return;
    }

    // Check the current Notification permission. If its denied, it's a
    // permanent block until the user changes the permission
    if (Notification.permission === 'denied') {
      console.log('The user has blocked notifications.');
      return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
      console.log('Push messaging isn\'t supported.');
      return;
    }

    try {
      // We need the service worker registration to check for a subscription
      const registration = await navigator.serviceWorker.ready;

      // Do we already have a push message subscription?
      const subscription = await registration.pushManager.getSubscription();

      // Enable any UI which subscribes / unsubscribes from push messages
      this.setState(() => ({ disabled: false }));

      if (!subscription) {
        // We aren’t subscribed to push, so set UI to allow the user to enable
        // push
        return;
      }

      // Keep your server in sync with the latest subscription
      this.saveSubscription(subscription);

      // Set your UI to show they have subscribed for push messages
      this.setState(() => ({ subscribed: true }));
    } catch (exc) {
      console.log('Error during getSubscription()', exc);
    }
  }

  unsubscribe = async () => {
    // Disable the button so it can't be changed while we process the permission
    // request
    this.setState(() => ({ disabled: true }));

    try {
      // We need the service worker registration to check for a subscription
      const registration = await navigator.serviceWorker.ready;

      // To unsubscribe from push messaging, you need get the subcription
      // object, which you can call unsubscribe() on
      const subscription = await registration.pushManager.getSubscription();

      // Check we have a subscription to unsubscribe
      if (!subscription) {
        // No subscription object, so set the state to allow the user to
        // subscribe to push
        this.setState(() => ({ subscribed: false }));
        return;
      }

      // QUESTION: should we make a request to your server to remove all user
      // subscriptions from our data store so we don't attempt to send them push
      // messages anymore

      // We have a subcription, so call unsubscribe on it
      await subscription.unsubscribe();

      // Delete subscription from user's record
      this.deleteSubscription(subscription);

      // Update button state
      this.setState(() => ({ subscribed: false }));
    } catch (exc) {
      // We failed to unsubscribe, this can lead to an unusual state, so may be
      // best to remove the subscription from your data store and inform the
      // user that you disabled push
      console.log('Error thrown while unsubscribing from push messaging.', exc);
    }

    // Re-enable subscribe/unsubscribe button
    this.setState(() => ({ disabled: false }));
  }

  subscribe = async () => {
    // Disable the button so it can't be changed while we process the permission
    // request
    this.setState(() => ({ disabled: true }));

    try {
      // We need the service worker registration to create the subscription
      const registration = await navigator.serviceWorker.ready;

      // Register subscription
      const config = {
        userVisibleOnly: true, // always show notification when received
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      };
      const subscription = await registration.pushManager.subscribe(config);

      // Send the subscription to your server and save it to send a push message
      // at a later date
      this.saveSubscription(subscription);

      // The subscription was successful
      this.setState(() => ({ subscribed: true }));
    } catch (exc) {
      if (Notification.permission === 'denied') {
        // The user denied the notification permission which means we failed to
        // subscribe and the user will need to manually change the notification
        // permission to subscribe to push messages
        console.log('Permission for Notifications was denied');
      } else {
        // A problem occurred with the subscription, this can often be down to
        // an issue or lack of the gcm_sender_id and / or gcm_user_visible_only
        console.log('Unable to subscribe to push.', exc);
      }
    }

    // Re-enable subscribe/unsubscribe button
    this.setState(() => ({ disabled: false }));
  }

  handleClick = () => {
    const { subscribed } = this.state;

    if (subscribed) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  }

  render() {
    const { subscribed, disabled } = this.state;

    return (
      <Button
        disabled={disabled}
        onClick={this.handleClick}
      >
        {subscribed ? 'Disable Push Messages' : 'Enable Push Messages'}
      </Button>
    );
  }
}

SubscribeBtn.propTypes = {
  // btnLabel: PropTypes.string,
  /* disabled: PropTypes.bool,
  sendPushNotification: PropTypes.func.isRequired,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func, ///
  saveSubscription: PropTypes.func.isRequired,
  deleteSubscription: PropTypes.func.isRequired,
};

SubscribeBtn.defaultProps = {
  // btnLabel: 'Enable Push Messages',
  /* disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {}, ///
};

const enhance = compose(
  graphql(saveSubscriptionMutation, { name: 'saveSubscription' }),
  graphql(deleteSubscriptionMutation, { name: 'deleteSubscription' }),
);

export default enhance(SubscribeBtn);
*/
