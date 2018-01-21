import React from 'react';
import authPageState, { authPageProps } from '../../hocs/auth-page-state';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const VIEW = {
  view: 'signup',
  title: 'Sign Up',
  subtitle: 'Already have an account?&nbsp;',
  linkTo: 'login',
  linkLabel: 'Log In',
  btnLabel: 'Sign Up',
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SignupPage extends React.PureComponent {
  // This method is just for consistency, it doesn't do anything really!
  handleSuccess = () => {
    const { handleSuccess } = this.props.authPage;

    // Do nothing, just call handleSuccess from authPage HOC.
    handleSuccess();

    // OBSERVATION: in case of facebook auth service, this code is only
    // reachable when using 'popup' loginStyle at serviceConfiguration. In
    // case of loginStyle equals 'redirect', the page will be re-loaded
    // after the response is returned by facebook and therefore this hook
    // will never be fired.

    // At this point, the user logged-in-state will change from 'logged out'
    // to 'logged in'. This will trigger the LoggedOutRoute component's
    // logic which will result in redirecting the user to home page '/'.
  }

  render() {
    const {
      authPage: {
        service,
        errorMsg,
        successMsg,
        disabled,
        changeViewTo,
        handleBefore,
        handleClientError,
        handleServerError,
      },
    } = this.props;

    return (
      <AuthPageLayout
        view={VIEW}
        service={service}
        errorMsg={errorMsg}
        successMsg={successMsg}
        disabled={disabled}
        changeViewTo={changeViewTo}
        onBeforeHook={handleBefore}
        onClientErrorHook={handleClientError}
        onServerErrorHook={handleServerError}
        onSuccessHook={this.handleSuccess}
      />
    );
  }
}

SignupPage.propTypes = {
  authPage: authPageProps.isRequired,
};

// authPageState provides common state fields and methods used accross all auth pages.
export default authPageState(SignupPage);
