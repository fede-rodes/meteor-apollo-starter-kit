import collection from '../../collection';
import utils from '../../utils';

// Wrap collection and utils around namespace for clarity
const Users = { collection, utils };

//------------------------------------------------------------------------------
/**
* @summary Save subscription into user's record.
*/
const saveSubscription = (root, args, context) => {
  const { subscription } = args;
  const { userId } = context;

  Users.utils.checkLoggedInAndVerified(userId);

  const selector = { _id: userId };
  const modifier = { $addToSet: { subscriptions: subscription } };
  Users.collection.update(selector, modifier);

  return { _id: userId };
};
//------------------------------------------------------------------------------

export default saveSubscription;
