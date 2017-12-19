import { check, Match } from 'meteor/check';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

/**
 * @namespace ErrorHandling
 * @summary error handling related utilities.
 * @example 'errors' object example:
 * const errors = {
 *   email: ['Email is required!', 'Please, provide a valid email address!', ...],
 *   password: ['Please, at least 6 characters long!', ...],
 *   ...
 * }
 */
const ErrorHandling = {};

//------------------------------------------------------------------------------
/**
* @summary Traverses errors object keys and fires callback when condition is met
* or when the end of the errors object is reached.
*/
ErrorHandling.traverseErrors = (errors, cond) => {
  check(errors, Object);
  check(cond, Function);

  const keys = Object.keys(errors);
  const length = keys.length;

  for (let i = 0; i < length; i += 1) {
    // If condition is met, interrupt the for loop and return relevant data
    if (cond(errors, keys[i])) {
      return { index: i, key: keys[i] };
    }
  }

  return { index: -1, key: null };
};
//------------------------------------------------------------------------------
/**
* @summary Returns the first not empty error.
*/
ErrorHandling.getFirstError = (errors) => {
  check(errors, Object);

  // Condition: at least one of the error fields is not empty
  const cond = (err, key) => err[key].length > 0;

  // Traverse the errors object and apply the condition above until it's met or
  // the end of the object is reached.
  const { index, key } = ErrorHandling.traverseErrors(errors, cond);

  // Handle no errors
  if (index === -1) {
    return { index, key, value: '' };
  }

  // Return first error data
  return { index, key, value: errors[key][0] };
};
//------------------------------------------------------------------------------
/**
* @summary Returns 'true' if the errors object contains at least one non-empty
* error field.
*/
ErrorHandling.hasErrors = (errors) => {
  check(errors, Object);

  return ErrorHandling.getFirstError(errors).index !== -1;
};
//------------------------------------------------------------------------------
/**
* @summary Returns all errors for the given field.
*/
ErrorHandling.getFieldErrors = (errors, field) => {
  check(errors, Object);
  check(field, String);

  const keys = Object.keys(errors);

  if (keys.indexOf(field) === -1) {
    throw new Error(404, 'Check your errors object, the field is not a valid key');
  }

  // Get array of errors for the given field
  const array = errors[field];

  if (!isArray(array)) {
    throw new Error(401, 'Check your errors object, the value is not a valid array');
  }

  return array.toString();
};
//------------------------------------------------------------------------------
/**
* @summary Clear error messages for the given field -or array of fields-
* leaving the remaining errors keys untouched.
*/
ErrorHandling.clearErrors = (errors, fields) => {
  check(errors, Object);
  check(fields, Match.OneOf(String, [String]));

  const keys = Object.keys(errors);
  const res = {}; // new errors object

  // Remove errors if key matches the given field(s), preserve the original
  // value otherwise.
  keys.forEach((key) => {
    const isStringMatch = isString(fields) && fields === key;
    const isArrayMatch = isArray(fields) && fields.indexOf(key) !== -1;

    res[key] = (isStringMatch || isArrayMatch) ? [] : errors[key];
  });

  return res;
};
//------------------------------------------------------------------------------
ErrorHandling.isValidEmail = (email) => {
  check(email, String);

  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return re.test(email);
};
//------------------------------------------------------------------------------

export default ErrorHandling;
