import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class FBLoginButton extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onErrorHook, onLoginHook } = this.props;
    console.log('handleClick');

    // Set FB permissions
    const requestPermissions = {
      requestPermissions: [
        'public_profile',
        'email',
        'read_friendlists',
      ],
    };

    Meteor.loginWithFacebook(requestPermissions, (err) => {
      if (err) {
        onErrorHook(err);
      } else {
        // OBSERVATION: this code is only reachable when using FB loginStyle
        // equals 'popup' at serviceConfiguration. In case loginStyle equals
        // 'redirect' we'll need to get the user tokens from the cookie since
        // we wont be able to call resetStore.
        onLoginHook();
      }
    });
  }

  render() {
    const { disabled } = this.props;

    return (
      <button
        disabled={disabled}
        onClick={this.handleClick}
      >
        Log in with facebook
      </button>
    );
  }
}

FBLoginButton.propTypes = {
  disabled: PropTypes.bool,
  onLoginHook: PropTypes.func,
  onErrorHook: PropTypes.func,
};

FBLoginButton.defaultProps = {
  disabled: false,
  onLoginHook: () => {},
  onErrorHook: () => {},
};

export default FBLoginButton;
