import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from './apollo-client/user';
import {
  LoggedInRoute,
  LoggedOutRoute,
  RouteWithProps,
} from './components/smart/route-wrappers';

// Auth routes
import LoginPage from './pages/auth/login-page';
import SignupPage from './pages/auth/signup-page';
import WelcomePage from './pages/auth/welcome-page';
import VerifyEmailPage from './pages/auth/verify-email-page';
import LinkExpiredPage from './pages/auth/link-expired-page';
import ForgotPasswordPage from './pages/auth/forgot-password-page';
import ResetPasswordPage from './pages/auth/reset-password-page';

// Other routes
import HomePage from './pages/home-page';
import NotFoundPage from './pages/not-found-page';

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
      redirectTo="/login"
      emailNotVerifiedOverlay={WelcomePage}
      {...props}
    />
    <LoggedOutRoute
      name="login"
      path="/login"
      component={LoginPage}
      redirectTo="/"
      {...props}
    />
    <LoggedOutRoute
      name="signup"
      path="/signup"
      component={SignupPage}
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
    <LoggedOutRoute
      name="forgotPassword"
      path="/forgot-password"
      component={ForgotPasswordPage}
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
