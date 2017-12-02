import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '../apollo-client/fragments/user.graphql';
import { ResendVerificationLink } from '../components/auth/index.js';
import Loading from '../components/loading/index.jsx';
import Alert from '../components/alert/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LinkExpiredPage extends React.Component {
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

    return disabled ? (
      <span>here</span>
    ) : (
      <ResendVerificationLink
        text="here"
        onBeforeHook={this.handleBefore}
        onServerErrorHook={this.handleServerError}
        onSucessHook={this.handleSucess}
      />
    );
  }

  render() {
    const { curUser } = this.props;
    const { disabled, errorMsg, successMsg } = this.state;

    return (
      <div className="full-width">
        <h1 className="center">The link has expired!</h1>
        {curUser ? (
          <p className="center">
            Please, click {this.renderLink()} to resend confirmation link.
          </p>
        ) : (
          <p className="center">
            Please, <Link to="/auth">login</Link> to be able to resend confirmation link.
          </p>
        )}
        {disabled && <Loading className="center mt2" />}
        <Alert type="error" content={errorMsg} className="mt2" />
        <Alert type="success" content={successMsg} className="mt2" />
      </div>
    );
  }
}

LinkExpiredPage.propTypes = {
  curUser: propType(userFragment),
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};

export default LinkExpiredPage;
