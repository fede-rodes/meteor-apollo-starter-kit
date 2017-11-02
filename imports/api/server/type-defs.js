const typeDefs = `
type User {
  _id: String
  randomString: String
}

type ResponseStatus {
  status: String!
  error: String
}

type Query {
  user: User
}

type Mutation {
  sendVerificationEmail: ResponseStatus
}
`;

export default typeDefs;
