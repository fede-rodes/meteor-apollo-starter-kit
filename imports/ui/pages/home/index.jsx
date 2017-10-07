import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import DefaultLayout from '../../layouts/default/index.jsx';
import LogoutButton from '../../components/logout-button.jsx';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = ({ history, client, refetch, currentUser }) => (
  <DefaultLayout>
    {currentUser
      ? (
        <div>
          <LogoutButton
            onLogoutHook={() => {
              client.resetStore();
              history.push('/login');
            }}
          />
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>
          <button onClick={() => refetch()}>Refetch the query!</button>
        </div>
      )
      : 'Please log in!'
    }
  </DefaultLayout>
);

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    randomString: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(withApollo(HomePage));
