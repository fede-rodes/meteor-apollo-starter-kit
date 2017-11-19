/* global BrowserPolicy __meteor_runtime_config__ */
/* eslint no-undef: "error" */

// import { Meteor } from 'meteor/meteor';

// const { herokuDNS } = Meteor.settings;

// Disallow all rules
BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.disallowConnect();

// Stripe
BrowserPolicy.content.allowFontOrigin('data:');
BrowserPolicy.content.allowOriginForAll('*.stripe.com');

// Google fonts
BrowserPolicy.content.allowEval('http://fonts.googleapis.com');
BrowserPolicy.content.allowFontDataUrl('http://fonts.googleapis.com');
BrowserPolicy.content.allowOriginForAll('https://at.alicdn.com');

// Allow Meteor DDP Connections
const rootUrl = __meteor_runtime_config__.ROOT_URL;
console.log(`ROOT_URL: ${rootUrl}`);

BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace(/http(s?)/, 'ws$1'));
BrowserPolicy.content.allowConnectOrigin('http://192.168.2.9');

// In case custom DNS is provided, https://<YOUR-APP>.com for instance,
// we first need to set ROOT_URL to point to said origin and optionality
// allow the app to also connect to the heroku DNS.
/* if (herokuDNS && herokuDNS.length > 0) {
  BrowserPolicy.content.allowConnectOrigin(herokuDNS);
  BrowserPolicy.content.allowConnectOrigin(herokuDNS.replace(/http(s?)/, 'ws$1'));
} */
