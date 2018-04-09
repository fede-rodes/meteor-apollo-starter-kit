import { Meteor } from 'meteor/meteor';
import webPush from 'web-push';
import map from 'lodash/map';
import extend from 'lodash/extend';
import flatten from 'lodash/flatten';
import { Accounts } from 'meteor/accounts-base';
import { GraphQLError } from 'graphql';
import collection from '../collection';
import utils from '../utils';

const { privateKey: gcmPrivateKey } = Meteor.settings.firebase;
const { publicKey: vapidPublicKey } = Meteor.settings.public.vapid;
const { subject: vapidSubject, privateKey: vapidPrivateKey } = Meteor.settings.vapid;

// Wrap collection and utils around namespace for clarity
const Users = { collection, utils };

// Users namespace mutation resolvers
const Mutation = {};

//------------------------------------------------------------------------------
/**
* @summary Create a user record without password.
* @see {@link https://docs.meteor.com/api/passwords.html#Accounts-createUser}
* @see {@link https://docs.meteor.com/api/passwords.html#Accounts-sendEnrollmentEmail}
*/
Mutation.createUserWithoutPassword = (root, args) => {
  const { email } = args;
  console.log(
    '\n\ncreateUserWithoutPassword',
    'email', email,
  );

  // Query user
  const userExists = Users.collection.findOne({ 'emails.address': email });

  // In case user already exists, return user id
  if (userExists) {
    return { _id: userExists._id };
  }

  // Otherwise, insert user an return user id
  try {
    const user = { email };
    const userId = Accounts.createUser(user);
    return { _id: userId };
  } catch (exc) {
    throw new GraphQLError(`User couldn't be created. Reason: ${exc}`);
  }
};
//------------------------------------------------------------------------------
/**
* @summary Save subscription into user's record.
*/
Mutation.saveSubscription = (root, args, context) => {
  const { subscription } = args;
  const { userId } = context;

  Users.utils.checkLoggedInAndVerified(userId);

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

  Users.utils.checkLoggedInAndVerified(userId);

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
        Mutation.deleteSubscription(null, { endpoint: subscription.endpoint }, { userId });
      });
  });
};
//------------------------------------------------------------------------------

export default Mutation;
