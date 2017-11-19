import { Meteor } from 'meteor/meteor';
import { extend } from 'lodash';

/**
 * @namespace Stripe
 * @summary In here we define utilities related to Stripe library.
 */
const Stripe = {};

// Load client-side only utilities
if (Meteor.isClient) {
  import utilities from './client/utilities.js';

  extend(Stripe, { utilities });
}

export default Stripe;
