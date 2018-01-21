import React from 'react';
import authPageState, { authPageProps } from '../../hocs/auth-page-state';
import AuthPageLayout from '../../layouts/auth-page';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const VIEW = {
  view: 'forgotPassword',
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
class ForgotPasswordPage extends React.PureComponent {
  handleSuccess = () => {
    const { handleSuccess, setSuccessMessage } = this.props.authPage;

    // Extend handleSuccess method provided by authPage HOC
    handleSuccess(() => {
      setSuccessMessage('A new email has been sent to your inbox!');
    });
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

ForgotPasswordPage.propTypes = {
  authPage: authPageProps.isRequired,
};

// authPageState provides common state fields and methods used accross all auth pages.
export default authPageState(ForgotPasswordPage);
