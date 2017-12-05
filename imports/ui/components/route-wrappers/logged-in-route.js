import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '../../apollo-client/fragments/user.graphql';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component provides 2 ways to
 * handle this situation: redirect (redirectTo) the user to the given route; or
 * render on top of the current route the overlay component.
 */
const LoggedInRoute = ({
  curUser,
  component,
  redirectTo,
  overlay,
  emailNotVerifiedOverlay,
  ...rest
}) => (
  <Route
    {...rest}
    render={(ownProps) => {
      // User NOT logged in resolver
      const resolver = redirectTo.trim().length > 0
        ? <Redirect to={redirectTo.trim()} />
        : React.createElement(overlay, { curUser, ...rest, ...ownProps });

      if (!curUser) {
        return resolver;
      }

      // TODO: use current loggedIn service instead of all available services
      const isPasswordService = curUser.services.indexOf('password') !== -1;
      const isEmailVerified = isPasswordService && curUser.emails[0].verified === true;

      // If password service and email is NOT verified, resolve...
      if (isPasswordService && !isEmailVerified) {
        return React.createElement(emailNotVerifiedOverlay, { curUser, ...rest, ...ownProps });
      }

      // ...Otherwise, render requested component
      return React.createElement(component, { curUser, ...rest, ...ownProps });
    }}
  />
);

LoggedInRoute.propTypes = {
  curUser: propType(userFragment),
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  overlay: PropTypes.func,
  emailNotVerifiedOverlay: PropTypes.func.isRequired,
};

LoggedInRoute.defaultProps = {
  curUser: null,
  redirectTo: '',
  overlay: () => {},
};

export default LoggedInRoute;
