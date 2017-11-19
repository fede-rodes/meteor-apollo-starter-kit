import { Meteor } from 'meteor/meteor';
import { extend } from 'lodash';

/**
 * @namespace Plan
 * @summary In here we define utilities related to Plan entities.
 */
const Plan = {};

// Load client-side, both utilities

// Load server-only utilities
if (Meteor.isServer) {
  import collection from './server/collection.js';
  import fixtures from './server/fixtures.js';
  import resolvers from './server/resolvers/index.js';
  import schema from './server/schema.js';

  extend(Plan, {
    collection,
    fixtures,
    resolvers,
    schema,
  });
}

export default Plan;
