import { Meteor } from 'meteor/meteor';
import extend from 'lodash/extend';

/**
 * @namespace User
 * @summary In here we define utilities related to User entities.
 */
const User = {};

// Load client-side, both utilities

// Load server-only utilities
if (Meteor.isServer) {
  import collection from './server/collection';
  import types from './server/types.graphql';
  import resolvers from './server/resolvers';
  import utilities from './server/utilities';

  extend(User, { collection, types, resolvers, utilities });
}

export default User;
