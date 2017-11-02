// Import schema definition
import Schema from './schema.graphql';

// Import query
import Query from './query.graphql';

// Import mutation
import Mutation from './mutation.graphql';

// Import types
import User from './user.graphql';

const typeDefs = [
  Schema,
  Query,
  Mutation,
  User,
];

export default typeDefs;
