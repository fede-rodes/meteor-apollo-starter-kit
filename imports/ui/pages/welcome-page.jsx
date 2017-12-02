import React from 'react';
import { propType } from 'graphql-anywhere';
import userFragment from '../apollo-client/fragments/user.graphql';
import { ResendVerificationLink } from '../components/auth/index.js';
import Loading from '../components/loading/index.jsx';
import Alert from '../components/alert/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      serverError: '',
      successMessage: '',
    };
    this.handleBefore = this.handleBefore.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
  }

  handleBefore() {
    // OBSERVATION: this hook allows you to trigger some action(s)
    // before the login request is sent or simply interrupt the normal
    // login flow by throwing an error.
    this.setState({
      loading: true,
      serverError: '',
      successMessage: '',
    });
  }

  handleServerError(err) {
    console.log(err);
    this.setState({
      loading: false,
      serverError: err.message || 'Unexpected error',
    });
  }

  handleSucess() {
    this.setState({
      loading: false,
      successMessage: 'A new email has been sent to you inbox!',
    });
  }

  render() {
    const { loading, serverError, successMessage } = this.state;

    return (
      <div className="full-width">
        <h1 className="center">Thanks for joining!</h1>
        <p className="center mt1">
          <strong>Check your email</strong> and click on the link provided to confirm your account.
          <br />
          If you did not receive an email, click&nbsp;
          <ResendVerificationLink
            text="here"
            onBeforeHook={this.handleBefore}
            onServerErrorHook={this.handleServerError}
            onSucessHook={this.handleSucess}
          />
          &nbsp;to resend the confirmation link.
        </p>
        {loading && <Loading />}
        <Alert type="error" content={serverError} className="mt1" />
        <Alert type="success" content={successMessage} className="mt1" />
      </div>
    );
  }
}

WelcomePage.propTypes = {
  curUser: propType(userFragment),
};

WelcomePage.defaultProps = {
  curUser: null,
};

export default WelcomePage;
