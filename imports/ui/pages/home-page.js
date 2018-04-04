import React from 'react';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../apollo-client/user';
import { PWABtnProps, FormProps } from '../render-props';
import SEO from '../components/smart/seo';
import SubscribeBtn from '../components/smart/pwa/subscribe-btn';
import UnsubscribeBtn from '../components/smart/pwa/unsubscribe-btn';
import PushBtn from '../components/smart/pwa/push-btn';
import Feedback from '../components/dumb/feedback';
import Alert from '../components/dumb/alert';
import Loading from '../components/dumb/loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = ({ curUser }) => [
  <SEO
    key="seo"
    schema="AboutPage"
    title="Home Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,
  <PWABtnProps key="view">
    {(pwaBtnProps) => {
      const {
        supported,
        subscribed,
        handleSubscriptionChange,
      } = pwaBtnProps;

      return (
        <FormProps>
          {(formProps) => {
            const {
              disabled,
              errorMsg,
              successMsg,
              handleBefore,
              handleServerError,
              handleSuccess,
            } = formProps;

            // Display loading indicator while checking for push support
            if (supported === 'loading') {
              return <Loading />;
            }

            // Do not render subscribe and push notification buttons in case
            // notifications aren't supported
            if (!supported) {
              return (
                <Alert
                  type="error"
                  content="Your browser doesn't support service workers"
                />
              );
            }

            return (
              <div>
                {subscribed ? (
                  <UnsubscribeBtn
                    disabled={disabled}
                    onBeforeHook={handleBefore}
                    onServerErrorHook={handleServerError}
                    onSuccessHook={() => {
                      handleSubscriptionChange({ subscribed: false });
                      handleSuccess();
                    }}
                  />
                ) : (
                  <SubscribeBtn
                    disabled={disabled}
                    onBeforeHook={handleBefore}
                    onServerErrorHook={handleServerError}
                    onSuccessHook={() => {
                      handleSubscriptionChange({ subscribed: true });
                      handleSuccess();
                    }}
                  />
                )}
                <div className="my1" />
                {subscribed && (
                  <PushBtn
                    disabled={disabled}
                    onBeforeHook={handleBefore}
                    onServerErrorHook={handleServerError}
                    onSuccessHook={handleSuccess}
                  />
                )}
                <div className="my1" />
                <Feedback
                  loading={disabled}
                  errorMsg={errorMsg}
                  successMsg={successMsg}
                />
                <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(curUser, null, 2)}
                </pre>
              </div>
            );
          }}
        </FormProps>
      );
    }}
  </PWABtnProps>,
];

HomePage.propTypes = {
  curUser: propType(userFragment).isRequired,
};

export default HomePage;
