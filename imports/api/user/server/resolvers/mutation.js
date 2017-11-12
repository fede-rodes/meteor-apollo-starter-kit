import { Accounts } from 'meteor/accounts-base';
import { GraphQLError } from 'graphql';
import collection from '../collection.js';

// Attach namespace to collection for clarity
const User = { collection };

// User mutation resolvers
const Mutation = {};

//------------------------------------------------------------------------------
Mutation.sendVerificationEmail = (root, args, context) => {
  console.log('About to send verification email...');
  const { user: curUser } = context;

  // User should be logged in at this stage
  if (!curUser) {
    throw new GraphQLError('User should be logged in at sendVerificationLink');
  }

  // Make sure the user exists in our database
  const curUserId = curUser._id;
  const user = User.collection.findOne({ _id: curUserId });
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

export default Mutation;
