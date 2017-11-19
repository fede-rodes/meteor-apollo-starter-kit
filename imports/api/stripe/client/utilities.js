/* global Stripe */

import { Meteor } from 'meteor/meteor';

// Grab stripe public key
const { stripePublic } = Meteor.settings.public;

// Stripe utilities
const utilities = {};

//------------------------------------------------------------------------------
/* utilities.loadLibrary = (cb) => {
  const scriptExists = document.getElementById('stripejs');

  if (scriptExists && cb) {
    cb(window.stripe);
  } else {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.id = 'stripejs';
    document.body.appendChild(script);

    script.onload = () => {
      window.stripe = Stripe(stripePublic);
      if (cb) cb(window.stripe);
    };
  }
}; */
//------------------------------------------------------------------------------

export default utilities;
