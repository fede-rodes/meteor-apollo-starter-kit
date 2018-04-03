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
// LoginPage component) which will result in redirecting the user to home page
// automatically.
const LoginPage = () => [
  <SEO
    key="seo"
    schema="AboutPage"
    title="Log In Page"
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
        title="Log In"
        subtitle="Don&apos;t have an account?&nbsp;"
        link={<Link to="/signup">Sign Up</Link>}
      >
        <PasswordAuthViews
          view="login"
          btnLabel="Log In"
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
        <p className="center">
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <div className="center">
          - OR -
        </div>
        <FBAuthBtn
          btnLabel="Log In with Facebook"
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

export default LoginPage;
