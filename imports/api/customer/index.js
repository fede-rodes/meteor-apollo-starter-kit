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
  import utilities from './server/utilities.js';
  import resolvers from './server/resolvers/index.js';
  import schema from './server/schema.js';

  extend(Customer, {
    collection,
    utilities,
    resolvers,
    schema,
  });
}

export default Customer;
