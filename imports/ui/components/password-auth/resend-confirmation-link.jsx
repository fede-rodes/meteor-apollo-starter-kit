import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'antd/lib/alert'; // for js
import 'antd/lib/alert/style/css'; // for css
import sendVerificationEmailMutation from './send-verification-email.graphql';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResendConfirmationLink extends React.Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      serverError: '',
    };
  }

  displayServerError({ message }) {
    this.setState({ serverError: message || 'Unexpected error' });
  }

  handleClick(e) {
    e.preventDefault();

    const {
      sendVerificationEmail,
      onBeforeHook,
      onServerErrorHook,
      onSucessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Clear server errors if any
    this.setState({ serverError: '' });

    sendVerificationEmail({})
    .then(() => onSucessHook())
    .catch((exc) => {
      this.displayServerError(exc);
      onServerErrorHook(exc);
    });
  }

  render() {
    const { serverError } = this.state;

    return (
      <div className="full-width">
        <p className="center">
          Please, click here to&nbsp;
          <a href="" onClick={this.handleClick}>
            resend confirmation link
          </a>.
        </p>
        {serverError && serverError.length > 0 && (
          <Alert type="error" message={serverError} className="mt1" banner />
        )}
      </div>
    );
  }
}

ResendConfirmationLink.propTypes = {
  sendVerificationEmail: PropTypes.func.isRequired,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

ResendConfirmationLink.defaultProps = {
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSucessHook: () => {},
};

const enhance = compose(
  graphql(sendVerificationEmailMutation, { name: 'sendVerificationEmail' }), // Apollo integration
);

export default enhance(ResendConfirmationLink);
