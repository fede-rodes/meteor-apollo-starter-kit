import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withApollo, compose } from 'react-apollo';
import message from 'antd/lib/message'; // for js
import 'antd/lib/message/style/css'; // for css
import { PasswordAuthViews } from '../components/auth/index.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'resetPassword', disabled: false };
    this.handleViewChange = this.handleViewChange.bind(this);
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
  }

  handleViewChange(view) {
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

  handleError(err) {
    console.log(err);
    this.enableBtn();
  }

  handleSucess() {
    const { view } = this.state;
    const { history, client } = this.props;

    switch (view) {
      case 'resetPassword':
        client.resetStore();
        this.enableBtn();
        message.success('Password reset successfully!');
        history.push('/');
        break;
      case 'forgotPassword':
        this.enableBtn();
        break;
      default:
        throw new Error('Unknown view option!');
    }
  }

  render() {
    const { view, disabled } = this.state;
    const { match: { params: { token } } } = this.props;

    return (
      <PasswordAuthViews
        view={view}
        onViewChange={this.handleViewChange}
        token={token}
        disabled={disabled}
        onBeforeHook={this.handleBefore}
        onClientErrorHook={this.handleError}
        onServerErrorHook={this.handleError}
        onSucessHook={this.handleSucess}
      />
    );
  }
}

ResetPasswordPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const enhance = compose(
  withRouter, // To have access to history.push
  withApollo, // To have access to client.resetStore()
);

export default enhance(ResetPasswordPage);
