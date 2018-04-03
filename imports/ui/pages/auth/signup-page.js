import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/smart/seo';
import AuthPageProps from '../../render-props/auth-page-props';
import AuthPageLayout from '../../layouts/auth-page';
import { PasswordAuthViews, FBAuthBtn } from '../../components/smart/auth';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// OBSERVATION: in case of facebook authentication, authPageProps.handleSuccess
// is only reachable when using 'popup' loginStyle at serviceConfiguration. On
// the contrary, when loginStyle equals 'redirect', the page will be re-loaded
// just after the response is coming back from facebook and therefore this hook
// will never be fired.

// On the other hand, after authPageProps.handleSuccess is fired, the user
// logged-in-state will change from 'logged out' to 'logged in'. This will
// trigger the LoggedOutRoute component's logic (said component wraps the
// SignupPage component) which will result in redirecting the user to home page
// automatically.
const SignupPage = () => [
  <SEO
    key="seo"
    schema="AboutPage"
    title="Sign Up Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,
  <AuthPageProps key="view">
    {({
      service,
      disabled,
      errorMsg,
      successMsg,
      handleBefore,
      handleClientError,
      handleServerError,
      handleSuccess,
    }) => (
      <AuthPageLayout
        title="Sign Up"
        subtitle="Already have an account?&nbsp;"
        link={<Link to="/login">Log In</Link>}
      >
        <PasswordAuthViews
          view="signup"
          btnLabel="Sign Up"
          disabled={disabled}
          onBeforeHook={() => handleBefore({ service: 'password' })}
          onClientErrorHook={handleClientError}
          onServerErrorHook={handleServerError}
          onSuccessHook={handleSuccess}
        />
        {service === 'password' && (
          <Feedback
            loading={disabled}
            errorMsg={errorMsg}
            successMsg={successMsg}
          />
        )}
        <div className="center">
          - OR -
        </div>
        <FBAuthBtn
          btnLabel="Sign Up with Facebook"
          disabled={disabled}
          onBeforeHook={() => handleBefore({ service: 'facebook' })}
          onServerErrorHook={handleServerError}
          onSuccessHook={handleSuccess}
        />
        {service === 'facebook' && (
          <Feedback
            loading={disabled}
            errorMsg={errorMsg}
            successMsg={successMsg}
          />
        )}
      </AuthPageLayout>
    )}
  </AuthPageProps>,
];

export default SignupPage;

/*
import React from 'react';
import SEO from '../../components/smart/seo';
import AuthPageProps from '../../render-props/auth-page-props';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const PAGE = {
  name: 'signup',
  title: 'Sign Up',
  subtitle: 'Already have an account?&nbsp;',
  linkTo: 'login',
  linkLabel: 'Log In',
  btnLabel: 'Sign Up',
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// OBSERVATION: in case of facebook authentication, authPageProps.handleSuccess
// is only reachable when using 'popup' loginStyle at serviceConfiguration. On
// the contrary, when loginStyle equals 'redirect', the page will be re-loaded
// just after the response is coming back from facebook and therefore this hook
// will never be fired.

// On the other hand, after authPageProps.handleSuccess is fired, the user
// logged-in-state will change from 'logged out' to 'logged in'. This will
// trigger the LoggedOutRoute component's logic (said component wraps the
// SignupPage component) which will result in redirecting the user to home page
// automatically.
const SignupPage = () => (
  <AuthPageProps>
    {authPageProps => (
      <div>
        <SEO
          schema="AboutPage"
          title="Signup Page"
          description="A starting point for Meteor applications."
          contentType="product"
        />
        <AuthPageLayout
          page={PAGE}
          // Pass all state values and methods from authPageProps
          {...authPageProps}
        />
      </div>
    )}
  </AuthPageProps>
);

export default SignupPage;
*/
