import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Users from '../../api/users/';

// OBSERVATION: use the following mutation to set email to verified:
// db.users.update(
//   {_id: "yourUserId", "emails.address": "yourEmailGoesHere"},
//   {$set: {"emails.$.verified": true }}
// )

// Insert admin user
const users = [
  { email: 'admin@admin.com', password: '123456', roles: ['admin'] },
];

users.forEach(({ email, password, roles }) => {
  const userExists = Users.collection.findOne({ 'emails.address': email });

  // In case user already exists, do nothing
  if (userExists) {
    return;
  }

  // Otherwise, insert user and set his role to 'admin'
  const userId = Accounts.createUser({ email, password });
  Roles.addUsersToRoles(userId, roles);
});
