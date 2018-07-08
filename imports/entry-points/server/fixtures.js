import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Users from '../../api/users/';

const { admins } = Meteor.settings;

// Insert admin users
admins.forEach(({ email, roles }) => {
  const user = Users.collection.findOne({ 'emails.address': email });

  // In case user already exists, do nothing
  if (user) {
    return;
  }

  // Otherwise, insert user and set his role to 'admin'
  const userId = Accounts.createUser({ email });
  Roles.addUsersToRoles(userId, roles);
});

// OBSERVATION: use the following operation to set email to verified:
// db.users.update(
//   {_id: "yourUserId", "emails.address": "yourEmailGoesHere"},
//   {$set: {"emails.$.verified": true }}
// )
