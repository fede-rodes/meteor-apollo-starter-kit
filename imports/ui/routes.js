import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from './apollo-client/user';
import {
  ScrollToTop,
  LoggedInRoute,
  LoggedOutRoute,
  RouteWithProps,
  AdminRoute,
} from './components/smart/route-wrappers';
import LoadableWrapper from './components/dumb/loadable-wrapper';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Routes = props => (
  <ScrollToTop>
    <Switch>
      <LoggedInRoute
        exact
        name="home"
        path="/"
        component={LoadableWrapper({ loader: () => import('./pages/home-page') })}
        redirectTo="/login"
        emailNotVerifiedOverlay={LoadableWrapper({ loader: () => import('./pages/auth/welcome-page') })}
        {...props}
      />
      <LoggedOutRoute
        name="login"
        path="/login"
        component={LoadableWrapper({ loader: () => import('./pages/auth/login-page') })}
        redirectTo="/"
        {...props}
      />
      <LoggedOutRoute
        name="signup"
        path="/signup"
        component={LoadableWrapper({ loader: () => import('./pages/auth/signup-page') })}
        redirectTo="/"
        {...props}
      />
      <RouteWithProps
        name="verifyEmail"
        path="/verify-email/:token"
        component={LoadableWrapper({ loader: () => import('./pages/auth/verify-email-page') })}
        {...props}
      />
      <RouteWithProps
        name="linkExpired"
        path="/link-expired"
        component={LoadableWrapper({ loader: () => import('./pages/auth/link-expired-page') })}
        {...props}
      />
      <LoggedOutRoute
        name="forgotPassword"
        path="/forgot-password"
        component={LoadableWrapper({ loader: () => import('./pages/auth/forgot-password-page') })}
        redirectTo="/"
        {...props}
      />
      <LoggedOutRoute
        name="resetPassword"
        path="/reset-password/:token"
        component={LoadableWrapper({ loader: () => import('./pages/auth/reset-password-page') })}
        redirectTo="/"
        {...props}
      />
      <AdminRoute
        exact
        name="admin"
        path="/admin"
        component={LoadableWrapper({ loader: () => import('./pages/admin/admin-page') })}
        redirectTo="/login"
        {...props}
      />
      <Route
        name="notFound"
        component={LoadableWrapper({ loader: () => import('./pages/not-found-page') })}
      />
    </Switch>
  </ScrollToTop>
);

Routes.propTypes = {
  curUser: propType(userFragment), // eslint-disable-line
};

Routes.defaultProps = {
  curUser: null,
};

export default Routes;
