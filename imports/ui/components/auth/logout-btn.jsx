import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LogoutBtn = ({ disabled, onLogoutHook }) => (
  <button
    disabled={disabled}
    onClick={() => Meteor.logout(onLogoutHook)}
  >
    Log out
  </button>
);

LogoutBtn.propTypes = {
  disabled: PropTypes.bool,
  onLogoutHook: PropTypes.func,
};

LogoutBtn.defaultProps = {
  disabled: false,
  onLogoutHook: () => {},
};

export default LogoutBtn;
