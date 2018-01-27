import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  servicePropTypes,
  disabledPropTypes,
  messagePropTypes,
} from './index';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
class SubmitProps extends React.PureComponent {
  changeViewTo = to => (
    (evt) => {
      evt.preventDefault();
      this.props.messageProps.clearMessages();
      this.props.history.push(to);
    }
  )

  handleBefore = (obj) => {
    this.props.disabledProps.disableBtn();
    this.props.messageProps.clearMessages();
    if (obj && obj.service) {
      this.props.serviceProps.setService(obj.service);
    }
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
    // Allow other methods to extend handleSuccess functionality.
    if (cb) { cb(); }
  }

  render() {
    const ui = {
      changeViewTo: this.changeViewTo,
      handleBefore: this.handleBefore,
      handleClientError: this.handleClientError,
      handleServerError: this.handleServerError,
      handleSuccess: this.handleSuccess,
    };

    return this.props.children(ui);
  }
}

SubmitProps.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  serviceProps: PropTypes.shape(servicePropTypes).isRequired,
  disabledProps: PropTypes.shape(disabledPropTypes).isRequired,
  messageProps: PropTypes.shape(messagePropTypes).isRequired,
};

export default withRouter(SubmitProps);

//------------------------------------------------------------------------------
// PROPS:
//------------------------------------------------------------------------------
export const authPagePropTypes = {
  changeViewTo: PropTypes.func.isRequired,
  handleBefore: PropTypes.func.isRequired,
  handleClientError: PropTypes.func.isRequired,
  handleServerError: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
