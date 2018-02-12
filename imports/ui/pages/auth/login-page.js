import React from 'react';
import AuthPageProps from '../../render-props/auth-page-props';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const PAGE = {
  name: 'login',
  title: 'Log In',
  subtitle: 'Don&apos;t have an account?&nbsp;',
  linkTo: 'signup',
  linkLabel: 'Sign Up',
  btnLabel: 'Log In',
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
// LoginPage component) which will result in redirecting the user to home page
// automatically.
const LoginPage = () => (
  <AuthPageProps>
    {authPageProps => (
      <AuthPageLayout
        page={PAGE}
        // Pass all states and methods from authPageProps
        {...authPageProps}
      />
    )}
  </AuthPageProps>
);

export default LoginPage;
