import { Meteor } from 'meteor/meteor';
import webPush from 'web-push';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import collection from '../../collection';
import utils from '../../utils';
import deleteSubscription from './delete-subscription';

const { privateKey: gcmPrivateKey } = Meteor.settings.firebase;
const { publicKey: vapidPublicKey } = Meteor.settings.public.vapid;
const { subject: vapidSubject, privateKey: vapidPrivateKey } = Meteor.settings.vapid;

// Wrap collection and utils around namespace for clarity
const Users = { collection, utils };

//------------------------------------------------------------------------------
/**
* @summary Send push notification to all subscribed users.
*/
const sendPushNotification = (root, args, context) => {
  const { userId } = context;

  Users.utils.checkLoggedInAndVerified(userId);

  // Set web-push keys
  webPush.setGCMAPIKey(gcmPrivateKey);
  webPush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

  const payload = JSON.stringify({
    title: 'Welcome',
    body: 'Thank you for enabling push notifications',
    icon: '/android-chrome-192x192.png',
  });

  const options = {
    TTL: 60, // time to live in seconds
  };

  // Gather all subscriptions from all subscribed users
  const selector = { subscriptions: { $exists: true, $ne: [] } };
  const projection = { fields: { _id: true, subscriptions: true } };
  const users = Users.collection.find(selector, projection).fetch();
  const subscriptions = flatten(map(users, 'subscriptions'));

  // Actually send the messages
  subscriptions.forEach((subscription) => {
    webPush.sendNotification(subscription, payload, options)
      .then(() => {})
      .catch((err) => {
        console.log(`Error when trying to deliver message for ${subscription.endpoint}`, err);
        // This is probably an old subscription, remove it
        deleteSubscription(null, { endpoint: subscription.endpoint }, { userId });
      });
  });
};
//------------------------------------------------------------------------------

export default sendPushNotification;
