import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
* @summary Makes sure the user that is trying to access a public route is not
* authenticated. In case the user is authenticated, the PublicRoute component
* provides 2 options: redirect (redirectTo) the user to the given route; or
* render on top of the current route the overlayComponent.
*/
const PublicRoute = ({ authenticated, component, redirectTo, overlayComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const resolver = redirectTo.length > 0
        ? <Redirect to={redirectTo} />
        : React.createElement(overlayComponent, { ...rest, ...props });

      return authenticated
      ? resolver
      : React.createElement(component, { ...rest, ...props });
    }}
  />
);

PublicRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  overlayComponent: PropTypes.func,
};

PublicRoute.defaultProps = {
  redirectTo: '',
  overlayComponent: () => {},
};

export default PublicRoute;
