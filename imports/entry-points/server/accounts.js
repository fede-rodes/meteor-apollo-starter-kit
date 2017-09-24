/* import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'underscore'; */

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
