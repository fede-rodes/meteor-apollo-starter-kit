import React from 'react';
import SEO from '../../components/smart/seo';
import FormProps from '../../render-props/form-props';
import AuthPageLayout from '../../layouts/auth-page';
import { ResendVerificationLink } from '../../components/smart/auth';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const WelcomePage = () => [
  <SEO
    key="seo"
    schema="AboutPage"
    title="Welcome Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,
  <FormProps key="view">
    {(formProps) => {
      const {
        disabled,
        errorMsg,
        successMsg,
        setSuccessMessage,
        handleBefore,
        handleServerError,
        handleSuccess,
      } = formProps;

      const resendLink = (
        <ResendVerificationLink
          label="here"
          disabled={disabled}
          onBeforeHook={handleBefore}
          onServerErrorHook={handleServerError}
          onSuccessHook={() => {
            // Extend formProps.handleSuccess' default functionality
            handleSuccess(() => {
              // Display success message after action is completed
              setSuccessMessage('A new email has been sent to your inbox!');
            });
          }}
        />
      );

      return (
        <AuthPageLayout title="Thanks for joining!">
          <p className="center">
            <strong>Check your email</strong> and click on the link provided to confirm your account.
          </p>
          <p className="center">
            If you did not receive an email, click {resendLink} to resend the confirmation link.
          </p>
          <Feedback
            loading={disabled}
            errorMsg={errorMsg}
            successMsg={successMsg}
          />
        </AuthPageLayout>
      );
    }}
  </FormProps>,
];

export default WelcomePage;
