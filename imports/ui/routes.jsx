import React from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from './apollo-client/fragments/user.graphql';
import {
  LoggedInRoute,
  LoggedOutRoute,
  RouteWithProps,
} from './components/route-wrappers/index.js';
import AuthPage from './pages/auth-page.jsx';
import ResetPasswordPage from './pages/reset-password-page.jsx';
import WelcomePage from './pages/welcome-page.jsx';
import VerifyEmailPage from './pages/verify-email-page.jsx';
import LinkExpiredPage from './pages/link-expired-page.jsx';
import HomePage from './pages/home-page.jsx';
import NotFoundPage from './pages/not-found-page.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Routes = props => (
  <Switch>
    <LoggedInRoute
      exact
      name="home"
      path="/"
      component={HomePage}
      // loggedOutRedirectTo="/auth"
      loggedOutOverlayComponent={AuthPage}
      notVerifiedOverlayComponent={WelcomePage}
      {...props}
    />
    {/* The following route can be removed when using overlayComponent, just
      fix the login link at link-expired-page.jsx (simply redirect user to
      /home or any other loggedIn route) */}
    <LoggedOutRoute
      name="auth"
      path="/auth"
      component={AuthPage}
      redirectTo="/"
      {...props}
    />
    <LoggedOutRoute
      name="resetPassword"
      path="/reset-password/:token"
      component={ResetPasswordPage}
      redirectTo="/"
      {...props}
    />
    <RouteWithProps
      name="verifyEmail"
      path="/verify-email/:token"
      component={VerifyEmailPage}
      {...props}
    />
    <RouteWithProps
      name="linkExpired"
      path="/link-expired"
      component={LinkExpiredPage}
      {...props}
    />
    <Route
      name="notFound"
      component={NotFoundPage}
    />
  </Switch>
);

Routes.propTypes = {
  curUser: propType(userFragment),
};

Routes.defaultProps = {
  curUser: null,
};

export default Routes;
