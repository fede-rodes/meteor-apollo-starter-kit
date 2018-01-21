import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../dumb/button';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class FBAuthBtn extends React.PureComponent {
  handleClick = () => {
    const {
      requestPermissions,
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

    Meteor.loginWithFacebook({ requestPermissions }, (err) => {
      if (err) {
        onServerErrorHook(err);
      } else {
        // OBSERVATION: this code is only reachable when using FB loginStyle
        // equals 'popup' at serviceConfiguration. In case loginStyle equals
        // 'redirect' you'll need to use Accounts.onLogin() to listen to state
        // changes. See GlobalDataProvider.componentWillMount().
        onSuccessHook();
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
        className="my2"
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
  onSuccessHook: PropTypes.func,
};

FBAuthBtn.defaultProps = {
  requestPermissions: [
    'public_profile',
    'email',
  ],
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default FBAuthBtn;
