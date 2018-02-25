import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../../apollo-client/user';
import Constants from '../../../api/constants';
import { LogoutBtn } from './auth';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Menu = ({ curUser }) => {
  // Only display menu content for logged in users
  if (!curUser) {
    return null;
  }

  // Display authenticated routes plus logout button
  return [
    Constants.ROUTES
    .filter(({ auth }) => auth)
    .map(({ path, label }) => (
      <li key={path}>
        <Link to={path}>{label}</Link>
      </li>
    )),
    <li key="logout">
      <LogoutBtn btnType="link" />
    </li>,
  ];
};

Menu.propTypes = {
  curUser: propType(userFragment),
};

Menu.defaultProps = {
  curUser: null,
};

export default Menu;
