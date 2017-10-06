// import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';

import LoginPage from '../../ui/pages/login/login-page.jsx';
import NotFoundPage from '../../ui/pages/not-found-page.jsx';
import App from '../../ui/App';

const Routes = (props) => {
  const { currentUser, ...rest } = props;
  console.log('Routes props', props);

  return (
    <Switch>
      <Route
        exact
        name="index"
        path="/"
        render={() => (
          currentUser ? (
            <App {...rest} currentUser={currentUser} />
          ) : (
            <Redirect to="/login" />
          )
        )}
      />
      <Route
        name="login"
        path="/login"
        render={() => (
          currentUser ? (
            <Redirect to="/" />
          ) : (
            <LoginPage {...rest} currentUser={currentUser} />
          )
        )}
      />
      {/* <Route name="search" path="/:query" component={SearchPageContainer} /> */}
      <Route name="notFound" component={NotFoundPage} />
    </Switch>
  );
};

Routes.propTypes = {
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
    randomString: PropTypes.string,
  }),
  // hasErrors: PropTypes.bool,
  // refetch: PropTypes.func,
  // userLoading: PropTypes.bool,
};

Routes.defaultProps = {
  currentUser: null,
};
//------------------------------------------------------------------------------

export default Routes;
