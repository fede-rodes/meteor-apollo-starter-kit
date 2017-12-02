import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes } from 'merge-graphql-schemas';
import merge from 'lodash/merge';
import Base from '../../base/index.js';
import User from '../../user/index.js';

const typeDefs = mergeTypes([
  Base.types,
  User.types,
]);

const resolvers = merge(
  Base.resolvers,
  User.resolvers,
);

const logger = { log: e => console.error(e.stack) };

const schema = makeExecutableSchema({ typeDefs, resolvers, logger });

export default schema;
