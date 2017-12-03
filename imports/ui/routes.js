import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from './apollo-client/fragments/user.graphql';
import {
  LoggedInRoute,
  LoggedOutRoute,
  RouteWithProps,
} from './components/route-wrappers/index.js';
import AuthPage from './pages/auth-page.js';
import ResetPasswordPage from './pages/reset-password-page.js';
import WelcomePage from './pages/welcome-page.js';
import VerifyEmailPage from './pages/verify-email-page.js';
import LinkExpiredPage from './pages/link-expired-page.js';
import HomePage from './pages/home-page.js';
import NotFoundPage from './pages/not-found-page.js';

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
      // redirectTo="/auth"
      overlay={AuthPage}
      emailNotVerifiedOverlay={WelcomePage}
      {...props}
    />
    {/*
      The following route can be removed when using overlay strategy (above),
      just fix the login link at link-expired-page.js (simply redirect user to
      home ('/') or any other loggedIn route)
    */}
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
