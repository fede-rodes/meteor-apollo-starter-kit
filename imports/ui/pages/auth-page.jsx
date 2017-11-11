import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import DefaultLayout from '../layouts/default/index.jsx';
import { AuthUI } from '../components/auth/index.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AuthPage extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.state = { disabled: false };
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSignupLoginSucess = this.handleSignupLoginSucess.bind(this);
    this.handleSendResetPasswordEmailSucessHook = this.handleSendResetPasswordEmailSucessHook.bind(this);
  }

  enableBtn() {
    this.setState({ disabled: false });
  }

  disableBtn() {
    this.setState({ disabled: true });
  }

  handleBefore() {
    // OBSERVATION: this hook allows you to trigger some action
    // before the login request is sent or simply interrupt the
    // login flow by throwing an error.
    this.disableBtn();
  }

  handleError(err) {
    console.log(err);
    this.enableBtn();
  }

  handleSignupLoginSucess() {
    // OBSERVATION: when using FB service, this code is only reachable when
    // using loginStyle equals 'popup' at serviceConfiguration. In case
    // loginStyle equals 'redirect' we'll need to get (TODO) the user tokens
    // from the cookie since we wont be able to call resetStore.
    const { history, client } = this.props;
    client.resetStore();
    this.enableBtn();
    history.push('/');
  }

  handleSendResetPasswordEmailSucessHook() {
    this.enableBtn();
  }

  render() {
    const { disabled } = this.state;

    return (
      <DefaultLayout>
        <AuthUI
          disabled={disabled}
          onBeforeHook={this.handleBefore}
          onClientErrorHook={this.handleError}
          onServerErrorHook={this.handleError}
          onSignupSucessHook={this.handleSignupLoginSucess}
          onLoginSucessHook={this.handleSignupLoginSucess}
          onSendResetPasswordEmailSucessHook={this.handleSendResetPasswordEmailSucessHook}
        />
      </DefaultLayout>
    );
  }
}

AuthPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

const enhance = compose(
  withRouter, // To have access to history.push
  withApollo, // To have access to client.resetStore()
);

export default enhance(AuthPage);

/*
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import DefaultLayout from '../layouts/default/index.jsx';
import { AuthUI } from '../components/auth/index.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AuthPage extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.state = { disabled: false };
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleClientError = this.handleClientError.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.handleSignupLoginSucess = this.handleSignupLoginSucess.bind(this);
    this.handleSendResetPasswordEmailSucess = this.handleSendResetPasswordEmailSucess.bind(this);
  }

  enableBtn() {
    this.setState({ disabled: false });
  }

  disableBtn() {
    this.setState({ disabled: true });
  }

  handleBefore() {
    // OBSERVATION: this hook allows you to trigger some action
    // before the login request is sent or simply interrupt the
    // login flow by throwing an error.
    this.disableBtn();
  }

  handleClientError(err) {
    console.log(err);
    this.enableBtn();
  }

  handleServerError(err) {
    console.log(err);
    this.enableBtn();
  }

  handleSignupLoginSucess() {
    // OBSERVATION: when using FB service, this code is only reachable when
    // using loginStyle equals 'popup' at serviceConfiguration. In case
    // loginStyle equals 'redirect' we'll need to get (TODO) the user tokens
    // from the cookie since we wont be able to call resetStore.
    const { history, client } = this.props;
    client.resetStore();
    this.enableBtn();
    history.push('/');
  }

  render() {
    const { disabled } = this.state;

    return (
      <DefaultLayout>
        <AuthUI
          disabled={disabled}
          onBeforeHook={this.handleBefore}
          onClientErrorHook={this.handleClientError}
          onServerErrorHook={this.handleServerError}
          onSignupSucessHook={this.handleSignupLoginSucess}
          onLoginSucessHook={this.handleSignupLoginSucess}
          onSendResetPasswordEmailSucessHook={this.handleSendResetPasswordEmailSucess}
        />
      </DefaultLayout>
    );
  }
}

AuthPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

const enhance = compose(
  withRouter, // To have access to history.push
  withApollo, // To have access to client.resetStore()
);

export default enhance(AuthPage);
*/
