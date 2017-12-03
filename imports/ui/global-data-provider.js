import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import userFragment from './apollo-client/fragments/user.graphql';
import userQuery from './apollo-client/queries/user.graphql';
import Loading from './components/loading/index.js';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Injects global data (current user, global settings, whatever) into
 * child components.
 */
class GlobalDataProvider extends React.Component {
  componentWillMount() {
    // Refecth user data every time Meteor.loginTokens are set. This is required
    // when using FB loginStyle equals to 'redirect' at serviceConfiguration,
    Accounts.onLogin(() => {
      this.props.userData.refetch();
    });
  }

  render() {
    const { userData, children, ...rest } = this.props;

    if (userData.error) {
      console.log(userData.error);
      return <div>Something bad happend!</div>;
    }

    if (userData.loading) {
      return <Loading />;
    }

    return React.cloneElement(children, { curUser: userData.user, ...rest });
  }
}

GlobalDataProvider.propTypes = {
  userData: PropTypes.shape({
    error: PropTypes.string,
    loading: PropTypes.bool,
    user: propType(userFragment),
    refetch: PropTypes.func,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

// Apollo integration
const withData = graphql(userQuery, { name: 'userData' });

export default withData(GlobalDataProvider);
