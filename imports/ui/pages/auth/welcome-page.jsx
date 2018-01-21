import React from 'react';
import authPageState, { authPageProps } from '../../hocs/auth-page-state';
import { ResendVerificationLink, LogoutBtn } from '../../components/smart/auth';
import Title from '../../components/dumb/title';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class WelcomePage extends React.Component {
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
        errorMsg,
        successMsg,
        disabled,
        handleBefore,
        handleServerError,
      },
    } = this.props;

    const resendLink = (
      <ResendVerificationLink
        label="here"
        disabled={disabled}
        onBeforeHook={handleBefore}
        onServerErrorHook={handleServerError}
        onSuccessHook={this.handleSuccess}
      />
    );

    return (
      <div>
        <Title>Thanks for joining!</Title>
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
        <LogoutBtn />
      </div>
    );
  }
}

WelcomePage.propTypes = {
  authPage: authPageProps.isRequired,
};

// authPageState provides common state fields and methods used accross all auth pages.
export default authPageState(WelcomePage);
