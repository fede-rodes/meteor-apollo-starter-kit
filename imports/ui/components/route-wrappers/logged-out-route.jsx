import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import curUserFragment from '../../apollo-client/fragments/cur-user.graphql';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wraped route
 * is not authenticated. If not, the LoggedOutRoute component provides 2 options
 * to handle this situation: redirect (redirectTo) the user to the given route;
 * or render on top of the current route the overlayComponent.
 */
const LoggedOutRoute = ({ curUser, component, redirectTo, overlayComponent, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const resolver = redirectTo.trim().length > 0
        ? <Redirect to={redirectTo.trim()} />
        : React.createElement(overlayComponent, { curUser, ...rest, ...props });

      return !curUser
        ? React.createElement(component, { curUser, ...rest, ...props })
        : resolver;
    }}
  />
);

LoggedOutRoute.propTypes = {
  curUser: propType(curUserFragment),
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  overlayComponent: PropTypes.func,
};

LoggedOutRoute.defaultProps = {
  curUser: null,
  redirectTo: '',
  overlayComponent: () => {},
};

export default LoggedOutRoute;
