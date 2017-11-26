import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/index.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LogoutBtn = ({ disabled, onLogoutHook }) => (
  <Button
    disabled={disabled}
    onClick={() => Meteor.logout(onLogoutHook)}
  >
    Log out
  </Button>
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

/*
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

*/
