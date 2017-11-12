import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

//------------------------------------------------------------------------------
// COLLECTION:
//------------------------------------------------------------------------------
// collection = new Mongo.Collection('users');
const collection = Meteor.users;

//------------------------------------------------------------------------------
// ALLOW & DENY RULES:
//------------------------------------------------------------------------------
/**
 * @see {@link https://themeteorchef.com/recipes/building-a-user-admin/}
 * To save face, we can “lock down” all of our rules when we define our collection
 * to prevent any client-side database operations from taking place. This means
 * that when we interact with the database, we’re required to do it from the server
 * (a trusted environment) via methods.
 * @see {@link http://docs.meteor.com/#/full/deny}
 * When a client tries to write to a collection, the Meteor server first checks the
 * collection's deny rules. If none of them return true then it checks the
 * collection's allow rules. Meteor allows the write only if no deny rules return
 * true and at least one allow rule returns true.
 */
collection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

collection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

//------------------------------------------------------------------------------
// SCHEMA(S):
//------------------------------------------------------------------------------
/**
 * @see {@link http://themeteorchef.com/snippets/using-the-collection2-package/}
 */
const schema = new SimpleSchema({

  createdAt: {
    type: Date,
  },

  profile: {
    type: Object,
    optional: true,
  },

  'profile.name': {
    type: String,
    max: 150,
    optional: true,
  },

  'profile.gender': {
    type: String,
    max: 50,
    optional: true,
  },

  'profile.avatar': {
    type: String,
    max: 150,
    optional: true,
  },

  // this must be optional if you also use other login services like facebook,
  // but if you use only accounts-password, then it can be required
  emails: {
    type: Array,
    label: '[{ address, verified }, ...]',
    optional: true,
  },

  'emails.$': {
    type: Object,
  },

  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },

  'emails.$.verified': {
    type: Boolean,
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },

  accountDeactivated: {
    type: Boolean,
    optional: true,
  },

  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },

});

collection.attachSchema(schema);

export default collection;
