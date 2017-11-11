import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../error-boundary.jsx';
import PasswordAuthForm from './password-auth-form.jsx';
import FBAuthBtn from './fb-auth-btn.jsx';

//------------------------------------------------------------------------------
// AUX COMPONENT:
//------------------------------------------------------------------------------
const Divider = () => (
  <div className="full-width center p2">
    - OR -
  </div>
);

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AuthUI extends Component {
  constructor(props) {
    super(props);
    this.state = { view: 'login' };
    this.handlePasswordFormViewChange = this.handlePasswordFormViewChange.bind(this);
  }

  handlePasswordFormViewChange(view) {
    this.setState({ view });
  }

  render() {
    const { view } = this.state;

    return (
      <div className="full-width">
        <ErrorBoundary>
          <PasswordAuthForm
            view={view}
            onViewChange={this.handlePasswordFormViewChange}
            {...this.props}
          />
        </ErrorBoundary>
        {['login', 'signup'].indexOf(view) !== -1 && (
          <div className="full-width">
            <Divider key="divider" />
            <ErrorBoundary>
              <FBAuthBtn
                key="fb-btn"
                btnText="Continue with facebook"
                {...this.props}
              />
            </ErrorBoundary>
          </div>
        )}
      </div>
    );
  }
}

// All props are passed down to child components
AuthUI.propTypes = {
  disabled: PropTypes.bool, // eslint-disable-line
  onBeforeHook: PropTypes.func, // eslint-disable-line
  onClientErrorHook: PropTypes.func, // eslint-disable-line
  onServerErrorHook: PropTypes.func, // eslint-disable-line
  onSignupSucessHook: PropTypes.func, // eslint-disable-line
  onLoginSucessHook: PropTypes.func, // eslint-disable-line
  onSendResetPasswordEmailSucessHook: PropTypes.func, // eslint-disable-line
};

AuthUI.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSignupSucessHook: () => {},
  onLoginSucessHook: () => {},
  onSendResetPasswordEmailSucessHook: () => {},
};

export default AuthUI;
