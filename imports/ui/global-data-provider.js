import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { userFragment, userQuery } from './apollo-client/user';
import Loading from './components/dumb/loading';

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
    const { userData } = this.props;
    const { error, loading, user } = userData;

    if (error) {
      console.log(error);
      return null;
    }

    if (loading) {
      return <Loading />;
    }

    const api = {
      curUser: user,
    };

    return this.props.children(api);
  }
}

GlobalDataProvider.propTypes = {
  userData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    user: propType(userFragment),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};

// Apollo integration
const withData = graphql(userQuery, { name: 'userData' });

export default withData(GlobalDataProvider);
