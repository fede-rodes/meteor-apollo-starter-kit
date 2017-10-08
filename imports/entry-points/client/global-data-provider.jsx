import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import userQuery from '../../api/client/graphql-queries/user.graphql';

//------------------------------------------------------------------------------
// COMPONENT DEFINITION:
//------------------------------------------------------------------------------
/**
* @summary Injects global data (current user and/or global settings for instace)
* into child component.
*/
const GlobalDataProvider = (props) => {
  const { refetch, hasErrors, userLoading, currentUser, children, ...rest } = props;

  if (hasErrors) {
    return <div>something bad happend!</div>;
  }

  if (userLoading) {
    return <div>loading...</div>;
  }

  return React.cloneElement(children, { refetch, currentUser, ...rest });
};

GlobalDataProvider.propTypes = {
  hasErrors: PropTypes.bool,
  refetch: PropTypes.func,
  userLoading: PropTypes.bool,
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
    randomString: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

GlobalDataProvider.defaultProps = {
  hasErrors: false,
  refetch: () => {},
  userLoading: false,
  currentUser: null,
};

//------------------------------------------------------------------------------
// APOLLO INTEGRATION:
//------------------------------------------------------------------------------
/*
 * We use `gql` from graphql-tag to parse GraphQL query strings into the standard GraphQL AST
 * See for more information: https://github.com/apollographql/graphql-tag
 */
/* const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      _id
      randomString
    }
  }
`; */

/*
 * We use the `graphql` higher order component to send the graphql query to our
 * server. See for more information: http://dev.apollodata.com/react/
 */
const withData = graphql(userQuery, {
  // Destructure the default props to more explicit ones
  props: ({ data: { error, loading, user, refetch } }) => {
    if (loading) return { userLoading: true };
    if (error) return { hasErrors: true };

    return {
      currentUser: user,
      refetch,
    };
  },
});

//------------------------------------------------------------------------------

export default withData(GlobalDataProvider);
