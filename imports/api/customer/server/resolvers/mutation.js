import { Meteor } from 'meteor/meteor';
import { GraphQLError } from 'graphql';
import Stripe from 'stripe';
import User from '../../../user/index.js';
import Plan from '../../../plan/index.js';
// import utilities from '../utilities.js';
import collection from '../collection.js';

// Grab stripe secret key
const { stripeSecret } = Meteor.settings;
const stripe = Stripe(stripeSecret);

// Attach namespace to utilities for clarity
// const Customer = { utilities };
// Attach namespace to collection for clarity
const Customer = { collection };

// Customer mutation resolvers
const Mutation = {};

//------------------------------------------------------------------------------
// Perform one time charge to user's card
// See: https://stripe.com/docs/api/node#customer_object
Mutation.createOneTimeCharge = async (root, args, context) => {
  const { planId, source } = args;
  const { userId } = context;

  User.utilities.checkLoggedInAndVerified(userId);

  // Query plan data
  const plan = Plan.collection.findOne({ planId });

  if (!plan) {
    throw new GraphQLError('Plan doesn\'t exist');
  }

  const { label, price, currency } = plan;

  const charge = {
    description: label,
    amount: price,
    currency,
    source,
  };

  try {
    return await stripe.charges.create(charge);
  } catch (exc) {
    throw new GraphQLError(`Charge couldn't be processed. Reason: ${exc}`);
  }
};
//------------------------------------------------------------------------------
// First, create customer on stripe. Then, insert customer in Customer collection
// See: https://stripe.com/docs/api/node#customer_object
Mutation.createSubscription = async (root, args, context) => {
  const { planId, source } = args;
  const { userId } = context;

  User.utilities.checkLoggedInAndVerified(userId);

  try {
    // Check if the customer already exists in our DB
    let customer = Customer.collection.findOne({ userId });

    // If no, call stripe create and store the data in the customer object
    if (!customer) {
      const { id: stripeCustomerId } = await stripe.customers.create({ source });

      customer = { userId, stripeCustomerId };
      Customer.collection.insert(customer);
    }

    // Subscribe customer to selected plan
    const subscription = {
      customer: customer.stripeCustomerId,
      items: [
        { plan: planId },
      ],
    };
    const res = await stripe.subscriptions.create(subscription);
    console.log('res', res);
    // OBSERVATION: you'll probably want to store the stripe response back in
    // you Customer collection
    return res;
  } catch (exc) {
    throw new GraphQLError(`Customer couldn't be created. Reason: ${exc}`);
  }
};
//------------------------------------------------------------------------------

export default Mutation;
