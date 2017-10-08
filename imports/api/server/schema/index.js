// Import schema definition
import Schema from './schema.graphql';

// Import query
import Query from './query.graphql';

// Import types
import User from './user.graphql';

const typeDefs = [
  Schema,
  Query,
  User,
];

export default typeDefs;
