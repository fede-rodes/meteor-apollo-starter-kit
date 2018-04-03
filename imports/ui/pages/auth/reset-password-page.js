import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import AuxFunctions from '../../../api/aux-functions';
import SEO from '../../components/smart/seo';
import AuthPageProps from '../../render-props/auth-page-props';
import AuthPageLayout from '../../layouts/auth-page';
import { PasswordAuthViews } from '../../components/smart/auth';
import Feedback from '../../components/dumb/feedback';

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

  return [
    <SEO
      key="seo"
      schema="AboutPage"
      title="Reset Password Page"
      description="A starting point for Meteor applications."
      contentType="product"
    />,
    <AuthPageProps key="view">
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
              // Extend authPageProps.handleSuccess' default functionality
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
    </AuthPageProps>,
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


/*
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AuxFunctions from '../../../api/aux-functions';
import SEO from '../../components/smart/seo';
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
        <div>
          <SEO
            schema="AboutPage"
            title="Reset Password Page"
            description="A starting point for Meteor applications."
            contentType="product"
          />
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
        </div>
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
*/
