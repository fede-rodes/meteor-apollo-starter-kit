import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LogoutButton = ({ disabled, onLogoutHook }) => (
  <button
    disabled={disabled}
    onClick={() => Meteor.logout(onLogoutHook)}
  >
    Log out
  </button>
);

LogoutButton.propTypes = {
  disabled: PropTypes.bool,
  onLogoutHook: PropTypes.func,
};

LogoutButton.defaultProps = {
  disabled: false,
  onLogoutHook: () => {},
};

export default LogoutButton;
