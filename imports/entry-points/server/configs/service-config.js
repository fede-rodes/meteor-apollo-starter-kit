import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

//------------------------------------------------------------------------------
// SET ACCOUNTS CONFIGURATION:
//------------------------------------------------------------------------------
/**
* @see: {@link https://atmospherejs.com/meteor/service-configuration}
* @see: {@link http://guide.meteor.com/security.html#served-files}
*/
const { appId, secret } = Meteor.settings.facebook;
ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  // { $set: { appId, secret, loginStyle: 'redirect' } },
  { $set: { appId, secret, loginStyle: 'popup' } },
);
