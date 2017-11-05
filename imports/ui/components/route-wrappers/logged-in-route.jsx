import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component provides 2 options to
 * handle this situation: redirect (redirectTo) the user to the given route; or
 * render on top of the current route the overlayComponent.
 */
const LoggedInRoute = ({ loggedIn, component, redirectTo, overlayComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const resolver = redirectTo.length > 0
        ? <Redirect to={redirectTo} />
        : React.createElement(overlayComponent, { ...rest, ...props });

      return loggedIn
        ? React.createElement(component, { ...rest, ...props })
        : resolver;
    }}
  />
);

LoggedInRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  overlayComponent: PropTypes.func,
};

LoggedInRoute.defaultProps = {
  redirectTo: '',
  overlayComponent: () => {},
};

export default LoggedInRoute;
