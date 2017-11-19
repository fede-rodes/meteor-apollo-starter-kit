import { Meteor } from 'meteor/meteor';
import { extend } from 'lodash';

/**
 * @namespace Customer
 * @summary In here we define utilities related to Customer entities.
 */
const Customer = {};

// Load client-side, both utilities

// Load server-only utilities
if (Meteor.isServer) {
  import collection from './server/collection.js';
  import types from './server/types.graphql';
  import resolvers from './server/resolvers/index.js';
  import utilities from './server/utilities.js';

  extend(Customer, {
    collection,
    types,
    resolvers,
    utilities,
  });
}

export default Customer;
