import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
class MessageProps extends React.PureComponent {
  state = {
    errorMsg: '',
    successMsg: '',
  }

  setErrorMessage = (msg) => {
    this.setState({ errorMsg: msg });
  }

  setSuccessMessage = (msg) => {
    this.setState({ successMsg: msg });
  }

  clearMessages = () => {
    this.setState({ errorMsg: '', successMsg: '' });
  }

  render() {
    const { errorMsg, successMsg } = this.state;

    const ui = {
      errorMsg,
      successMsg,
      setErrorMessage: this.setErrorMessage,
      setSuccessMessage: this.setSuccessMessage,
      clearMessages: this.clearMessages,
    };

    return this.props.children(ui);
  }
}

export default MessageProps;

//------------------------------------------------------------------------------
// PROPS:
//------------------------------------------------------------------------------
export const messagePropTypes = {
  errorMsg: PropTypes.string.isRequired,
  successMsg: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
};
