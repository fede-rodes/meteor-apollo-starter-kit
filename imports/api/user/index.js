import { Meteor } from 'meteor/meteor';
import extend from 'lodash/extend';

/**
 * @namespace User
 * @summary In here we define utilities related to User entities.
 */
const User = {};

// Load client-side, both utilities
if (Meteor.isClient) {
  // TODO
}

// Load server-only utilities
if (Meteor.isServer) {
  import collection from './server/collection.js';
  import types from './server/types.graphql';
  import resolvers from './server/resolvers/index.js';
  import utilities from './server/utilities.js';

  extend(User, { collection, types, resolvers, utilities });
}

export default User;
