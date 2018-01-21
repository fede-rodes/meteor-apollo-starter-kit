import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Constants from '../../api/constants';

//------------------------------------------------------------------------------
// HOC:
//------------------------------------------------------------------------------
// Higher Order Component (HOC) providing common state fields and methods used
// accross all auth pages.
const hoc = (WrappedComponent) => {
  class AuthPageState extends React.PureComponent {
    static propTypes = {
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }

    state = {
      service: '', // auth service type: 'password' or 'facebook'.
      errorMsg: '',
      successMsg: '',
      disabled: false,
    }

    setSuccessMessage = (msg) => {
      this.setState({ successMsg: msg });
    }

    clearMessages = () => {
      this.setState({ errorMsg: '', successMsg: '' });
    }

    disableBtn = () => {
      this.setState({ disabled: true });
    }

    enableBtn = () => {
      this.setState({ disabled: false });
    }

    changeViewTo = to => (
      (evt) => {
        evt.preventDefault();
        this.clearMessages();
        this.props.history.push(to);
      }
    )

    handleBefore = (obj) => {
      this.disableBtn();
      this.clearMessages();
      if (obj && obj.service) {
        this.setState({ service: obj.service });
      }
    }

    handleClientError = (err) => {
      // console.log(err);
      this.enableBtn();
    }

    handleServerError = (err) => {
      console.log(err);
      this.setState({ errorMsg: err.reason || err.message || 'Unexpected error' });
      this.enableBtn();
    }

    handleSuccess = (cb) => {
      this.enableBtn();
      this.clearMessages();
      // Allow other methods to extend handleSuccess functionality.
      if (cb) { cb(); }
    }

    render() {
      const { service, errorMsg, successMsg, disabled } = this.state;

      const newProps = {
        authPage: {
          service,
          errorMsg,
          successMsg,
          disabled,
          setSuccessMessage: this.setSuccessMessage,
          changeViewTo: this.changeViewTo,
          handleBefore: this.handleBefore,
          handleClientError: this.handleClientError,
          handleServerError: this.handleServerError,
          handleSuccess: this.handleSuccess,
        },
      };

      return <WrappedComponent {...this.props} {...newProps} />;
    }
  }

  // withRouter provides access to history.push().
  return withRouter(AuthPageState);
};

export default hoc;

//------------------------------------------------------------------------------
// HOC PROPS:
//------------------------------------------------------------------------------
export const authPageProps = PropTypes.shape({
  service: PropTypes.oneOf([...Constants.AUTH_SERVICES, '']).isRequired,
  errorMsg: PropTypes.string.isRequired,
  successMsg: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  changeViewTo: PropTypes.func.isRequired,
  handleBefore: PropTypes.func.isRequired,
  handleClientError: PropTypes.func.isRequired,
  handleServerError: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
});
