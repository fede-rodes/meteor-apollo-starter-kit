import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import AuxFunctions from '../../../api/aux-functions';
import SEO from '../../components/smart/seo';
import FormProps from '../../render-props/form-props';
import AuthPageLayout from '../../layouts/auth-page';
import { PasswordAuthViews } from '../../components/smart/auth';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// OBSERVATION: after formProps.handleSuccess is fired, the user
// logged-in-state will change from 'logged out' to 'logged in'. This will
// trigger the LoggedOutRoute component's logic (said component wraps the
// LoginPage component) which will result in redirecting the user to home page
// automatically.
const ResetPasswordPage = ({ match }) => {
  // Get token from url params
  const token = (match && match.params && match.params.token) || '';

  return [
    <SEO
      key="seo"
      schema="AboutPage"
      title="Reset Password Page"
      description="A starting point for Meteor applications."
      contentType="product"
    />,
    <FormProps key="view">
      {({
        disabled,
        errorMsg,
        successMsg,
        handleBefore,
        handleClientError,
        handleServerError,
        handleSuccess,
      }) => (
        <AuthPageLayout title="Reset your Password">
          <PasswordAuthViews
            view="resetPassword"
            btnLabel="Reset Password"
            token={token}
            disabled={disabled}
            onBeforeHook={handleBefore}
            onClientErrorHook={handleClientError}
            onServerErrorHook={handleServerError}
            onSuccessHook={() => {
              // Extend formProps.handleSuccess' default functionality
              handleSuccess(() => {
                // Display alert message after action is completed
                AuxFunctions.delayedAlert('Password reset successfully!', 700);
              });
            }}
          />
          <Feedback
            loading={disabled}
            errorMsg={errorMsg}
            successMsg={successMsg}
          />
          <p className="center">
            <Link to="/forgot-password">Resend reset password link</Link>
          </p>
        </AuthPageLayout>
      )}
    </FormProps>,
  ];
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
