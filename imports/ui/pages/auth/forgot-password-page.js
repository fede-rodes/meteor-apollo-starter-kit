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
