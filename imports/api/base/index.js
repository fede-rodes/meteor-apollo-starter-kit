import { Meteor } from 'meteor/meteor';
import extend from 'lodash/extend';

/**
 * @namespace Base
 * @summary defines common types and scalars used accross the app.
 */
const Base = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
  import schema from './server/schema';
  import resolvers from './server/resolvers';

  extend(Base, { schema, resolvers });
}

export default Base;
