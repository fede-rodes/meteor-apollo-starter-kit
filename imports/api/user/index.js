import { Meteor } from 'meteor/meteor';
import { extend } from 'lodash';

/**
 * @namespace User
 * @summary In here we define utilities related to user entities.
 */
const User = {};

// Load client-side, both utilities

// Load server-only utilities
if (Meteor.isServer) {
  import collection from './server/collection.js';
  import resolvers from './server/resolvers/index.js';
  import schema from './server/schema.js';

  extend(User, { collection, resolvers, schema });
}

export default User;
