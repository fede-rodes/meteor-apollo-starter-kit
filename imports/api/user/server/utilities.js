import { GraphQLError } from 'graphql';
import collection from './collection';

// Wrap collection around namespace for clarity
const User = { collection };

// User utilities
const utilities = {};

//------------------------------------------------------------------------------
utilities.checkLoggedInAndVerified = (userId) => {
  // User should be logged in at this stage
  if (!userId) {
    throw new GraphQLError('User is not logged in!');
  }

  // Make sure the user exists in our database
  const user = User.collection.findOne({ _id: userId });
  if (!user || !user.services) {
    throw new GraphQLError('The user is not registered in our database');
  }

  // Make sure email is verified (in case of password service)
  // TODO: use current loggedIn service instead
  const isPasswordService = Object.keys(user.services).indexOf('password') !== -1;
  const isEmailVerified = isPasswordService && user.emails[0].verified === true;
  if (isPasswordService && !isEmailVerified) {
    throw new GraphQLError('Email is not verified!');
  }
};
//------------------------------------------------------------------------------
// TODO: pass email to verify as an argument
utilities.checkLoggedInAndNotVerified = (userId) => {
  // User should be logged in at this stage
  if (!userId) {
    throw new GraphQLError('User is not logged in!');
  }

  // Make sure the user exists in our database
  const user = User.collection.findOne({ _id: userId });
  if (!user || !user.emails || !user.emails[0]) {
    throw new GraphQLError('The user is not registered in our database');
  }

  if (user.emails[0].verified === true) {
    throw new GraphQLError('Email already verified!');
  }
};
//------------------------------------------------------------------------------

export default utilities;
