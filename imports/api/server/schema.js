const typeDefs = [
  `
    type Email {
      address: String
      verified: Boolean
    }

    type User {
      emails: [Email]
      randomString: String
      _id: String
    }

    type Query {
      user: User
    }
  `,
];

export default typeDefs;
