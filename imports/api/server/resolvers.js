import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';

const resolvers = {
  Query: {
    user(root, args, context) {
      // We access to the current user here thanks to the context. The current
      // user is added to the context thanks to the 'meteor/apollo' package.
      return context.user;
    },
  },
  // We need to tell graphql how to resolve the 'randomString' field inside the
  // User query. We could also define resolver functions for the rest of the
  // User fields, but if we don't do that graphql will default to the field
  // values, which is exactly what we want.
  User: {
    randomString() {
      return Random.id();
    },
  },
  Mutation: {
    sendVerificationEmail(root, args, context) {
      const { user: curUser } = context;

      // User should be logged in at this stage!
      if (!curUser) {
        // throw new Error(403, 'user should be logged in at sendVerificationLink');
        return {
          status: 'failed',
          error: 'User should be logged in at sendVerificationLink',
        };
      }

      const curUserId = curUser._id;
      const user = Meteor.users.findOne({ _id: curUserId });

      if (!user) {
        // throw new Error('user-not-found', 'The user is not registered in our database');
        return {
          status: 'failed',
          error: 'The user is not registered in our database',
        };
      }

      if (user.emails[0].verified === true) {
        // throw new Error(400, 'Email already verified!');
        return {
          status: 'failed',
          error: 'Email already verified!',
        };
      }

      try {
        Accounts.sendVerificationEmail(curUserId);
      } catch (exc) {
        console.log(exc);
        // throw new Error(500, `Verification email couldn't be delivered. Reason: ${exc.response}`);
        return {
          status: 'failed',
          error: `Verification email couldn't be delivered. Reason: ${exc.response}`,
        };
      }

      return { status: 'success' };
    },
  },
};

export default resolvers;

/*
const resolvers = {
  Query: {
    user(root, args, context) {
      // We access to the current user here thanks to the context. The current
      // user is added to the context thanks to the `meteor/apollo` package.
      return context.user;
    },
  },
  Mutation: {
    sendVerificationEmail(root, args, context) {
      console.log('hola');
      return { _id: '5666' };
    },
  },
};

export default resolvers;
*/
