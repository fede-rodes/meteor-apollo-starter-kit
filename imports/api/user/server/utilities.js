import { GraphQLError } from 'graphql';
import collection from './collection';

// Attach namespace to collection for clarity
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

  // TODO: use current loggedIn service instead
  const isPasswordService = Object.keys(user.services).indexOf('password') !== -1;
  const isEmailVerified = isPasswordService && user.emails[0].verified === true;
  if (isPasswordService && !isEmailVerified) {
    throw new GraphQLError('Email is not verified!');
  }
};
//------------------------------------------------------------------------------

export default utilities;
