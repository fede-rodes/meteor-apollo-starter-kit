/* global BrowserPolicy __meteor_runtime_config__ */
/* eslint no-undef: "error" */

// Disallow all rules
BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.disallowConnect();

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
