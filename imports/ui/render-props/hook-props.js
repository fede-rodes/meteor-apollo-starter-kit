import React from 'react';
import PropTypes from 'prop-types';
import { disabledPropTypes, messagePropTypes } from './index';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
class HookProps extends React.PureComponent {
  handleBefore = (cb) => {
    this.props.disabledProps.disableBtn();
    this.props.messageProps.clearMessages();
    // Allow other components to extend handleBefore default functionality
    if (cb) { cb(); }
  }

  handleClientError = (err) => { // eslint-disable-line no-unused-vars
    // console.log(err);
    this.props.disabledProps.enableBtn();
  }

  handleServerError = (err) => {
    // console.log(err);
    this.props.messageProps.setErrorMessage(err.reason || err.message || 'Unexpected error');
    this.props.disabledProps.enableBtn();
  }

  handleSuccess = (cb) => {
    this.props.disabledProps.enableBtn();
    this.props.messageProps.clearMessages();
    // Allow other components to extend handleSuccess default functionality
    if (cb) { cb(); }
  }

  render() {
    const api = {
      handleBefore: this.handleBefore,
      handleClientError: this.handleClientError,
      handleServerError: this.handleServerError,
      handleSuccess: this.handleSuccess,
    };

    return this.props.children(api);
  }
}

HookProps.propTypes = {
  disabledProps: PropTypes.shape(disabledPropTypes).isRequired,
  messageProps: PropTypes.shape(messagePropTypes).isRequired,
};

export default HookProps;

//------------------------------------------------------------------------------
// PROPS:
//------------------------------------------------------------------------------
export const hookPropTypes = {
  handleBefore: PropTypes.func.isRequired,
  handleClientError: PropTypes.func.isRequired,
  handleServerError: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
