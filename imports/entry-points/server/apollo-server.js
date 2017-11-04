import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import Base from '../../api/base/index.js';
import User from '../../api/user/index.js';

const typeDefs = [
  Base.schema,
  User.schema,
];

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
