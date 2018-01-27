import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../../apollo-client/user';
import AuthPageProps from './auth-page-props';
import { ResendVerificationLink } from '../../components/smart/auth';
import Title from '../../components/dumb/title';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LinkExpiredPage = ({ curUser }) => (
  <AuthPageProps>
    {(authPageProps) => {
      const {
        disabled,
        errorMsg,
        successMsg,
        setSuccessMessage,
        handleBefore,
        handleServerError,
        handleSuccess,
      } = authPageProps;

      const resendLink = (
        <ResendVerificationLink
          label="here"
          disabled={disabled}
          onBeforeHook={handleBefore}
          onServerErrorHook={handleServerError}
          onSuccessHook={() => {
            // Extend authPageProps.handleSuccess to show a success message
            // after action is completed
            handleSuccess(() => {
              setSuccessMessage('A new email has been sent to your inbox!');
            });
          }}
        />
      );

      return (
        <div>
          <Title>The link has expired!</Title>
          <p className="center">
            {curUser
              ? <span>Please, click {resendLink} to resend confirmation link.</span>
              : <span>Please, <Link to="/login">login</Link> to be able to resend confirmation link.</span>
            }
          </p>
          <Feedback
            loading={disabled}
            errorMsg={errorMsg}
            successMsg={successMsg}
          />
        </div>
      );
    }}
  </AuthPageProps>
);

LinkExpiredPage.propTypes = {
  curUser: propType(userFragment),
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};

export default LinkExpiredPage;
