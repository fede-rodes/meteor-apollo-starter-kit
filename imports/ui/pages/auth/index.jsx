import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import DefaultLayout from '../../layouts/default/index.jsx';
import PasswordAuthForm from '../../components/password-auth/password-auth-form.jsx';
import FBAuthBtn from '../../components/fb-auth-btn.jsx';
import Divider from '../../components/divider/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AuthPage extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handlePasswordFormViewChange = this.handlePasswordFormViewChange.bind(this);
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleClientError = this.handleClientError.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
    // this.handleSignupSucess = this.handleSignupSucess.bind(this);
    // this.handleLoginSucess = this.handleLoginSucess.bind(this);
    // this.handleAfterSuccessAuth = this.handleAfterSuccessAuth.bind(this);
    this.state = {
      view: 'login',
      disabled: false,
    };
  }

  handlePasswordFormViewChange(view) {
    this.setState({ view });
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

  handleSucess() {
    // OBSERVATION: when useing FB service, this code is only reachable when
    // using loginStyle equals 'popup' at serviceConfiguration. In case
    // loginStyle equals 'redirect' we'll need to get (TODO) the user tokens
    // from the cookie since we wont be able to call resetStore.
    const { history, client } = this.props;
    client.resetStore();
    this.enableBtn();
    history.push('/');
  }

  /* handleAfterSuccessAuth() {
    const { history, client } = this.props;
    client.resetStore();
    this.enableBtn();
    history.push('/');
  }

  handleSignupSucess() {
    const { mutate } = this.props;
    mutate({}).then(this.handleAfterSuccessAuth);
  }

  handleLoginSucess() {
    // OBSERVATION: when useing FB service, this code is only reachable when
    // using loginStyle equals 'popup' at serviceConfiguration. In case
    // loginStyle equals 'redirect' we'll need to get (TODO) the user tokens
    // from the cookie since we wont be able to call resetStore.
    this.handleAfterSuccessAuth();
  } */

  render() {
    const { view, disabled } = this.state;

    return (
      <DefaultLayout>
        <PasswordAuthForm
          view={view}
          disabled={disabled}
          onViewChange={this.handlePasswordFormViewChange}
          onBeforeHook={this.handleBefore}
          onClientErrorHook={this.handleClientError}
          onServerErrorHook={this.handleServerError}
          onSucessHook={this.handleSucess}
          // onSignupSucessHook={this.handleSignupSucess}
          // onLoginSucessHook={this.handleLoginSucess}
        />
        {['login', 'signup'].indexOf(view) !== -1 && (
          <div className="full-width">
            <Divider text="OR" />
            <FBAuthBtn
              btnText="Continue with facebook"
              disabled={disabled}
              onBeforeHook={this.handleBefore}
              onServerErrorHook={this.handleServerError}
              onSucessHook={this.handleSucess}
            />
          </div>
        )}
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
