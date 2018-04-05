import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/smart/seo';
import FormProps from '../../render-props/form-props';
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
  <FormProps key="view">
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
            // Extend formProps.handleSuccess' default functionality
            handleSuccess(() => {
              // Display success message after action is completed
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
  </FormProps>,
];

export default ForgotPasswordPage;
