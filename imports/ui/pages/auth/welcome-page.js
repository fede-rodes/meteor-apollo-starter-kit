import React from 'react';
import BtnProps from '../../render-props/btn-props';
import { ResendVerificationLink, LogoutBtn } from '../../components/smart/auth';
import Title from '../../components/dumb/title';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const WelcomePage = () => (
  <BtnProps>
    {(btnProps) => {
      const {
        disabled,
        errorMsg,
        successMsg,
        setSuccessMessage,
        handleBefore,
        handleServerError,
        handleSuccess,
      } = btnProps;

      const resendLink = (
        <ResendVerificationLink
          label="here"
          disabled={disabled}
          onBeforeHook={handleBefore}
          onServerErrorHook={handleServerError}
          onSuccessHook={() => {
            // Extend btnProps.handleSuccess' default functionality by showing a
            // success message after action is completed
            handleSuccess(() => {
              setSuccessMessage('A new email has been sent to your inbox!');
            });
          }}
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
    }}
  </BtnProps>
);

export default WelcomePage;
