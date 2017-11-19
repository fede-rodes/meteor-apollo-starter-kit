// Customer namespace schema
const schema = `
  type Card {
    brand: String!
    last4: String!
  }

  type Subscription {
    id: String!
    status: String!
    plan: String!
    currentPeriodEnd: String!
  }

  type Customer {
    _id: String!
    userId: String!
    stripeId: String!
    card: Card!
    subscription: Subscription!
  }

  type Query {
    customer(userId: String!): Customer
  }

  type Response {
    id: String
    object: String
    amount: String
  }

  type Mutation {
    createOneTimeCharge(planId: String!, source: String!): Response
    createSubscription(planId: String!, source: String!): Response
  }
`;

export default schema;
