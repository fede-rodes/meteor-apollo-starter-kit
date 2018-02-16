import React from 'react';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../apollo-client/user';
import { PWABtnProps, BtnProps } from '../render-props';
import { LogoutBtn } from '../components/smart/auth';
import SubscribeBtn from '../components/smart/pwa/subscribe-btn';
import UnsubscribeBtn from '../components/smart/pwa/unsubscribe-btn';
import PushBtn from '../components/smart/pwa/push-btn';
import Feedback from '../components/dumb/feedback';
import Alert from '../components/dumb/alert';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfilePage = ({ curUser }) => (
  <div>
    <PWABtnProps>
      {pwaBtnProps => (
        <BtnProps>
          {(btnProps) => {
            // Do not render subscribe and push notification buttons in case
            // notifications aren't supported
            if (!pwaBtnProps.supported) {
              return (
                <Alert
                  type="error"
                  content="Your browser doesn't support service workers :("
                />
              );
            }

            return (
              <div>
                {pwaBtnProps.subscribed ? (
                  <UnsubscribeBtn
                    disabled={btnProps.disabled}
                    onBeforeHook={btnProps.handleBefore}
                    onServerErrorHook={btnProps.handleServerError}
                    onSuccessHook={() => {
                      pwaBtnProps.handleSubscriptionChange({ subscribed: false });
                      btnProps.handleSuccess();
                    }}
                  />
                ) : (
                  <SubscribeBtn
                    disabled={btnProps.disabled}
                    onBeforeHook={btnProps.handleBefore}
                    onServerErrorHook={btnProps.handleServerError}
                    onSuccessHook={() => {
                      pwaBtnProps.handleSubscriptionChange({ subscribed: true });
                      btnProps.handleSuccess();
                    }}
                  />
                )}
                <div className="my1" />
                {pwaBtnProps.subscribed && (
                  <PushBtn
                    disabled={btnProps.disabled}
                    onBeforeHook={btnProps.handleBefore}
                    onServerErrorHook={btnProps.handleServerError}
                    onSuccessHook={btnProps.handleSuccess}
                  />
                )}
                <Feedback
                  loading={btnProps.disabled}
                  errorMsg={btnProps.errorMsg}
                  successMsg={btnProps.successMsg}
                />
              </div>
            );
          }}
        </BtnProps>
      )}
    </PWABtnProps>
    <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(curUser, null, 2)}
    </pre>
    <LogoutBtn />
  </div>
);

ProfilePage.propTypes = {
  curUser: propType(userFragment).isRequired,
};

export default ProfilePage;
