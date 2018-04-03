import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../../apollo-client/user';
import SEO from '../../components/smart/seo';
import BtnProps from '../../render-props/btn-props';
import AuthPageLayout from '../../layouts/auth-page';
import { ResendVerificationLink } from '../../components/smart/auth';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LinkExpiredPage = ({ curUser }) => [
  <SEO
    key="seo"
    schema="AboutPage"
    title="Link Expired Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,
  <BtnProps key="view">
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
            // Extend btnProps.handleSuccess' default functionality
            handleSuccess(() => {
              // Display success message after action is completed
              setSuccessMessage('A new email has been sent to your inbox!');
            });
          }}
        />
      );

      return (
        <AuthPageLayout title="The link has expired!">
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
        </AuthPageLayout>
      );
    }}
  </BtnProps>,
];

LinkExpiredPage.propTypes = {
  curUser: propType(userFragment),
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};

export default LinkExpiredPage;


/*
import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../../apollo-client/user';
import SEO from '../../components/smart/seo';
import BtnProps from '../../render-props/btn-props';
import { ResendVerificationLink } from '../../components/smart/auth';
import Title from '../../components/dumb/title';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LinkExpiredPage = ({ curUser }) => (
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
          <SEO
            schema="AboutPage"
            title="Link Expired Page"
            description="A starting point for Meteor applications."
            contentType="product"
          />
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
  </BtnProps>
);

LinkExpiredPage.propTypes = {
  curUser: propType(userFragment),
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};

export default LinkExpiredPage;
*/
