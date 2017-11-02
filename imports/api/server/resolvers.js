import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { GraphQLError } from 'graphql';

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

      if (!curUser) {
        throw new GraphQLError('User should be logged in at sendVerificationLink');
      }

      const curUserId = curUser._id;
      const user = Meteor.users.findOne({ _id: curUserId });

      if (!user) {
        throw new GraphQLError('The user is not registered in our database');
      }

      if (user.emails[0].verified === true) {
        throw new GraphQLError('Email already verified!');
      }

      try {
        Accounts.sendVerificationEmail(curUserId);
      } catch (exc) {
        console.log(exc);
        throw new GraphQLError(`Verification email couldn't be delivered. Reason: ${exc.response}`);
      }

      return { status: 'success' };
    },
  },
};

export default resolvers;
