import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import sendVerificationEmailMutation from './mutations.graphql';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResendVerificationLink extends React.PureComponent {
  handleClick = async (evt) => {
    evt.preventDefault();

    const {
      sendVerificationEmail,
      onBeforeHook,
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    try {
      await sendVerificationEmail();
      onSuccessHook();
    } catch (exc) {
      onServerErrorHook(exc);
    }
  }

  render() {
    const { label, disabled } = this.props;

    const text = <span>{label}</span>;

    const link = (
      <a href="" onClick={this.handleClick}>
        {label}
      </a>
    );

    return disabled ? text : link;
  }
}

ResendVerificationLink.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  sendVerificationEmail: PropTypes.func.isRequired,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

ResendVerificationLink.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

// Apollo integration
const withMutation = graphql(sendVerificationEmailMutation, { name: 'sendVerificationEmail' });

export default withMutation(ResendVerificationLink);
