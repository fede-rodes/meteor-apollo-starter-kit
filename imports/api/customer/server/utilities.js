import { GraphQLError } from 'graphql';
import { check } from 'meteor/check';
import collection from './collection.js';

// Attach namespace to collection for clarity
const Customer = { collection };

// Customer utilities
const utilities = {};

//------------------------------------------------------------------------------
/* utilities.insertStripeCustomer = (customer) => {
  check(customer, {
    userId: String,
    stripeId: String,
  });

  try {
    Customer.collection.insert(customer);
  } catch (exc) {
    throw new GraphQLError(`Insert couldn't be processed. Reason: ${exc}`);
  }
}; */
//------------------------------------------------------------------------------

export default utilities;
