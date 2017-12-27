import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes } from 'merge-graphql-schemas';
import merge from 'lodash/merge';
import * as APIs from '../../../api';

// Filter out those APIs for which 'types' and 'resolvers' are defined. In the
// end we'll get something like the following:
// const allTypes = [Base.types, User.types, ...];
// const allResolvers = [Base.resolvers, User.resolvers, ...];
const allTypes = [];
const allResolvers = [];

const keys = Object.keys(APIs);
const length = keys.length;

for (let i = 0; i < length; i += 1) {
  const key = keys[i];
  const { types, resolvers } = APIs[key];

  if (types && resolvers) {
    allTypes.push(types);
    allResolvers.push(resolvers);
  }
}

// Merge all types and resolvers from APIs to create our executable schema
const typeDefs = mergeTypes(allTypes);
const resolvers = merge(...allResolvers);
const logger = { log: e => console.error(e.stack) };
const schema = makeExecutableSchema({ typeDefs, resolvers, logger });

export default schema;
