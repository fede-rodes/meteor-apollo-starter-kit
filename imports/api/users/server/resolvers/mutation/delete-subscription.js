import collection from '../../collection';
import utils from '../../utils';

// Wrap collection and utils around namespace for clarity
const Users = { collection, utils };

//------------------------------------------------------------------------------
/**
* @summary Remove subscription from user's record.
*/
const deleteSubscription = (root, args, context) => {
  const { endpoint } = args;
  const { userId } = context;

  Users.utils.checkLoggedInAndVerified(userId);

  const selector = { _id: userId };
  const modifier = { $pull: { subscriptions: { endpoint } } };
  Users.collection.update(selector, modifier);

  return { _id: userId };
};
//------------------------------------------------------------------------------

export default deleteSubscription;
