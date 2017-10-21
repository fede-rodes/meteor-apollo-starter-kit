import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import DefaultLayout from '../../layouts/default/index.jsx';
import { SignupForm } from '../../components/password-auth-form/index.jsx';
import FBAuthBtn from '../../components/fb-auth-btn.jsx';
import Divider from '../../components/divider/index.jsx';

//------------------------------------------------------------------------------
// PAGE COMPONENT DEFINITION:
//------------------------------------------------------------------------------
class SignupPage extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleOnBeforeHook = this.handleOnBeforeHook.bind(this);
    this.handleOnErrorHook = this.handleOnErrorHook.bind(this);
    this.handleSucessHook = this.handleSucessHook.bind(this);
    this.state = {
      disabled: false,
    };
  }

  enableBtn() {
    this.setState({ disabled: false });
  }

  disableBtn() {
    this.setState({ disabled: true });
  }

  handleOnBeforeHook() {
    // OBSERVATION: this hook allows you to trigger some action
    // before the login request is send or simply interrupt the
    // login flow by throwing an error.
    this.disableBtn();
  }

  handleOnErrorHook(err) {
    console.log(err);
    this.enableBtn();
  }

  handleSucessHook() {
    // OBSERVATION: this code is only reachable when using FB
    // loginStyle equals 'popup' at serviceConfiguration. In case
    // loginStyle equals 'redirect' we'll need to get the user
    // tokens from the cookie since we wont be able to call
    // resetStore.
    const { history, client } = this.props;
    client.resetStore();
    this.enableBtn();
    history.push('/');
  }

  render() {
    const { disabled } = this.state;

    return (
      <DefaultLayout>
        <SignupForm
          disabled={disabled}
          onBeforeHook={this.handleOnBeforeHook}
          onErrorHook={this.handleOnErrorHook}
          onSignupHook={this.handleSucessHook}
        />
        <Divider text="or" />
        <FBAuthBtn
          btnText="Continue with facebook"
          disabled={disabled}
          onBeforeHook={this.handleOnBeforeHook}
          onErrorHook={this.handleOnErrorHook}
          onLoginHook={this.handleSucessHook}
        />
      </DefaultLayout>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

const enhance = compose(
  withRouter,
  withApollo,
);

export default enhance(SignupPage);
