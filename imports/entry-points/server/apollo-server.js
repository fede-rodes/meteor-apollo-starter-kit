import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from '../../api/server/schema.js';
import resolvers from '../../api/server/resolvers/index.js';

const logger = { log: e => console.error(e.stack) };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
});

createApolloServer({ schema });
