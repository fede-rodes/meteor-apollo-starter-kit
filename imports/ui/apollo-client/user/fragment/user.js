import gql from 'graphql-tag';

const userFragment = gql`
  fragment userFragment on User {
    _id
    createdAt
    services
    emails {
      address
      verified
    }
    profile {
      name
      gender
      avatar
    }
    subscriptions {
      endpoint
      keys {
        auth
        p256dh
      }
    }
  }
`;

export default userFragment;
