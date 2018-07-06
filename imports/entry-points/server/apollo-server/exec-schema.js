import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mergeTypes } from 'merge-graphql-schemas';
import merge from 'lodash/merge';
import * as APIs from '../../../api';

// Filter out those APIs for which 'types' and 'resolvers' are defined. In the
// end we'll get something like the following:
// const allTypes = [Base.types, Users.types, ...];
// const allResolvers = [Base.resolvers, Users.resolvers, ...];
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

if (process.env.NODE_ENV === 'test') {
  // Here you could customize the mocks.
  // If you leave it empty, the default is used.
  // You can read more about mocking here: http://bit.ly/2pOYqXF
  // See:
  // https://www.apollographql.com/docs/graphql-tools/mocking.html#Default-mock-example
  // https://dev-blog.apollodata.com/mocking-your-server-with-just-one-line-of-code-692feda6e9cd
  const mocks = {
    Date: () => (new Date()),
  };

  // This function call adds the mocks to your schema!
  addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true });
}

export default schema;
