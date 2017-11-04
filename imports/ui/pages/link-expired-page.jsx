import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Alert from 'antd/lib/alert'; // for js
import 'antd/lib/alert/style/css'; // for css
import ResendConfirmationLink from '../components/password-auth/resend-confirmation-link.jsx';
import DefaultLayout from '../layouts/default/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LinkExpiredPage extends React.Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleBefore = this.handleBefore.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.handleSucess = this.handleSucess.bind(this);
    this.state = {
      loading: false,
      serverError: '',
      successMessage: '',
    };
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
    const { curUser } = this.props;
    const { loading, serverError, successMessage } = this.state;

    const text = curUser
      ? (
        <p className="center">
          Please, click&nbsp;
          <ResendConfirmationLink
            text="here"
            onBeforeHook={this.handleBefore}
            onServerErrorHook={this.handleServerError}
            onSucessHook={this.handleSucess}
          />
          &nbsp;to resend confirmation link.
        </p>
      )
      : (
        <p className="center">
          Please, <Link to="/auth">login</Link> to be able to <strong>resend confirmation link</strong>.
        </p>
      );

    return (
      <DefaultLayout>
        <div className="full-width">
          <h1 className="center">The link has expired!</h1>
          {text}
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

LinkExpiredPage.propTypes = {
  curUser: PropTypes.shape({
    _id: PropTypes.string,
    randomString: PropTypes.string,
  }),
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};
//------------------------------------------------------------------------------

export default LinkExpiredPage;
