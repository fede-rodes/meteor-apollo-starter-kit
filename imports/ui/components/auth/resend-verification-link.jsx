import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import React from 'react';
import PropTypes from 'prop-types';
import sendVerificationEmailMutation from './send-verification-email.graphql';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResendConfirmationLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();

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

    sendVerificationEmail({})
    .then(() => onSucessHook())
    .catch(exc => onServerErrorHook(exc));
  }

  render() {
    const { text } = this.props;
    return (
      <a href="" onClick={this.handleClick}>
        {text}
      </a>
    );
  }
}

ResendConfirmationLink.propTypes = {
  text: PropTypes.string.isRequired,
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
