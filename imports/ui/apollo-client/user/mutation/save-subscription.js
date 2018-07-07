import gql from 'graphql-tag';

const saveSubscriptionMutation = gql`
  mutation saveSubscription($subscription: SubscriptionInput!) {
    saveSubscription(subscription: $subscription) {
      _id
    }
  }
`;

export default saveSubscriptionMutation;
