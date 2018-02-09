import React from 'react';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../apollo-client/user';
import { LogoutBtn } from '../components/smart/auth';
import SubscribeBtn from '../components/smart/pwa/subscribe-btn';
import PushBtn from '../components/smart/pwa/push-btn';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ProfilePage = ({ curUser }) => (
  <div>
    <SubscribeBtn />
    <div className="my1" />
    <PushBtn />
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
