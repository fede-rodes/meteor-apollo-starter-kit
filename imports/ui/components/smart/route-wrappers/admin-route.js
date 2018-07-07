import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { propType } from 'graphql-anywhere';
import userFragment from '../../../apollo-client/user/fragment/user';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is an admin. If not, the AdminRoute component provides 2 ways to handle this
 * situation: redirect (redirectTo) the user to the given route; or render on
 * top of the current route the overlay component.
 */
const AdminRoute = ({
  curUser,
  component,
  redirectTo,
  overlay,
  ...rest
}) => (
  <Route
    {...rest}
    render={(ownProps) => {
      // User NOT logged/admin in resolver
      const resolver = redirectTo.trim().length > 0
        ? <Redirect to={redirectTo.trim()} />
        : React.createElement(overlay, { curUser, ...rest, ...ownProps });

      // In case user is NOT logged in or is not admin, redirect
      if (!curUser || !Roles.userIsInRole(curUser._id, ['admin'])) {
        return resolver;
      }

      // ...Otherwise, render requested component
      return React.createElement(component, { curUser, ...rest, ...ownProps });
    }}
  />
);

AdminRoute.propTypes = {
  curUser: propType(userFragment),
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  overlay: PropTypes.func,
};

AdminRoute.defaultProps = {
  curUser: null,
  redirectTo: '',
  overlay: () => {},
};

export default AdminRoute;
