import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import userFragment from './apollo-client/fragments/user.graphql';
import userQuery from './apollo-client/queries/user.graphql';
import Loading from './components/loading.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Injects global data (current user and/or global settings to name a
 * few examples) into child components.
 */
class GlobalDataProvider extends React.Component {
  componentWillMount() {
    // Patch to handle FB auth request when using redirect login style
    const handler = Meteor.setTimeout(() => {
      this.props.refetch();
      Meteor.clearTimeout(handler);
    }, 500);
  }

  render() {
    const { refetch, hasErrors, userLoading, curUser, children, ...rest } = this.props;

    if (hasErrors) {
      return <div>Something bad happend!</div>;
    }

    if (userLoading) {
      return <Loading />;
    }

    return React.cloneElement(children, { refetch, curUser, ...rest });
  }
}

GlobalDataProvider.propTypes = {
  hasErrors: PropTypes.bool,
  refetch: PropTypes.func,
  userLoading: PropTypes.bool,
  curUser: propType(userFragment),
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
    if (loading) {
      return { userLoading: true };
    }

    if (error) {
      console.log(error);
      return { hasErrors: true };
    }

    return {
      curUser: user,
      refetch,
    };
  },
});

//------------------------------------------------------------------------------

export default withData(GlobalDataProvider);
