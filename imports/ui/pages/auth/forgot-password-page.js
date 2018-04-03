import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/smart/seo';
import AuthPageProps from '../../render-props/auth-page-props';
import AuthPageLayout from '../../layouts/auth-page';
import { PasswordAuthViews } from '../../components/smart/auth';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ForgotPasswordPage = () => [
  <SEO
    key="seo"
    schema="AboutPage"
    title="Log In Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,
  <AuthPageProps key="view">
    {({
      disabled,
      errorMsg,
      successMsg,
      setSuccessMessage,
      handleBefore,
      handleClientError,
      handleServerError,
      handleSuccess,
    }) => (
      <AuthPageLayout
        title="Forgot your Password?"
        subtitle="
          We&apos;ll send a link to your email to reset
          <br />
          your password and get you back on track.
        "
      >
        <PasswordAuthViews
          view="forgotPassword"
          btnLabel="Send Link"
          disabled={disabled}
          onBeforeHook={handleBefore}
          onClientErrorHook={handleClientError}
          onServerErrorHook={handleServerError}
          onSuccessHook={() => {
            // Extend authPageProps.handleSuccess' default functionality
            handleSuccess(() => {
              // Show success message after action is completed
              setSuccessMessage('A new email has been sent to your inbox!');
            });
          }}
        />
        <Feedback
          loading={disabled}
          errorMsg={errorMsg}
          successMsg={successMsg}
        />
        <p className="center">
          <Link to="/login">Log in</Link> | <Link to="/signup">Sign up</Link>
        </p>
      </AuthPageLayout>
    )}
  </AuthPageProps>,
];

export default ForgotPasswordPage;


/*
import React from 'react';
import SEO from '../../components/smart/seo';
import AuthPageProps from '../../render-props/auth-page-props';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const PAGE = {
  name: 'forgotPassword',
  title: 'Forgot your Password?',
  subtitle: `
    We&apos;ll send a link to your email to reset<br />
    your password and get you back on track.
  `,
  // linkTo: '',
  // linkLabel: '',
  btnLabel: 'Send Link',
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ForgotPasswordPage = () => (
  <AuthPageProps>
    {authPageProps => (
      <div>
        <SEO
          schema="AboutPage"
          title="Forgot Password Page"
          description="A starting point for Meteor applications."
          contentType="product"
        />
        <AuthPageLayout
          page={PAGE}
          // Pass all state values and methods from authPageProps
          {...authPageProps}
          // Overwrite authPageProps.handleSuccess
          handleSuccess={() => {
            // Extend btnProps.handleSuccess' default functionality by showing a
            // success message after action is completed
            authPageProps.handleSuccess(() => {
              authPageProps.setSuccessMessage('A new email has been sent to your inbox!');
            });
          }}
        />
      </div>
    )}
  </AuthPageProps>
);

export default ForgotPasswordPage;
*/
