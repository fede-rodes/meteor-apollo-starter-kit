import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { GraphQLError } from 'graphql';
import _ from 'lodash';

//------------------------------------------------------------------------------
const sendVerificationEmail = (root, args, context) => {
  console.log('About to send verification email...');
  const { user: curUser } = context;

  // User should be logged in at this stage
  if (!curUser) {
    throw new GraphQLError('User should be logged in at sendVerificationLink');
  }

  // Make sure the user exists in our database
  const curUserId = curUser._id;
  const user = Meteor.users.findOne({ _id: curUserId });
  if (!user) {
    throw new GraphQLError('The user is not registered in our database');
  }

  if (user.emails[0].verified === true) {
    throw new GraphQLError('Email already verified!');
  }

  try {
    Accounts.sendVerificationEmail(curUserId);
  } catch (exc) {
    console.log(exc);
    throw new GraphQLError(`Verification email couldn't be delivered. Reason: ${exc.response}`);
  }

  console.log('Verification email sent!');
  return { _id: curUserId };
};
//------------------------------------------------------------------------------
const sendResetPasswordEmail = (root, args, context) => {
  console.log('About to send reset password email...');
  const { email } = args;
  const { user: curUser } = context;

  // User shouldn't be logged in at this stage
  if (curUser) {
    throw new GraphQLError('User shouldn\'t be logged in at sendResetPasswordEmail');
  }

  // Make sure the user exists in our database
  const targetUser = Accounts.findUserByEmail(email);
  if (!targetUser) {
    throw new GraphQLError('User not found');
  }

  // Destructure
  const { _id: targetUserId, accountDeactivated } = targetUser;

  // Prevent user from submitting if account has been deactivated
  if (!_.isUndefined(accountDeactivated) && accountDeactivated === true) {
    throw new GraphQLError('Account has been Deactivated');
  }

  try {
    Accounts.sendResetPasswordEmail(targetUserId, email);
  } catch (exc) {
    console.log(exc);
    throw new GraphQLError(`Reset password email couldn't be delivered. Reason: ${exc.response}`);
  }

  console.log('Reset password email sent!');
  return { _id: targetUserId };
};
//------------------------------------------------------------------------------
const Mutation = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};

export default Mutation;
