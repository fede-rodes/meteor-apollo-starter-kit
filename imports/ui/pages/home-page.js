import React from 'react';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../apollo-client/user';
import BtnProps from '../render-props/btn-props';
import { LogoutBtn } from '../components/smart/auth';
import SubscribeBtns from '../components/smart/pwa/subscribe-btns';
import PushBtn from '../components/smart/pwa/push-btn';
import Feedback from '../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfilePage = ({ curUser }) => (
  <div>
    <BtnProps>
      {(btnProps) => {
        const {
          disabled,
          errorMsg,
          successMsg,
          handleBefore,
          handleServerError,
          handleSuccess,
        } = btnProps;

        return (
          <div>
            <SubscribeBtns
              disabled={disabled}
              onBeforeHook={handleBefore}
              onServerErrorHook={handleServerError}
              onSuccessHook={handleSuccess}
            />
            <div className="my1" />
            <PushBtn
              disabled={disabled}
              onBeforeHook={handleBefore}
              onServerErrorHook={handleServerError}
              onSuccessHook={handleSuccess}
            />
            <Feedback
              loading={disabled}
              errorMsg={errorMsg}
              successMsg={successMsg}
            />
          </div>
        );
      }}
    </BtnProps>
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
