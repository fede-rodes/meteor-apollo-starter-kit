import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  console.log(`sign up attempt: ${new Date()}`);

  // Only allow facebook signup
  if (!user.services.facebook) {
    throw new Error('Sign up attempt with service different that facebook');
  }

  const { id, name, gender, email } = user.services.facebook;
  console.log(`facebook sign up. name: ${name}, id: ${id}, gender: ${gender}, email: ${email}`);

  // Extend user profile by adding facebook data
  const userFB = user;
  userFB.profile = { name, gender };
  userFB.avatar = `http://graph.facebook.com/${id}/picture/`;
  return userFB;
});

// avatar: `http://graph.facebook.com/${id}/picture/?type=large`,
// Should we add avatar to profile? email to emails?


/* import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash'; */

//------------------------------------------------------------------------------
/**
* @summary Reject login attempt in case user doc contains the 'accountDeactivated'
* flag set to 'true'.
* http://docs.meteor.com/#/full/accounts_validateloginattempt
* http://stackoverflow.com/questions/22702305/banning-system-with-meteor-accounts
*/
/* Accounts.validateLoginAttempt((info) => {
  const user = info.user;
  const reject = !_.isUndefined(user) && !_.isUndefined(user.accountDeactivated) && user.accountDeactivated === true;

  // In case user is not defined, that will be catched by the built-in login method
  if (reject) {
    throw new Meteor.Error(403, 'Account has been Deactivated');
  }
  return true;
}); */
