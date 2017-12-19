import { Accounts } from 'meteor/accounts-base';
import { GraphQLError } from 'graphql';
import utilities from '../utilities';

// Wrap utilities with namespace for clarity
const User = { utilities };

// User mutation resolvers
const Mutation = {};

//------------------------------------------------------------------------------
Mutation.sendVerificationEmail = (root, args, context) => {
  console.log('About to send verification email...');
  const { userId } = context;

  // TODO: pass email to verify as an argument
  User.utilities.checkLoggedInAndNotVerified(userId);

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
