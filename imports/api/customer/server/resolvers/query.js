import { GraphQLError } from 'graphql';
import User from '../../../user/index.js';
import collection from '../collection.js';

// Attach namespace to collection for clarity
const Customer = { collection };

// Customer query resolvers
const Query = {};

//------------------------------------------------------------------------------
Query.customer = (root, args, context) => {
  // Get current user
  const { userId: curUserId } = context;
  const { userId } = args;

  User.utilities.checkLoggedInAndVerified(curUserId);

  try {
    return Customer.collection.findOne({ userId });
  } catch (exc) {
    console.log(exc);
    throw new GraphQLError(`Query couldn't be processed. Reason: ${exc}`);
  }
};
//------------------------------------------------------------------------------

export default Query;
