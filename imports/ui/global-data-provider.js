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
    const {
      userData: {
        error,
        loading,
        user,
      },
      children,
      ...rest
    } = this.props;

    if (error) {
      console.log(error);
      return <div>Something bad happend!</div>;
    }

    if (loading) {
      return <Loading />;
    }

    return React.cloneElement(children, { curUser: user, ...rest });
  }
}

GlobalDataProvider.propTypes = {
  userData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    user: propType(userFragment),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

// Apollo integration
const withData = graphql(userQuery, { name: 'userData' });

export default withData(GlobalDataProvider);
