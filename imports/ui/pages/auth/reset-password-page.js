import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuxFunctions from '../../../api/aux-functions';
import AuthPageProps from '../../render-props/auth-page-props';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const PAGE = {
  name: 'resetPassword',
  title: 'Reset your Password',
  // subtitle: '',
  // linkTo: '',
  // linkLabel: '',
  btnLabel: 'Reset Password',
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// OBSERVATION: after authPageProps.handleSuccess is fired, the user
// logged-in-state will change from 'logged out' to 'logged in'. This will
// trigger the LoggedOutRoute component's logic (said component wraps the
// LoginPage component) which will result in redirecting the user to home page
// automatically.
const ResetPasswordPage = ({ match }) => {
  // Get token from url params
  const token = (match && match.params && match.params.token) || '';

  return (
    <AuthPageProps>
      {authPageProps => (
        <AuthPageLayout
          page={PAGE}
          token={token}
          // Pass all state values and methods from authPageProps
          {...authPageProps}
          // Overwrite authPageProps.handleSuccess
          handleSuccess={() => {
            // Extend authPageProps.handleSuccess' by showing an alert message
            // after action is completed
            authPageProps.handleSuccess(() => {
              AuxFunctions.delayedAlert('Password reset successfully!', 700);
            });
          }}
        />
      )}
    </AuthPageProps>
  );
};

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

// withRouter provides access to match.params
export default withRouter(ResetPasswordPage);
