import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import Loading from '../components/loading.jsx';
import userQuery from '../apollo-client/queries/user.graphql';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Injects global data (current user and/or global settings to name a
 * few examples) into child components.
 */
const GlobalDataProvider = (props) => {
  const { refetch, hasErrors, userLoading, curUser, children, ...rest } = props;

  if (hasErrors) {
    return <div>Something bad happend!</div>;
  }

  if (userLoading) {
    return <Loading />;
  }

  return React.cloneElement(children, { refetch, curUser, ...rest });
};

GlobalDataProvider.propTypes = {
  hasErrors: PropTypes.bool,
  refetch: PropTypes.func,
  userLoading: PropTypes.bool,
  curUser: PropTypes.shape({
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
  curUser: null,
};

//------------------------------------------------------------------------------
// APOLLO INTEGRATION:
//------------------------------------------------------------------------------
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
      curUser: user,
      refetch,
    };
  },
});

//------------------------------------------------------------------------------

export default withData(GlobalDataProvider);
