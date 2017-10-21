import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button'; // for js
import 'antd/lib/button/style/css'; // for css

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class FBAuthBtn extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onBeforeHook, onErrorHook, onLoginHook } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Set FB permissions
    const requestPermissions = {
      requestPermissions: [
        'public_profile',
        'email',
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
    const { btnText, disabled } = this.props;

    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={disabled}
        size="large"
        // loading={disabled}
        className="full-width"
        onClick={this.handleClick}
      >
        {btnText}
      </Button>
    );
  }
}

FBAuthBtn.propTypes = {
  btnText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onErrorHook: PropTypes.func,
  onLoginHook: PropTypes.func,
};

FBAuthBtn.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onErrorHook: () => {},
  onLoginHook: () => {},
};

export default FBAuthBtn;
