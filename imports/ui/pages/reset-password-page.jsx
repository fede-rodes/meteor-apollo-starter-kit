import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import message from 'antd/lib/message'; // for js
import 'antd/lib/message/style/css'; // for css
import DefaultLayout from '../layouts/default/index.jsx';
import { ResetPasswordForm } from '../components/auth/index.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
    this.enableBtn = this.enableBtn.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
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
    const { history, client } = this.props;
    client.resetStore();
    this.enableBtn();
    message.success('Password reset successfully!');
    history.push('/');
  }

  render() {
    const { disabled } = this.state;
    const { match: { params: { token } } } = this.props;

    return (
      <DefaultLayout>
        <ResetPasswordForm
          token={token}
          disabled={disabled}
          onBeforeHook={this.handleBefore}
          onClientErrorHook={this.handleError}
          onServerErrorHook={this.handleError}
          onSucessHook={this.handleSucess}
        />
      </DefaultLayout>
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
