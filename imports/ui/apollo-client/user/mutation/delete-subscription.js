import gql from 'graphql-tag';

const deleteSubscriptionMutation = gql`
  mutation deleteSubscription($endpoint: String!) {
    deleteSubscription(endpoint: $endpoint) {
      _id
    }
  }
`;

export default deleteSubscriptionMutation;
