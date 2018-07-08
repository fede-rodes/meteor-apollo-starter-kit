import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from './apollo-client/user/fragment/user';
import {
  ScrollToTop,
  LoggedInRoute,
  AdminRoute,
} from './components/smart/route-wrappers';
import LoadableWrapper from './components/dumb/loadable-wrapper';

const LoginPage = LoadableWrapper({ loader: () => import('./pages/auth/login-page') });

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Routes = props => (
  <ScrollToTop>
    <Switch>
      {/* HOME */}
      <LoggedInRoute
        exact
        path="/"
        component={LoadableWrapper({ loader: () => import('./pages/home-page') })}
        overlay={LoginPage}
        {...props}
      />
      {/* ADMIN */}
      <AdminRoute
        exact
        path="/admin"
        component={LoadableWrapper({ loader: () => import('./pages/admin/admin-page') })}
        overlay={LoginPage}
        {...props}
      />
      {/* NOT FOUND */}
      <Route
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
