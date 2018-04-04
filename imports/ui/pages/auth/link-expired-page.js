import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../../apollo-client/user';
import SEO from '../../components/smart/seo';
import FormProps from '../../render-props/form-props';
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
  <FormProps key="view">
    {(formProps) => {
      const {
        disabled,
        errorMsg,
        successMsg,
        setSuccessMessage,
        handleBefore,
        handleServerError,
        handleSuccess,
      } = formProps;

      const resendLink = (
        <ResendVerificationLink
          label="here"
          disabled={disabled}
          onBeforeHook={handleBefore}
          onServerErrorHook={handleServerError}
          onSuccessHook={() => {
            // Extend formProps.handleSuccess' default functionality
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
  </FormProps>,
];

LinkExpiredPage.propTypes = {
  curUser: propType(userFragment),
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};

export default LinkExpiredPage;
