import { Random } from 'meteor/random';

const resolvers = {
  Query: {
    user(root, args, context) {
      // We access to the current user here thanks to the context. The current
      // user is added to the context thanks to the `meteor/apollo` package.
      return context.user;
    },
  },
  User: {
    // emails: ({ emails }) => emails,
    randomString: () => Random.id(),
  },
};

export default resolvers;
