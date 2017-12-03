import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { ResendVerificationLink, LogoutBtn } from '../components/auth/index.js';
import Title from '../components/title/index.js';
import Loading from '../components/loading/index.js';
import Alert from '../components/alert/index.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      errorMsg: '',
      successMsg: '',
    };
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.clearMessages = this.clearMessages.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
    this.renderLink = this.renderLink.bind(this);
  }

  enableBtn() {
    this.setState({ disabled: false });
  }

  disableBtn() {
    this.setState({ disabled: true });
  }

  clearMessages() {
    this.setState({ errorMsg: '', successMsg: '' });
  }

  handleBefore() {
    // OBSERVATION: this hook allows you to trigger some action(s)
    // before the login request is sent or simply interrupt the normal
    // login flow by throwing an error.
    this.disableBtn();
    this.clearMessages();
  }

  handleServerError(err) {
    console.log(err);
    this.setState({ errorMsg: err.reason || err.message || 'Unexpected error' });
    this.enableBtn();
  }

  handleSucess() {
    this.enableBtn();
    this.setState({ successMsg: 'A new email has been sent to your inbox!' });
  }

  renderLink() {
    const { disabled } = this.state;

    return (
      <ResendVerificationLink
        label="here"
        disabled={disabled}
        onBeforeHook={this.handleBefore}
        onServerErrorHook={this.handleServerError}
        onSucessHook={this.handleSucess}
      />
    );
  }

  render() {
    const { client } = this.props;
    const { disabled, errorMsg, successMsg } = this.state;

    return (
      <div>
        <Title>Thanks for joining!</Title>
        <p className="center">
          <strong>Check your email</strong> and click on the link provided to confirm your account.
        </p>
        <p className="center">
          If you did not receive an email, click {this.renderLink()} to resend the confirmation link.
        </p>
        {disabled && <Loading className="center" />}
        <Alert type="error" content={errorMsg} />
        <Alert type="success" content={successMsg} />
        <LogoutBtn onLogoutHook={() => client.resetStore()} />
      </div>
    );
  }
}

WelcomePage.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

// withApollo provides access to client.resetStore()
export default withApollo(WelcomePage);
