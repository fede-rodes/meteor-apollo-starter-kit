const typeDefs = `
type User {
  _id: String
  randomString: String
}

type Query {
  user: User
}

type Mutation {
  sendVerificationEmail: User
  sendResetPasswordEmail(email: String!): User
}
`;

export default typeDefs;
