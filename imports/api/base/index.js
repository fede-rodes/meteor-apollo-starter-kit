import { Meteor } from 'meteor/meteor';
import { extend } from 'lodash';

/**
 * @namespace Base
 * @summary In here we define common types and scalars used accross the app.
 */
const Base = {};

// Load client-side, both utilities

// Load server-only utilities
if (Meteor.isServer) {
  import resolvers from './server/resolvers/index.js';
  import schema from './server/schema.js';

  extend(Base, { resolvers, schema });
}

export default Base;
