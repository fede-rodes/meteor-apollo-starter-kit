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
    className="my2"
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
