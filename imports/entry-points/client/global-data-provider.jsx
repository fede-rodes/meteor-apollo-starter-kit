// import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GlobalDataProvider = (props) => {
  const {
    hasErrors,
    refetch,
    userLoading,
    currentUser,
    children,
    ...rest,
  } = props;
  console.log('GlobalDataProvider props', props);

  if (hasErrors) {
    console.log('something bad happend!');
    return <div>something bad happend!</div>;
  }

  if (userLoading) {
    console.log('loading');
    return <div>loading...</div>;
  }

  return React.cloneElement(children, { ...rest, currentUser });
};

//------------------------------------------------------------------------------
// GLOBAL SUBSCRIPTIONS / DATA:
//------------------------------------------------------------------------------
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
  currentUser: null,
};

/*
 * We use `gql` from graphql-tag to parse GraphQL query strings into the standard GraphQL AST
 * See for more information: https://github.com/apollographql/graphql-tag
 */
const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      _id
      randomString
    }
  }
`;

/*
 * We use the `graphql` higher order component to send the graphql query to our server
 * See for more information: http://dev.apollodata.com/react/
 */
const withData = graphql(GET_USER_DATA, {
  // destructure the default props to more explicit ones
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


/*
// import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GlobalDataProvider = WrappedComponent => (props) => {
  console.log('props', props);
  const {
    hasErrors,
    refetch,
    userLoading,
    currentUser,
    children,
    ...rest,
  } = props;
  // const currentUser = null;

  if (hasErrors) {
    console.log('something bad happend!');
    return <div>something bad happend!</div>;
  }

  if (userLoading) {
    console.log('loading');
    return <div>loading...</div>;
  }

  return <WrappedComponent {...rest} currentUser={currentUser} />;
};

//------------------------------------------------------------------------------
// GLOBAL SUBSCRIPTIONS / DATA:
//------------------------------------------------------------------------------
GlobalDataProvider.propTypes = {
  hasErrors: PropTypes.bool,
  refetch: PropTypes.func,
  userLoading: PropTypes.bool,
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
    randomString: PropTypes.string,
  }),
  WrappedComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

GlobalDataProvider.defaultProps = {
  currentUser: null,
};

/*
 * We use `gql` from graphql-tag to parse GraphQL query strings into the standard GraphQL AST
 * See for more information: https://github.com/apollographql/graphql-tag
 //
const GET_USER_DATA = gql`
  query getCurrentUser {
    user {
      _id
      randomString
    }
  }
`;

/*
 * We use the `graphql` higher order component to send the graphql query to our server
 * See for more information: http://dev.apollodata.com/react/
 //
const withData = graphql(GET_USER_DATA, {
  // destructure the default props to more explicit ones
  props: ({ data: { error, loading, user, refetch } }) => {
    if (loading) return { userLoading: true };
    if (error) return { hasErrors: true };

    console.log(error, loading, user, refetch);

    return {
      currentUser: user,
      refetch,
    };
  },
});

//------------------------------------------------------------------------------

export default withData(GlobalDataProvider);

*/
