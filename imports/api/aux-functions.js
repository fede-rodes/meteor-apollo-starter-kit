import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

/**
 * @namespace AuxFunctions
 */
const AuxFunctions = {};

//------------------------------------------------------------------------------
/**
* @summary Display alert message after ms milliseconds.
*/
AuxFunctions.delayedAlert = (msg, ms) => {
  check(msg, String);
  check(ms, Number);

  const handler = Meteor.setTimeout(() => {
    alert(msg); // eslint-disable-line no-alert
    Meteor.clearTimeout(handler);
  }, ms);
};
//------------------------------------------------------------------------------

export default AuxFunctions;
