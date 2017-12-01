import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class FBAuthBtn extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      requestPermissions,
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

    Meteor.loginWithFacebook({ requestPermissions }, (err) => {
      if (err) {
        onServerErrorHook(err);
      } else {
        // OBSERVATION: this code is only reachable when using FB loginStyle
        // equals 'popup' at serviceConfiguration. In case loginStyle equals
        // 'redirect' we'll need to get the user tokens from the cookie since
        // we wont be able to call resetStore.
        onSucessHook();
      }
    });
  }

  render() {
    const { btnLabel, disabled } = this.props;

    return (
      <Button
        variant="primary"
        disabled={disabled}
        size="large"
        expanded
        onClick={this.handleClick}
      >
        {btnLabel}
      </Button>
    );
  }
}

FBAuthBtn.propTypes = {
  requestPermissions: PropTypes.arrayOf(PropTypes.string),
  btnLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSucessHook: PropTypes.func,
};

FBAuthBtn.defaultProps = {
  requestPermissions: [
    'public_profile',
    'email',
  ],
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSucessHook: () => {},
};

export default FBAuthBtn;
