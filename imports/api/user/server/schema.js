// User namespace schema
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

  type User {
    _id: String!
    createdAt: Date!
    services: [String]!
    emails: [Email]
    profile: Profile!
  }

  type Query {
    user: User
  }

  type Mutation {
    sendVerificationEmail: User
  }
`;

export default schema;
