import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
class PWABtnProps extends React.PureComponent {
  state = {
    supported: 'loading', // whether or not push notifications are supported
    subscribed: 'loading', // whether or not the user is subscribe to push notifications
  }

  async componentDidMount() {
    // Check that service workers are supported, if so, progressively enhance
    // and add push messaging support, otherwise continue without it
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.ready;
        // Once the service worker is registered set the initial button state
        this.initialiseState();
      } catch (exc) {
        console.log(exc);
      }
    } else {
      this.setSupported(false);
      this.setSubscribed(false);
      console.log('Service workers aren\'t supported in this browser.');
    }
  }

  setSupported = (supported) => {
    this.setState(() => ({ supported }));
  }

  setSubscribed = (subscribed) => {
    this.setState(() => ({ subscribed }));
  }

  initialiseState = async () => {
    // Are notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      console.log('Notifications aren\'t supported.');
      this.setSupported(false);
      this.setSubscribed(false);
      return;
    }

    // Check the current notification permission. If its denied, it's a
    // permanent block until the user changes the permission
    if (Notification.permission === 'denied') {
      console.log('The user has blocked notifications.');
      this.setSupported(false);
      this.setSubscribed(false);
      return;
    }

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
      console.log('Push messaging isn\'t supported.');
      this.setSupported(false);
      this.setSubscribed(false);
      return;
    }

    try {
      // We need the service worker registration to check for a subscription
      const registration = await navigator.serviceWorker.ready;

      // Do we already have a push message subscription?
      const subscription = await registration.pushManager.getSubscription();

      // Enable any UI which subscribes / unsubscribes from push messages
      this.setSupported(true);

      if (!subscription) {
        // We aren’t subscribed to push, so set UI to allow the user to enable
        // push
        this.setSubscribed(false);
        return;
      }

      // Set your UI to show they have subscribed for push messages
      this.setSubscribed(true);
    } catch (exc) {
      console.log('Error during getSubscription()', exc);
    }
  }

  handleSubscriptionChange = ({ subscribed }) => {
    this.setSubscribed(subscribed);
  }

  render() {
    const { supported, subscribed } = this.state;

    const api = {
      supported,
      subscribed,
      handleSubscriptionChange: this.handleSubscriptionChange,
    };

    return this.props.children(api);
  }
}

export default PWABtnProps;

//------------------------------------------------------------------------------
// PROPS:
//------------------------------------------------------------------------------
export const pwaBtnPropTypes = {
  supported: PropTypes.oneOf([true, false, 'loading']).isRequired,
  subscribed: PropTypes.oneOf([true, false, 'loading']).isRequired,
  handleSubscriptionChange: PropTypes.func.isRequired,
};
