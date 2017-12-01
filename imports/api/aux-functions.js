import { check } from 'meteor/check';

/**
 * @namespace AuxFunctions
 */
const AuxFunctions = {};

//------------------------------------------------------------------------------
AuxFunctions.isValidEmail = (email) => {
  check(email, String);
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return re.test(email);
};
//------------------------------------------------------------------------------

export default AuxFunctions;
