import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import {
  LoggedInRoute,
  LoggedOutRoute,
  RouteWithProps,
} from '../../ui/components/route-wrappers/index.js';
import AuthPage from '../../ui/pages/auth-page.jsx';
import ConfirmEmailPage from '../../ui/pages/confirm-email-page.jsx';
import VerifyEmailPage from '../../ui/pages/verify-email-page.jsx';
import LinkExpiredPage from '../../ui/pages/link-expired-page.jsx';
import HomePage from '../../ui/pages/home-page.jsx';
import NotFoundPage from '../../ui/pages/not-found-page.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Routes = (props) => {
  const { curUser } = props;

  return (
    <Switch>
      <LoggedInRoute
        exact
        name="home"
        path="/"
        loggedIn={!!curUser}
        component={HomePage}
        // redirectTo="/auth"
        overlayComponent={AuthPage}
        {...props}
      />
      <LoggedInRoute
        exact
        name="confirmEmail"
        path="/confirm-email"
        loggedIn={!!curUser}
        component={ConfirmEmailPage}
        // redirectTo="/auth"
        overlayComponent={AuthPage}
        {...props}
      />
      {/* Even when using overlayComponent we still need this route */}
      <LoggedOutRoute
        name="auth"
        path="/auth"
        loggedIn={!!curUser}
        component={AuthPage}
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
};

Routes.propTypes = {
  curUser: PropTypes.shape({
    _id: PropTypes.string,
    randomString: PropTypes.string,
  }),
};

Routes.defaultProps = {
  curUser: null,
};

export default Routes;
