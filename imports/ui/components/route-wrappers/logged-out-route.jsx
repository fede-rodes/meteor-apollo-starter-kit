import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '../../apollo-client/fragments/user.graphql';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wraped route
 * is not authenticated. If not, the LoggedOutRoute component provides 2 ways
 * to handle this situation: redirect (redirectTo) the user to the given route;
 * or render on top of the current route the overlay component.
 */
const LoggedOutRoute = ({
  curUser,
  component,
  redirectTo,
  overlay,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      // User logged in resolver
      const resolver = redirectTo.trim().length > 0
        ? <Redirect to={redirectTo.trim()} />
        : React.createElement(overlay, { curUser, ...rest, ...props });

      return !curUser
        ? React.createElement(component, { curUser, ...rest, ...props })
        : resolver;
    }}
  />
);

LoggedOutRoute.propTypes = {
  curUser: propType(userFragment),
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  overlay: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  curUser: null,
  redirectTo: '',
  overlay: () => {},
};

export default LoggedOutRoute;
