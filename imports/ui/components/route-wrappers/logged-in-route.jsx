import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import curUserFragment from '../../apollo-client/fragments/cur-user.graphql';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component provides 2 options to
 * handle this situation: redirect (redirectTo) the user to the given route; or
 * render on top of the current route the overlayComponent.
 */
const LoggedInRoute = (props) => {
  const {
    curUser,
    component,
    loggedOutRedirectTo,
    loggedOutOverlayComponent,
    notVerifiedOverlayComponent,
    ...rest
  } = props;

  return (
    <Route
      {...rest}
      render={(ownProps) => {
        if (curUser) {
          const isPasswordService = curUser.services.indexOf('password') !== -1;
          const isEmailVerified = isPasswordService && curUser.emails[0].verified === true;

          // In case is password service and email is not verified, return welcome
          // page
          if (isPasswordService && !isEmailVerified) {
            return React.createElement(notVerifiedOverlayComponent, { curUser, ...rest, ...ownProps });
          }
          // Is not password service or email is verified, return requested page
          return React.createElement(component, { curUser, ...rest, ...ownProps });
        }

        return loggedOutRedirectTo.trim().length > 0
          ? <Redirect to={loggedOutRedirectTo.trim()} />
          : React.createElement(loggedOutOverlayComponent, { curUser, ...rest, ...ownProps });
      }}
    />
  );
};

LoggedInRoute.propTypes = {
  curUser: propType(curUserFragment),
  component: PropTypes.func.isRequired,
  loggedOutRedirectTo: PropTypes.string,
  loggedOutOverlayComponent: PropTypes.func,
  notVerifiedOverlayComponent: PropTypes.func.isRequired,
};

LoggedInRoute.defaultProps = {
  curUser: null,
  loggedOutRedirectTo: '',
  loggedOutOverlayComponent: () => {},
};

export default LoggedInRoute;
