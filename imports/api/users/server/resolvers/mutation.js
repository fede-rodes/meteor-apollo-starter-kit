import { Meteor } from 'meteor/meteor';
import webPush from 'web-push';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import { Accounts } from 'meteor/accounts-base';
import { GraphQLError } from 'graphql';
import collection from '../collection';
import utilities from '../utilities';

const { privateKey: gcmPrivateKey } = Meteor.settings.firebase;
const { publicKey: vapidPublicKey } = Meteor.settings.public.vapid;
const { subject: vapidSubject, privateKey: vapidPrivateKey } = Meteor.settings.vapid;

// Wrap collection and utilities around namespace for clarity
const Users = { collection, utilities };

// Users namespace mutation resolvers
const Mutation = {};

//------------------------------------------------------------------------------
/**
* @summary Send email account verification email to current logged in user.
*/
Mutation.sendVerificationEmail = (root, args, context) => {
  console.log('About to send verification email...');
  const { userId } = context;

  // TODO: pass email to verify as an argument
  Users.utilities.checkLoggedInAndNotVerified(userId);

  try {
    Accounts.sendVerificationEmail(userId);
    console.log('Verification email sent!');
    return { _id: userId };
  } catch (exc) {
    console.log(exc);
    throw new GraphQLError(`Verification email couldn't be delivered. Reason: ${exc.response}`);
  }
};
//------------------------------------------------------------------------------
/**
* @summary Save subscription into user's record.
*/
Mutation.saveSubscription = (root, args, context) => {
  const { subscription } = args;
  const { userId } = context;

  Users.utilities.checkLoggedInAndVerified(userId);

  const selector = { _id: userId };
  const modifier = { $addToSet: { subscriptions: subscription } };
  Users.collection.update(selector, modifier);

  return { _id: userId };
};
//------------------------------------------------------------------------------
/**
* @summary Remove subscription from user's record.
*/
Mutation.deleteSubscription = (root, args, context) => {
  const { endpoint } = args;
  const { userId } = context;

  Users.utilities.checkLoggedInAndVerified(userId);

  const selector = { _id: userId };
  const modifier = { $pull: { subscriptions: { endpoint } } };
  Users.collection.update(selector, modifier);

  return { _id: userId };
};
//------------------------------------------------------------------------------
/**
* @summary Send push notification to all subscribed users.
*/
Mutation.sendPushNotification = (root, args, context) => {
  const { userId } = context;

  Users.utilities.checkLoggedInAndVerified(userId);

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
        Mutation.deleteSubscription(null, { endpoint: subscription.endpoint }, { userId });
      });
  });
};
//------------------------------------------------------------------------------

export default Mutation;
