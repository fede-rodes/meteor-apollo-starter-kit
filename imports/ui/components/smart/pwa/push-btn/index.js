import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import sendPushNotificationMutation from './mutations.graphql';
import Button from '../../../dumb/button';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class PushBtn extends React.PureComponent {
  handleClick = async () => {
    const {
      sendPushNotification,
      onBeforeHook,
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    try {
      await sendPushNotification();
      onSuccessHook();
    } catch (exc) {
      onServerErrorHook(exc);
    }
  }

  render() {
    const { btnLabel, disabled } = this.props;

    return (
      <Button
        disabled={disabled}
        onClick={this.handleClick}
      >
        {btnLabel}
      </Button>
    );
  }
}

PushBtn.propTypes = {
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  sendPushNotification: PropTypes.func.isRequired,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

PushBtn.defaultProps = {
  btnLabel: 'Send Push Notification',
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

// Apollo integration
const withMutation = graphql(sendPushNotificationMutation, { name: 'sendPushNotification' });

export default withMutation(PushBtn);
