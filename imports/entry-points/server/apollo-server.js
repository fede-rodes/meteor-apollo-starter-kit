import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes } from 'merge-graphql-schemas';
import merge from 'lodash/merge';
import Base from '../../api/base/index.js';
import User from '../../api/user/index.js';

const typeDefs = mergeTypes([
  Base.types,
  User.types,
]);

const resolvers = merge(
  Base.resolvers,
  User.resolvers,
);

const logger = { log: e => console.error(e.stack) };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
});

createApolloServer({ schema });
