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
    const { btnText, disabled } = this.props;

    return (
      <Button
        type="primary"
        htmlType="submit"
        disabled={disabled}
        size="large"
        className="full-width"
        onClick={this.handleClick}
      >
        {btnText}
      </Button>
    );
  }
}

FBAuthBtn.propTypes = {
  requestPermissions: PropTypes.arrayOf(PropTypes.string),
  btnText: PropTypes.string.isRequired,
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
