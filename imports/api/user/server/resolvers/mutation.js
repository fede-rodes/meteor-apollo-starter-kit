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
  const { userId } = context;

  // User should be logged in at this stage
  if (!userId) {
    throw new GraphQLError('User should be logged in at sendVerificationLink');
  }

  // Make sure the user exists in our database
  const user = User.collection.findOne({ _id: userId });
  if (!user || !user.emails || !user.emails[0]) {
    throw new GraphQLError('The user is not registered in our database');
  }

  if (user.emails[0].verified === true) {
    throw new GraphQLError('Email already verified!');
  }

  try {
    Accounts.sendVerificationEmail(userId);
  } catch (exc) {
    console.log(exc);
    throw new GraphQLError(`Verification email couldn't be delivered. Reason: ${exc.response}`);
  }

  console.log('Verification email sent!');
  return { _id: userId };
};
//------------------------------------------------------------------------------

export default Mutation;
