// Schema definition for Users namespace

const schema = `
  type Email {
    address: String
    verified: Boolean
  }

  type Profile {
    name: String!
    gender: String
    avatar: String!
  }

  type Keys {
    auth: String!
    p256dh: String!
  }

  type Subscription {
    endpoint: String!
    keys: Keys!
  }

  input HashedPasswordInput {
    digest: String!
    algorithm: String!
  }

  type User {
    _id: String!
    createdAt: Date!
    services: [String]!
    emails: [Email]
    profile: Profile!
    subscriptions: [Subscription]
  }

  input KeysInput {
    auth: String!
    p256dh: String!
  }

  input SubscriptionInput {
    endpoint: String!
    keys: KeysInput!
  }

  type Query {
    user: User
  }

  type Mutation {
    saveSubscription(subscription: SubscriptionInput!): User
    deleteSubscription(endpoint: String!): User
    sendPushNotification: User
  }
`;

export default schema;
