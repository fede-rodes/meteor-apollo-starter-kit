import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure the user that is trying to access the route is not
 * loggedIn. In case the user is loggedIn, the LoggedOutRoute component
 * provides 2 options: redirect (redirectTo) the user to the given route; or
 * render on top of the current route the overlayComponent.
 */
const LoggedOutRoute = ({ loggedIn, component, redirectTo, overlayComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const resolver = redirectTo.length > 0
        ? <Redirect to={redirectTo} />
        : React.createElement(overlayComponent, { ...rest, ...props });

      return loggedIn
        ? resolver
        : React.createElement(component, { ...rest, ...props });
    }}
  />
);

LoggedOutRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  overlayComponent: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  redirectTo: '',
  overlayComponent: () => {},
};

export default LoggedOutRoute;
