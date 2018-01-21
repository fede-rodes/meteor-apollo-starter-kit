import React from 'react';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../apollo-client/user';
import { LogoutBtn } from '../components/smart/auth';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = ({ curUser }) => (
  <div>
    <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(curUser, null, 2)}
    </pre>
    <LogoutBtn />
  </div>
);

HomePage.propTypes = {
  curUser: propType(userFragment).isRequired,
};

export default HomePage;
