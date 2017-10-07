const typeDefs = [
  `
    type User {
      _id: String
      randomString: String
    }

    type Query {
      user: User
    }
  `,
];

export default typeDefs;


/*
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
*/
