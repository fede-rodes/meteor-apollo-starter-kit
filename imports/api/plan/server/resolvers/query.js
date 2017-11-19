import { GraphQLError } from 'graphql';
import User from '../../../user/index.js';
import collection from '../collection.js';

// Attach namespace to collection for clarity
const Plan = { collection };

// Plan query resolvers
const Query = {};

//------------------------------------------------------------------------------
Query.plans = (root, args, context) => {
  // Get current user
  const { userId } = context;

  User.utilities.checkLoggedInAndVerified(userId);

  try {
    return Plan.collection.find({}).fetch();
  } catch (exc) {
    console.log(exc);
    throw new GraphQLError(`Query couldn't be processed. Reason: ${exc}`);
  }
};
//------------------------------------------------------------------------------

export default Query;
