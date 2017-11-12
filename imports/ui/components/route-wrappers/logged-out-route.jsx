import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wraped route
 * is not authenticated. If not, the LoggedOutRoute component provides 2 options
 * to handle this situation: redirect (redirectTo) the user to the given route;
 * or render on top of the current route the overlayComponent.
 */
const LoggedOutRoute = ({ loggedIn, component, redirectTo, overlayComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const resolver = redirectTo.trim().length > 0
        ? <Redirect to={redirectTo.trim()} />
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
