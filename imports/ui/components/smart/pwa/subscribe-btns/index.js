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
