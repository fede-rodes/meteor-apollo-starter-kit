import gql from 'graphql-tag';

const sendPushNotificationMutation = gql`
  mutation {
    sendPushNotification {
      _id
    }
  }
`;

export default sendPushNotificationMutation;
