import saveSubscription from './save-subscription';
import deleteSubscription from './delete-subscription';
import sendPushNotification from './send-push-notification';

// Users namespace mutation resolvers
const Mutation = {
  saveSubscription,
  deleteSubscription,
  sendPushNotification,
};

export default Mutation;
