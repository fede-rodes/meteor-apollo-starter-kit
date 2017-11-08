import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'antd/lib/alert'; // for js
import 'antd/lib/alert/style/css'; // for css
import DefaultLayout from '../layouts/default/index.jsx';
import { ResendConfirmationLink } from '../components/auth/index.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ConfirmEmailPage extends React.Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
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
    // OBSERVATION: this hook allows you to trigger some action
    // before the resend link request is sent or simply interrupt the
    // normal flow by throwing an error.
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
      <DefaultLayout>
        <div className="full-width">
          <h1 className="center">Thanks for joining!</h1>
          <p className="center mt1">
            <strong>Check your email</strong> and click on the link provided to confirm your account.
            <br />
            If you did not receive an email, click&nbsp;
            <ResendConfirmationLink
              text="here"
              onBeforeHook={this.handleBefore}
              onServerErrorHook={this.handleServerError}
              onSucessHook={this.handleSucess}
            />
            &nbsp;to resend the confirmation link.
          </p>
          {loading && (
            <p className="center mt2">loading...</p>
          )}
          {serverError && serverError.length > 0 && (
            <Alert type="error" message={serverError} className="mt1" banner />
          )}
          {successMessage && successMessage.length > 0 && (
            <Alert type="success" message={successMessage} className="mt1" banner />
          )}
        </div>
      </DefaultLayout>
    );
  }
}

ConfirmEmailPage.propTypes = {
  curUser: PropTypes.shape({
    _id: PropTypes.string,
    randomString: PropTypes.string,
  }),
};

ConfirmEmailPage.defaultProps = {
  curUser: null,
};
//------------------------------------------------------------------------------

export default ConfirmEmailPage;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ResendConfirmationLink from '../components/password-auth/resend-confirmation-link.jsx';
import DefaultLayout from '../layouts/default/index.jsx';
// import Users from '../../../api/users/namespace.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ConfirmEmailPage extends React.Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
    this.state = {
      loading: false,
    };
  }

  handleBefore() {
    // OBSERVATION: this hook allows you to trigger some action
    // before the resend link request is sent or simply interrupt the
    // normal flow by throwing an error.
    this.setState({ loading: true });
  }

  handleServerError(err) {
    console.log(err);
    this.setState({ loading: false });
  }

  handleSucess() {
    this.setState({ loading: false });
    // TODO: Display success message on UI
  }

  render() {
    const { loading } = this.state;

    return (
      <DefaultLayout>
        <div className="full-width">
          <h1 className="center">Thanks for joining!</h1>
          <p className="center mt1">
            <strong>Check your email</strong> and click on the link provided to confirm your account.
            <br />
            If you did not receive an email, click here to&nbsp;
            <ResendConfirmationLink
              onBeforeHook={this.handleBefore}
              onServerErrorHook={this.handleServerError}
              onSucessHook={this.handleSucess}
            />
          </p>
          {loading && (
            <p className="center mt2">loading...</p>
          )}
        </div>
      </DefaultLayout>
    );
  }
}

ConfirmEmailPage.propTypes = {
  curUser: PropTypes.shape({
    _id: PropTypes.string,
    randomString: PropTypes.string,
  }),
};

ConfirmEmailPage.defaultProps = {
  curUser: null,
};
//------------------------------------------------------------------------------

export default ConfirmEmailPage;
*/
