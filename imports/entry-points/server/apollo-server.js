import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes } from 'merge-graphql-schemas';
import { merge } from 'lodash';
import Base from '../../api/base/index.js';
import User from '../../api/user/index.js';
import Plan from '../../api/plan/index.js';
import Customer from '../../api/customer/index.js';

const typeDefs = mergeTypes([
  Base.types,
  User.types,
  Plan.types,
  Customer.types,
]);

const resolvers = merge(
  Base.resolvers,
  User.resolvers,
  Plan.resolvers,
  Customer.resolvers,
);

const logger = { log: e => console.error(e.stack) };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger,
});

createApolloServer({ schema });
